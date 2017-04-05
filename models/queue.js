var mongoose = require('mongoose');


var QueueSchema = new mongoose.Schema({
    book:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'book'
    },
    users:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    }]
});


var order =  mongoose.model('queue', QueueSchema);
module.exports = order;
