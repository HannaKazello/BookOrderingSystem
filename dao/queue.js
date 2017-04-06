var ObjectId = require('mongodb').ObjectId;
var Queue = require('../models/queue.js');


module.exports.findOne = function(bookid, callback){

  Queue.findOne({
            book: bookid
        }).populate('book')
        .exec(function(err, result) {
            if (err) throw err;
            callback(result);
        });

}


module.exports.findAll = function(callback){

  Queue.find({}).populate('book')
        .exec(function(err, result) {
            if (err) throw err;
            callback(result);
        });;

}

function addNewQueue(body, callback){
module.exports.addNewQueue

  var queue = new Queue({
      book: body.book,
      users: [body.user]}
     );

  queue.save(function(err, result){

    if ( err ) callback(err)

    callback(null,{

      messaage:"Successfully added queue",

    });

  });

}
module.exports.addNewQueue = addNewQueue;

module.exports.editQueue = function(body,type, callback){

  Queue.findOne({book: body.book}, function(err, result){
    if ( err ) callback(err);

    if(!result){
      addNewQueue(body, function(err, result){
          if(!err) callback(null, result);
      })
    }
      var users = result.users;
      if(type=='push'){
          users.push(body.user);
      }
      if(type=='pop'){
          users.pop(body.user);
      }
    result.update(users,function(err, result){
      if ( err ) callback(err);
      callback(null,{
        message:"Successfully add user",
        book: result
      });
    });
  });
}

module.exports.deleteQueue = function(bookid, callback){
  Queue.findOneAndRemove({book: bookid}, function(err, result){
       if ( err ) callback(err);

      callback(null,{
        message: "Successfully deleted the queue",
        book: result
      });
  });
}
