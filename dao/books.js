var ObjectId = require('mongodb').ObjectId;
var Book = require('../models/book.js');

 
module.exports.findOne = function(ISBN_code, callback){

  Book.findOne({ISBN_code: ISBN_code}, function(err, result){

    if ( err ) throw err;

    callback(result);

  });

}
 
module.exports.getBooksByAuthor = function (author, callback) {
    
   Book.find({authors: author}, function (err, result) {

    if ( err ) throw err;

    callback(result);

  });
};

module.exports.getBooksByGenre = function (genre, callback) {
    
   Book.find({genres: genre}, function (err, result) {

    if ( err ) throw err;

    callback(result);

  });
};

module.exports.findAll = function(callback){

  Book.find({}, function(err, result){

    if ( err ) throw err;

    callback(result);

  });

}

module.exports.search = function(searchString ,callback){

  Book
    .find(
        { $text : { $search : searchString } }
      , { score : { $meta: "textScore" } }
    )
    .sort({ score : { $meta : 'textScore' } })
    .exec(function(err, results) {
      if(err) throw err;
        callback(results);
    });

}

module.exports.getAllAuthors = function(callback){
    Book.find({},{authors:1}, function(err, result){

    if ( err ) throw err;
    var authors=[];
    result.forEach(function(item, index, array){
        item.authors.forEach(function(auth){
            if(authors.indexOf(auth) < 0) authors.push(auth);
            console.log('authors:',authors);
        })
    });
        
    callback(authors);

  });

}

module.exports.getAllGenres = function(callback){
    Book.find({},{genres:1}, function(err, result){

    if ( err ) throw err;
    var genres=[];
    result.forEach(function(item, index, array){
        item.genres.forEach(function(gen){
            if(genres.indexOf(gen) < 0) genres.push(gen);
        })
    });
        
    callback(genres);

  });

}
 
module.exports.addNewBook = function(body, callback){

  var book = new Book(
      body
      /*{

    name:body.name,

    ISBN_code: body.ISBN_code,

    authors: body.authors,

    pages: body.pages

  }*/);

  book.save(function(err, result){

    if ( err ) throw err;

    callback({

      messaage:"Successfully added book",

      book:result

    });

  });

}

 
module.exports.editBook = function(body, ISBN_code, callback){

  Book.findOne({ISBN_code: ISBN_code},body, function(err, result){
    if ( err ) throw err;
 
    if(!result){
      callback({
        message:"Book with ISBN: " + ISBN_code+" not found.",
      });
    }
 /*
    result.name   = body.name;
    result.ISBN_code   = body.ISBN_code;
    result.authors = body.authors;
    result.pages  = body.pages;
 */
    result.update(body,function(err, result){
      if ( err ) throw err;
      callback({
        message:"Successfully updated the book",
        book: result
      });
    });
  });
}

module.exports.deleteBook = function(ISBN_code, callback){
  Book.findOneAndRemove({ISBN_code: ISBN_code}, function(err, result){
      callback({
        message: "Successfully deleted the book",
        book: result
      });
  });
}

