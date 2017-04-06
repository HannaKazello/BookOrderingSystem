
var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectId;
var User = require('../models/user');
const localConfig = require('../config');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens
var isAuthenticated = require('../middlewares/auth');

router.post('/authenticate', function(req, res) {

  // find the user
  User.findOne({
    email: req.body.email
  }, function(err, user) {

    if (err) throw err;

    if (!user) {
      res.json({ success: false, message: 'Authentication failed. User not found.' });
    } else if (user) {

      // check if password matches
      if (user.password != req.body.password) {
        res.json({ success: false, message: 'Authentication failed. Wrong password.' });
      } else {

        // if user is found and password is right
        // create a token
        var token = jwt.sign(user, localConfig.secret, {
          //expiresInMinutes: 1440 // expires in 24 hours
        });

        // return the information including token as JSON
        res.json({
          success: true,
          message: 'Enjoy your token!',
          token: token
        });
      }

    }

  });
});
router.post('/', function(req, res) {

        var user = new User(req.body);
        user.save(function(err,user){
            if(err){
                throw err;
                res.json({ success: false });
            }
            else res.json({ success: true });
        });

    });

router.get('/',isAuthenticated, function(req, res) {

        User.find({}, function(err, users){
            if(err){
                throw err;
                res.json({ success: false });
            }
            else res.json({
                success: true,
                users: users
            });
        })
    });

router.route('/:user_id', isAuthenticated)

    .get(function(req, res) {
        User.findOne({_id: new ObjectId(req.params.user_id)}, function(err, user){
            if(err){
                throw err;
                res.json({
        success: false,
        message: 'Error'
    });
            }
            res.json({
        success: false,
        message: 'No token provided.' ,
        user: user
    });
        })
    })

    .delete(function(req, res){
         User.remove({_id: new ObjectId(req.params.user_id)}, function(err, user){
            if(err){
                throw err;
                res.json({
        success: false,
        message: 'Error'
    });
            }
            res.json({
        success: false,
        message: 'Deleted'
    });
        });

    })

    .put(function(req,res){
        User.update({_id: new ObjectId(req.params.user_id)},req.body, function(err, data){
            if(err){
                           throw err;
                res.json({
        success: false,
        message: 'Error'
    });
            }
            res.json({
        success: false,
        message: 'Updated'
    });
        });
    });



module.exports = router;
