var queueDao = require("../dao/queue");

module.exports.findOne = function(bookid, callback){

  queueDao.findOne(bookid, callback);
}

module.exports.getAllQueues = function(callback){
  
  queueDao.findAll(callback);
}
 
module.exports.addNewQueue = function(body, callback){
  
  queueDao.addNewQueue(body, callback);

}

module.exports.editQueue = function(body, type, callback){
  queueDao.editQueue(body, type, callback);
}
module.exports.deleteQueue = function(bookid, callback){

  queueDao.deleteBook(bookid, callback);
}
