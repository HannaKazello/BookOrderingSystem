var ObjectId = require('mongodb').ObjectId;
var Order = require('../models/order.js');
var bookDao = require('../dao/books');

module.exports.findOne = function(order_id, callback) {

    Order.findOne({
            _id: new ObjectId(order_id)
        }).populate('user').populate('book')
        .exec(function(err, result) {
            if (err) throw err;
            callback(result);
        });
};


module.exports.findAll = function(callback) {

    Order.find({}).populate('user').populate('book')
        .exec(function(err, result) {
            if (err) throw err;
            callback(result);
        });;
};

module.exports.getOrdersByUser = function(user_id, callback) {

    Order.find({
            user: new ObjectId(user_id)
        }).populate('user').populate('book')
        .exec(function(err, result) {
            if (err) throw err;
            callback(result);
        });;
};

module.exports.getOrdersByBook = function(book_id, callback) {
    Order.find({
            user: new ObjectId(user_id)
        }).populate('user').populate('book')
        .exec(function(err, result) {
            if (err) throw err;
            callback(result);
        });;
};

module.exports.getOrdersByState = function(state, callback) {
    Order.find({
            state: state
        }).populate('user').populate('book')
        .exec(function(err, result) {
            if (err) throw err;
            callback(result);
        });;
};

module.exports.addNewOrder = function(body, callback) {

    var order = new Order({

        book: new ObjectId(body.book),
        user: new ObjectId(body.user),
        orderDate: new Date()

    });

    order.save(function(err, result) {
        if (err) throw err;
        callback({
            messaage: "Successfully added order",
            order: result
        });
    });
};

module.exports.deleteOrder = function(id, callback) {
    Order.findOneAndRemove({
        _id: new ObjectId(id)
    }, function(err, result) {
        if (err) throw err;
        callback({
            message: "Successfully deleted the order",
            order: result
        });
    });
};

module.exports.changeState = function(id, state, callback) {
    var updata = {
        'state': state
    };
    if (state == 'taken') {
        updata.takingDate = setTakingDate();
        updata.returnDate = setRerurnDate();
    }
    if (state == 'returned'){
        Order.findOne({
            _id: new ObjectId(id)
        }, function(err, result){
            if (!err) bookDao.increment(result.book, function(err, result){
                if(err) throw err;
            })
        })
    }

    Order.update({
        _id: new ObjectId(id)
    }, updata, function(err, data) {
        if (err) throw err;

        callback({
            messaage: "state changed",
            order: data
        });
    });
};

function setRerurnDate() {
    var now = new Date();
    return now.setDate(now.getDate() + 14);
};

function setTakingDate() {
    var now = new Date();
    return now;
};
