var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var fs = require('fs');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var gameRouter = require('./routes/game');
var adminstartor = require('./routes/admin');
var ajaxTest = require('./routes/ajaxTest');
var gameRoute = require('./routes/gameRoute');
var session = require('express-session');
//var socket = require("./node_modules/socket.io-client/dist/socket.io");
var app = express();
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
//module(need loading after router)
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({ 
  resave:true,
  saveUninitialized:true,
  secret:"funnyHouseECProject",
  cookie:{
    maxAge:1000*60*60*24,
    httpOnly:true,
    signed:true
  }
}));
//router
app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/game',gameRouter);
app.use('/admin',adminstartor);
app.use('/ajaxTest',ajaxTest);
app.use('/gameRoute',gameRoute);
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
