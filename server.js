var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

var orders = require('./routers/orders');
var books = require('./routers/books');
var users = require('./routers/users');
var sheduler = require('./handlers/sheduler')
const localConfig = require('./config');

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var mongoose   = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://'+localConfig.connection.host+'/'+localConfig.connection.name); // connect to our database

app.use('/orders', orders);
app.use('/books', books);
app.use('/users', users);

app.listen(localConfig.application.port);
console.log('Magic happens on port ' + localConfig.application.port);

//sheduler();
