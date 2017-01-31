var mongoose = require('mongoose');

var UserSchema = new mongoose.Schema({
    username:{
        type: String,
        unique: true,
        required: true
    },
    password:{
        type:String,
        required:true
    },
    email:{
        type: String,
        unique: true,
        required: true
    },
    firstName:{
        type: String,
        required: true
    },
    lastName:{
        type: String,
        required: true
    },
    phone:{
        type: String,
        required: true
    }
    
});

var user =  mongoose.model('user', UserSchema);
module.exports = user;