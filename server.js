var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

var birds = require('./routers/birds');
var books = require('./routers/books');


// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
//var mongoose   = require('mongoose');
//mongoose.connect('mongodb://localhost/bear'); // connect to our database


var port = process.env.PORT || 8080;        // set our port


app.use('/birds', birds);
app.use('/books', books);

app.listen(port);
console.log('Magic happens on port ' + port);
