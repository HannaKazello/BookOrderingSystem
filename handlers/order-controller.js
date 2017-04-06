var orderDao = require("../dao/orders");
var bookDao = require('../dao/orders');
var queueDao = require('../dao/queue');

module.exports.getOrderDetails = function(order_id, callback){

  orderDao.findOne(order_id, callback);
}

module.exports.getAllOrders = function(callback){
  
  orderDao.findAll(callback);
}
 
module.exports.addNewOrder = function(body, callback){
    bookDao.isThereACopy(body.book, function(err, result){
        if (err) callback(err);
        else if(result==true) orderDao.addNewOrder(body, callback);
        queueDao.editQueue(body, callback)
    })

}

module.exports.deleteOrder = function(order_id, callback){
  
  orderDao.deleteOrder(order_id, callback);
}
module.exports.changeState = function(order_id, state, callback){
  
  orderDao.changeState(order_id, state, callback);
}
module.exports.getOrdersByUser = function(user_id, callback){
  
  orderDao.getOrdersByUser(user_id, callback);
}
module.exports.getOrdersByBook = function(book_id, callback){
  
  orderDao.getOrdersByBook(book_id, callback);
}
module.exports.getOrdersByState = function(state, callback){
  
  orderDao.getOrdersByState(state, callback);
}
