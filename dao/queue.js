var ObjectId = require('mongodb').ObjectId;
var Queue = require('../models/queue.js');


module.exports.findOne = function(bookid, callback) {
    Queue.findOne({book: bookid}).populate('book', ['name','authors']).populate('users', ['firstName','lastName'])
        .exec(function(err, result) {
            if (err) callback(err);
            callback(null, result);
        });
}


module.exports.findAll = function(callback) {
    Queue.find({}).populate('book', ['name', 'authors']).populate('users', ['firstName','lastName'])
        .exec(function(err, result) {
            if (err) callback(err);
            callback(null, result);
        });;
}

function addNewQueue(body, callback) {
    console.log('im in addQueue');
    var queue = new Queue({
        book: body.book,
        users: [body.user]
    });

    queue.save(function(err, result) {
        if (err) callback(err);
        console.log('im add queue');
        callback(null, {
            messaage: "Successfully added queue",
        });
    });
}
module.exports.addNewQueue = addNewQueue;

module.exports.editQueue = function(body, type, callback) {
    console.log('im in editQueue');
    Queue.findOne({book: body.book}, function(err, result) {
        console.log('find queu:', err, result);
        if (err) callback(err);
        if (result===null) {
            return addNewQueue(body, function(err, result) {
                if (!err) callback(null, result);
            })
        }

        var users = result.users;
        var user;
        console.log('users1:',users);
        if (type == 'push') {
            users.push(body.user);
            console.log('type:',type);
            console.log('users1:',users);
            result.update({users: users}, function(err, result) {
                console.log('update queue');
                if (err) return callback(err);
                callback(null, {
                    message: "Successfully add user",
                    book: result
                });
            });

        }
        if (type == 'pop') {
            users.reverse();
            user=users.pop();
            users.reverse();
        }

    });
}
module.exports.popUserFromQueue = function(book, callback) {
    Queue.findOne({book: book}, function(err, result) {
        console.log('find queu:', err, result);
        if (err) return callback(err);
        var users = result.users;
        var user;
        users.reverse();
        user=users.pop();
        users.reverse();
        result.update({users: users}, function(err, result) {
            console.log('update queue');
            if (err) return callback(err);
            // callback(null, {
            //     message: "Successfully add user",
            //     book: result
            // });
        });
        return callback(null, user);
    });
}

module.exports.deleteQueue = function(bookid, callback) {
    Queue.findOneAndRemove({
        book: bookid
    }, function(err, result) {
        if (err) callback(err);

        callback(null, {
            message: "Successfully deleted the queue",
            book: result
        });
    });
}
