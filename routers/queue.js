var express = require('express');
var router = express.Router();
var queueController = require("../handlers/queue-controller");
var isAuthenticated = require('../middlewares/auth');

//queue controller will be here

router.get('/', isAuthenticated, function(req, res) {
    queueController.getAllQueues(function(err,results) {
        if (err){
            res.writeHead(500);
          res.end();
        }
        else res.json(results);
    });
});

router.get('/:book', isAuthenticated, function(req, res) {
    queueController.findOne(req.params.book, function(err,results) {
        if (err){
            res.writeHead(500);
          res.end();
        }
        else res.json(results);

    });
});



module.exports = router;
