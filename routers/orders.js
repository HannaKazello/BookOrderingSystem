var express = require('express');
var router = express.Router();
var orderController = require("../handlers/order-controller");
var isAuthenticated = require('../middlewares/auth');


router.put('/:order_id/:state', isAuthenticated, function(req, res) {
    orderController.changeState(req.params.order_id, req.params.state, function(results) {
        res.json(results);
    });

});

router.get('/state/:state', isAuthenticated, function(req, res) {
    orderController.getOrdersByState(req.params.state, function(results) {
        res.json(results);
    });
});

router.post('/',  function(req, res) {
    orderController.addNewOrder(req.body, function(err, results) {
        res.json(results);
    });

});

router.get('/', isAuthenticated, function(req, res) {
    orderController.getAllOrders(function(results) {
        res.json(results);
    });
});


router.get('/user/:user_id', isAuthenticated, function(req, res) {
    orderController.getOrdersByUser(req.params.user_id, function(results) {
        res.json(results);
    });
});

router.get('/book/:book_id', isAuthenticated, function(req, res) {
    orderController.getOrdersByBook(req.params.book_id, function(results) {
        res.json(results);
    });
});


router.get('/:order_id', isAuthenticated, function(req, res) {
    orderController.getOrderDetails(req.params.order_id, function(results) {
        res.json(results);
    });
});

router.delete('/:order_id', isAuthenticated, function(req, res) {
    orderController.deleteOrder(req.params.order_id, function(results) {
        res.json(results);
    });

});



module.exports = router;
