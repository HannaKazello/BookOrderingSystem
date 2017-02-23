var ObjectId = require('mongodb').ObjectId;
var Order = require('../../models/order');
var changeState = function(req){
    
    var updata = {'state': req.params.state};
    if(req.params.state=='taken'){
        updata.takingDate = setTakingDate();
        updata.returnDate = setRerurnDate();
    }
    
    
    Order.update({_id: new ObjectId(req.params.order_id)},updata, function(err, data){
            if(err){
                console.log('i-m stupid=(');
                console.log(err);
               return false;
                
            }
            
        });
    return true;
};

function setRerurnDate  () {
    console.log("im in set return date");
    var now = new Date();
    return now.setDate(now.getDate()+14);
};

function setTakingDate  () {
    console.log("im in set taking date");
    var now = new Date();
    return now;
};

module.exports = changeState;