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
        type: Number,
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
/*BookSchema.path("authors").set(
    function( name ) {
        //capitalize
        return name.charAt(0).toUpperCase() + name.slice(1);
});*/

var book =  mongoose.model('book', BookSchema);
module.exports = book;