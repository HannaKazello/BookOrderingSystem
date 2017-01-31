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
    user:{
        type: mongoose.Schema.Types.ObjectId,
        required: true
    },
    state:{
		type:String,
		enum: ['ordered', 'taken','returned'],
		default: 'ordered'
	}   
});

var order =  mongoose.model('order', OrderSchema);
module.exports = order;