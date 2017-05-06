var express    = require('express');        // call express
var app        = express();                 // define our app using express
var bodyParser = require('body-parser');

var orders = require('./routers/orders');
var books = require('./routers/books');
var users = require('./routers/users');
var queue = require('./routers/queue');
var sheduler = require('./handlers/sheduler')
const localConfig = require('./config');
var jwt    = require('jsonwebtoken'); // used to create, sign, and verify tokens

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var mongoose   = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://'+localConfig.connection.host+'/'+localConfig.connection.name); // connect to our database
app.use(function(req, res, next){
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.setHeader('Access-Control-Allow-Headers', 'x-access-token');
    next();
});
app.use('/orders', orders);
app.use('/books', books);
app.use('/users', users);
app.use('/queue', queue);

app.listen(localConfig.application.port);
console.log('Magic happens on port ' + localConfig.application.port);

//sheduler();
