var mongoose = require('mongoose');
    

var OrderSchema = new mongoose.Schema({
    takingDate:{
        type: Date
    },
	returnDate:{
        type: Date
    },
    orderDate:{
        type: Date
    },
    bookId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'book'
    },
    bookName:{
        type: String
    },
    userName:{
        type: String
    },
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user'
    },
    state:{
		type:String,
		enum: ['ordered', 'taken','returned','overdue'],
		default: 'ordered'
	}   
});


var order =  mongoose.model('order', OrderSchema);
module.exports = order;