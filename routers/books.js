var express = require('express');
var router = express.Router();

// middleware that is specific to this router
router.use(function timeLog(req, res, next) {
  console.log('we call books router');
  next();
})
router.post('/', function(req, res) {
        res.send('Book created');
    })
    router.get("/", function(req, res) {
        res.send('All book');
    });
router.route('/:book_id')

    .get(function(req, res) {
        res.send("This book?");
    })
    
    .delete(function(req, res){
        res.send("Book deleted");
    })

    .put(function(req,res){
        res.send("we change book");
    });

module.exports = router;