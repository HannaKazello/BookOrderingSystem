var mongoose = require('mongoose');

var BookSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    genres:[{
        type: String
    }],
    language: {
        type: String
    },
    authors:[{
        type: String
    }],
    description:{
        type: String
    },
    copies:{
        type: Number
    },
    pages:{
        type: Number
    },
    ISBN_code:{
        type: String,
        index: true
    },
    photo:{
        type:String
    },
    yearOfPublication:{
        type:Number
    },
    cityOfPublishing:{
        type:String
    },
    publishingHouse:{
        type: String
    },
    alternative_names:[{
        type:String
    }],
    keywords:[{
        type:String
    }]


});

BookSchema.index({name: 'text', genres: 'text', authors: 'text', description: 'text', alternative_names: 'text', keywords: 'text' }, {name: 'Book search index', weights: {name: 10, genres: 8, authors: 8, alternative_names:9, keywords:7, description: 6}});

var book =  mongoose.model('book', BookSchema);
module.exports = book;
