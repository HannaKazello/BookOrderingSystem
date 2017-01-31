var mongoose = require('mongoose');

var BookSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    authors:[{
        type: String,
        required: true
    }],
    description:{
        type: String
    },
    copies:{
        type: Number
    },
    genres:[{
        type: String,
    }],
    photo:{
        type:String
    },
    publication:{
        type:Date
    },
    publishingHouse:{
        type: String
    }
    
    
});

var book =  mongoose.model('book', BookSchema);
module.exports = book;