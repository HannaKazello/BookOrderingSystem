var mongoose = require('mongoose');
var crypto      = require('crypto');

var UserSchema = new mongoose.Schema({
    username:{
        type: String,
        unique: true,
        required: true
    },
    hashedPassword:{
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
    },
    adress:{
        building: String,
        flat: String,
        street: String,
        city: String
    },
    salt: {
        type: String,
        required: true
    },
    DOB:{
        type: Date
    },
    registration:{
        type:Date
    },
    rating:{
        type: Number
    },
    admin: Boolean

});
UserSchema.methods.encryptPassword = function(password) {
    return crypto.createHmac('sha1', this.salt).update(password).digest('hex');

};
UserSchema.methods.checkPassword = function(password) {
    return this.encryptPassword(password) === this.hashedPassword;
};
var user =  mongoose.model('user', UserSchema);
module.exports = user;
