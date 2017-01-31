var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectId;
var User = require('../models/user');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('we call users router');
  next();
});

router.route('/')
    .post( function(req, res) {
    
        var user = new User(req.body);
        user.save(function(err,user){
            if(err){
                res.send('Error!');
            }
        });
    
        res.send('User created');
    })

    .get( function(req, res) {
        
        User.find({}, function(err, users){
            if(err){
                res.send('Error');
            }
            res.send(users);
        })
    });

router.route('/:user_id')

    .get(function(req, res) {
        User.findOne({_id: new ObjectId(req.params.user_id)}, function(err, user){
            if(err){
                res.send('Error');
            }
            res.send(user);
        })
    })
    
    .delete(function(req, res){
         User.remove({_id: new ObjectId(req.params.user_id)}, function(err, user){
            if(err){
                res.send('Error');
            }
            res.send("user deleted");
        });
        
    })

    .put(function(req,res){
        User.update({_id: new ObjectId(req.params.user_id)},req.body, function(err, data){
            if(err){
               res.send('Error!');
            }
            res.send('user updated!');
        });
    });

module.exports = router;