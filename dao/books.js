var ObjectId = require('mongodb').ObjectId;
var Book = require('../models/book.js');

module.exports.increment = function(id, callback){

  Book.update({_id:new ObjectId(id)},{ $inc: { copies: 1}},function(err,book){
      if (err) callback(err);
      callback(null, {succsess: true});
  });

}

module.exports.decrement = function(id, callback){

  Book.update({_id:new ObjectId(id)},{ $inc: { copies: -1}},function(err,book){
      if (err) callback(err);
      callback(null, {succsess: true});
  });

}


module.exports.findOne = function(ISBN_code, callback){

  Book.findOne({ISBN_code: ISBN_code}, function(err, result){

    if ( err ) callback(err);

    callback(null,result);

  });

}

module.exports.getBooksByAuthor = function (author, callback) {

   Book.find({authors: author}, function (err, result) {

    if ( err ) callback(err);

    callback(null,result);

  });
};

module.exports.ifThereACopy = function (id, callback) {

   Book.findOne({_id: new ObjectId(id)}, function (err, result) {
    if ( err ) callback(err);
    if (result.copies>0) callback(null,true);

  });
};

module.exports.getBooksByGenre = function (genre, callback) {

   Book.find({genres: genre}, function (err, result) {

       if ( err ) callback(err);

       callback(null,result);

  });
};

module.exports.findAll = function(callback){

  Book.find({}, function(err, result){

    if ( err ) callback(err);

    callback(null, result);

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
        if ( err ) callback(err);

        callback(null, results);
    });

}

module.exports.getAllAuthors = function(callback){
    Book.find({},{authors:1}, function(err, result){

    if ( err ) callback(err);
    var authors=[];
    result.forEach(function(item, index, array){
        item.authors.forEach(function(auth){
            if(authors.indexOf(auth) < 0) authors.push(auth);
            console.log('authors:',authors);
        })
    });

    callback(null, authors);

  });

}

module.exports.getAllGenres = function(callback){
    Book.find({},{genres:1}, function(err, result){

    if ( err ) callback(err);
    var genres=[];
    result.forEach(function(item, index, array){
        item.genres.forEach(function(gen){
            if(genres.indexOf(gen) < 0) genres.push(gen);
        })
    });

    callback(null,genres);

  });

}

module.exports.addNewBook = function(body, callback){

  var book = new Book(
      body
     );

  book.save(function(err, result){

    if ( err ) callback(err)

    callback(null,{

      messaage:"Successfully added book",

      book:result

    });

  });

}


module.exports.editBook = function(body, ISBN_code, callback){

  Book.findOne({ISBN_code: ISBN_code},body, function(err, result){
    if ( err ) callback(err);

    if(!result){
      callback(null,{
        message:"Book with ISBN: " + ISBN_code+" not found.",
      });
    }

    result.update(body,function(err, result){
      if ( err ) callback(err);
      callback(null,{
        message:"Successfully updated the book",
        book: result
      });
    });
  });
}

module.exports.deleteBook = function(ISBN_code, callback){
  Book.findOneAndRemove({ISBN_code: ISBN_code}, function(err, result){
       if ( err ) callback(err);

      callback(null,{
        message: "Successfully deleted the book",
        book: result
      });
  });
}
