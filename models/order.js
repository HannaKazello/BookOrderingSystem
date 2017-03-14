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
    book:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'book'
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