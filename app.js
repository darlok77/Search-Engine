const createError = require('http-errors');
const express = require('express');
const path = require('path');
const session = require('express-session');
const favicon = require('serve-favicon');
const bodyParser = require('body-parser');
const mongoose = require('mongoose')
const cookieParser = require('cookie-parser');
const logger = require('morgan');



const Article = require('./models/article');
const Website = require('./models/website');
const indexRouter = require('./routes/index');
const websites = require('./routes/websites');
const articles = require('./routes/articles')


const app = express();

mongoose.connect('mongodb://localhost/site-search');
const db = mongoose.connection;

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/websites', websites);
app.use('/articles', articles);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
 // next(createError(404));
  var err = new Error('Not Found');
  err.status = 404;
  //next(err);
  var msg = 'This page does not exist';
  res.render('error', {
              error: err.status,
              message: msg,
            });
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
 var msg = 'Internal Servor error';
    res.render('error', {
              error: err.status,
              message: msg,
            });
});

module.exports = app;
