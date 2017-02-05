var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectId;
var Order = require('../models/order');
var changeState = require('../controllers/orders/changeState');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('we call orders router');
  next();
});

router.route('/')
    //make order
    .post( function(req, res) {
    
        var order = new Order(req.body);
        if(req.body.user && req.body.bookId){
            order.save(function(err,order){
            if(err){
                res.send('Error!');
            }
        });
    
        res.send('order created');
        }
        else res.send('Error. No User or Book');
    
        
    })

    //list<Order>
    .get( function(req, res) {
        
        Order.find({}, function(err, orders){
            if(err){
                res.send('Error');
            }
            res.send(orders);
        })
    });

router.route('/user/:user_id')
    .get(function(req,res){
        Order.find({user: new ObjectId(req.params.user_id)}, function(err, orders){
            if(!err){
                res.send(orders);
            }
        });
    });

router.route('/book/:book_id')
    .get(function(req,res){
        Order.find({bookId: new ObjectId(req.params.book_id)}, function(err, orders){
            if(!err){
                res.send(orders);
            }
        });
    });

router.get('/:state', function (req, res) {
    Order.find({state: req.params.state}, function(err, orders){
            if(err){
                res.send('Error');
            }
            res.send(orders);
        })
});

router.route('/:order_id')

    .get(function(req, res) {
        Order.findOne({_id: new ObjectId(req.params.order_id)}, function(err, order){
            if(err){
                res.send('Error');
            }
            res.send(order);
        })
    })
    
    .delete(function(req, res){
         Order.remove({_id: new ObjectId(req.params.order_id)}, function(err, order){
            if(err){
                res.send('Error');
            }
            res.send("order deleted");
        });
        
    })

    .put(function(req,res){
        Order.update({_id: new ObjectId(req.params.order_id)},req.body, function(err, data){
            if(err){
               res.send('Error!');
            }
            res.send('order updated!');
        });
    });

router.put('/:order_id/:state', function (req, res) {
    if (changeState(req)) res.send('State changed')
    else res.send('error');
    
});

module.exports = router;