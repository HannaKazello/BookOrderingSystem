var express = require('express');
var router = express.Router();
var ObjectId = require('mongodb').ObjectId;
var Book = require('../models/book');

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('we call books router');
  next();
});

router.route('/')
    .post( function(req, res) {
    
        var book = new Book(req.body);
        console.log(req.body);
        Book.findOne(req.body,function(err, b){
            if (err){
                res.send('Error');
            }
            console.log('b='+'\n'+b);
            if(b==null){
                
                book.save(function(err,book){
                    if(err){
                        res.send('Error!');
                    }
                    res.send('Book created');
                });
            
            }
            else res.send('We have that book');
        });
    
    })

    .get( function(req, res) {
        
        Book.find({}, function(err, books){
            if(err){
                res.send('Error');
            }
            res.send(books);
        })
    });

router.route('/:book_id')

    .get(function(req, res) {
        Book.findOne({_id: new ObjectId(req.params.book_id)}, function(err, book){
            if(err){
                res.send('Error');
            }
            res.send(book);
        })
    })
    
    .delete(function(req, res){
         Book.remove({_id: new ObjectId(req.params.book_id)}, function(err, book){
            if(err){
                res.send('Error');
            }
            res.send("Book deleted");
        });
        
    })

    .put(function(req,res){
        Book.update({_id: new ObjectId(req.params.book_id)},req.body, function(err, data){
            if(err){
               res.send('Error!');
            }
            res.send('book updated!');
        });
    });

module.exports = router;