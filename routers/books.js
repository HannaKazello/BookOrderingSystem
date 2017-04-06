var express = require('express');
var router = express.Router();
var bookController = require("../handlers/book-controller");
var isAuthenticated = require('../middlewares/auth');

// middleware that is specific to this router

router.post('/', isAuthenticated, function(req, res) {

        bookController.addNewBook(req.body, function(err, results){
            if (err){
                res.writeHead(500);
              res.end();
            }
            else res.json(results);
    });


});

router.get('/', function(req, res) {

       bookController.getAllBooks(function(err,results){
           if (err){
               res.writeHead(500);
			   res.end();
           }
           else res.json(results);
       });

    });

router.route('/search/:searchString')
    .get( function(req,res) {
        bookController.search(req.params.searchString, function(err, results){
            if (err){
                res.writeHead(500);
              res.end();
            }
            else res.json(results);
        });
    });

router.route('/genres')
    .get( function(req,res) {
        bookController.getAllGenres(function(err, results){
            if (err){
                res.writeHead(500);
              res.end();
            }
            else res.json(results);
        });
    });
router.route('/genres/:genre')
    .get( function(req,res) {
        bookController.getBooksByGenre(req.params.genre, function(err, results){
            if (err){
                res.writeHead(500);
              res.end();
            }
            else res.json(results);
        });
    });

router.route('/authors')
    .get( function(req,res) {
        bookController.getAllAuthors(function(err,results){
            if (err){
                res.writeHead(500);
              res.end();
            }
            else res.json(results);
        });
    });

router.route('/authors/:author')
    .get( function(req,res) {
        bookController.getBooksByAuthor(req.params.author, function(err, results){
            if (err){
                res.writeHead(500);
              res.end();
            }
            else res.json(results);
        });
    });

router.get('/:isbn',function(req, res) {
        bookController.getBookDetails(req.params, function(err,results){
            if (err){
                res.writeHead(500);
              res.end();
            }
            else res.json(results);
        });

    });

    router.delete('/:isbn', isAuthenticated, function(req, res){
         bookController.deleteBook(req.params.isbn, function(err,results){
             if (err){
                 res.writeHead(500);
               res.end();
             }
             else res.json(results);
    });

});

    router.put('/:isbn',isAuthenticated, function(req,res){
        bookController.editBook(req.body, req.params.isbn, function(err,results){
            if (err){
                res.writeHead(500);
              res.end();
            }
            else res.json(results);
    });

    });

module.exports = router;
