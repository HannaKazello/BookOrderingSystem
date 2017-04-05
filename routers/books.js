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

        bookController.addNewBook(req.body, function(err, results){
            if (err){
                res.writeHead(500);
              res.end();
            }
            else res.json(results);
    });


    })

    .get( function(req, res) {

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

router.route('/:isbn')

    .get(function(req, res) {
        bookController.getBookDetails(req.params, function(err,results){
            if (err){
                res.writeHead(500);
              res.end();
            }
            else res.json(results);
        });

    })

    .delete(function(req, res){
         bookController.deleteBook(req.params.isbn, function(err,results){
             if (err){
                 res.writeHead(500);
               res.end();
             }
             else res.json(results);
    });

    })

    .put(function(req,res){
        bookController.editBook(req.body, req.params.isbn, function(err,results){
            if (err){
                res.writeHead(500);
              res.end();
            }
            else res.json(results);
    });

    });

module.exports = router;
