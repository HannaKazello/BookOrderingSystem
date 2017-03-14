var express = require('express');
var router = express.Router();
var bookController = require("../handlers/book-controller");

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('we call books router');
  next();
});

router.route('/')
    .post( function(req, res) {
    
        bookController.addNewBook(req.body, function(results){
      res.json(results);
    });

    
    })

    .get( function(req, res) {
        
       bookController.getAllBooks(function(results){res.json(results);});

    });

router.route('/genres')
    .get( function(req,res) {
        bookController.getAllGenres(function(results){res.json(results);});
    });

router.route('/authors')
    .get( function(req,res) {
        bookController.getAllAuthors(function(results){res.json(results);});
    });

router.route('/:isbn')

    .get(function(req, res) {
        bookController.getBookDetails(req.params, function(results){res.json(results);});

    })
    
    .delete(function(req, res){
         bookController.deleteBook(req.params.isbn, function(results){
      res.json(results);
    });

    })

    .put(function(req,res){
        bookController.editBook(req.body, req.params.isbn, function(results){
      res.json(results);
    });

    });

module.exports = router;