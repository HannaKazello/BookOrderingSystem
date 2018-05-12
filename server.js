import express from 'express';
import bodyParser from 'body-parser';

import orders from './routers/orders';
import books from './routers/books';
import users from './routers/users';
import queue from './routers/queue';
import sheduler from './handlers/sheduler';
import localConfig from './config';

const app = express(); // define our app using express

// configure app to use bodyParser()
// this will let us get the data from a POST
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// var mongoose   = require('mongoose');
// mongoose.Promise = global.Promise;
// mongoose.connect('mongodb://'+localConfig.connection.host+'/'+localConfig.connection.name); // connect to our database

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', true);
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT ,DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'x-access-token');
  next();
});

app.use('/orders', orders);
app.use('/books', books);
app.use('/users', users);
app.use('/queue', queue);

app.listen(localConfig.application.port);

console.info('Magic happens on port ', localConfig.application.port);

sheduler();
