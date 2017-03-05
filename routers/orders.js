var express = require('express');
var router = express.Router();
var orderController = require("../handlers/order-controller");

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('we call orders router');
  next();
});

router.put('/:order_id/:state', function (req, res) {
    orderController.changeState(req.params.order_id, req.params.state,function(results){res.json(results);});
    
});

router.get('/state/:state', function (req, res) {
    orderController.getOrdersByState(req.params.state, function(results){
        res.json(results);
});
});

router.route('/')
    //make order
    .post( function(req, res) {
        orderController.addNewOrder(req.body, function(results){
        res.json(results);
        });
        
    })

    //list<Order>
    .get( function(req, res) {
        
        orderController.getAllOrders(function(results){res.json(results);});
    })
;

router.route('/user/:user_id')
    .get(function(req,res){
        orderController.getOrdersByUser(req.params.user_id, function(results){
        res.json(results);
    });
});

router.route('/book/:book_id')
    .get(function(req,res){
        orderController.getOrdersByBook(req.params.book_id, function(results){
        res.json(results);
    });
});


router.route('/:order_id')

    .get(function(req, res) {
        orderController.getOrderDetails(req.params.order_id,function(results){res.json(results);});
    })
    
    .delete(function(req, res){
         orderController.deleteOrder(req.params.order_id,function(results){res.json(results);});
        
    })
;
    


module.exports = router;