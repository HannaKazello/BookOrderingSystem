var ObjectId = require('mongodb').ObjectId;
var Order = require('../../models/order');
var changeState = function(req){
    
    Order.update({_id: new ObjectId(req.params.order_id)},{'state': req.params.state}, function(err, data){
            if(err){
                console.log('i-m stupid=(');
               return false;
                
            }
            if(req.params.state=='taken'){
                data.setTakingDate;
                data.setReturnDate;
            }
            
        });
    return true;
}
module.exports = changeState;