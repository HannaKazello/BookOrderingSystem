var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectId;
var Order = require('../models/order');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('we call orders router');
  next();
});

router.route('/')
    //make order
    .post( function(req, res) {
    
        var order = new Order(req.body);
        order.save(function(err,order){
            if(err){
                res.send('Error!');
            }
        });
    
        res.send('order created');
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

router.get('/overdue', function (req, res) {
    var n = new Date();
    Order.find({state:'ordered', returnDate: {$lt: n}}, function(err, orders){
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

module.exports = router;