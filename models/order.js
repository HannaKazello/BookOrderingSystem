var mongoose = require('mongoose');
    

var OrderSchema = new mongoose.Schema({
    takingDate:{
        type: Date
    },
	returnDate:{
        type: Date
    },
    bookId:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    bookName:{
        type: String
    },
    userName:{
        type: String
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    state:{
		type:String,
		enum: ['ordered', 'taken','returned','overdue'],
		default: 'ordered'
	}   
});

OrderSchema.methods.setRerurnDate = function () {
    var now = new Date.UTC();
    this.returnDate=now.setUTCDate(now.getUTCDate()+14);
}

OrderSchema.methods.setTakingDate = function () {
    var now = new Date.UTC();
    this.takingDate = now;
}
OrderSchema.methods.setState = function(state){
    this.state = state;
}

var order =  mongoose.model('order', OrderSchema);
module.exports = order;