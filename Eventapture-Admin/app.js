  var express = require('express');
  var path = require('path');
  var favicon = require('serve-favicon');
  var logger = require('morgan');
  var cookieParser = require('cookie-parser');
  var bodyParser = require('body-parser');

  var db = require('./db/db');
  var index = require('./routes/index.route');
  var suggestedStories = require('./routes/suggestedStories.route');
  var app = express();
  app.use(express.static(path.join(__dirname, 'public')));

  // view engine setup
  app.set('views', __dirname + '/public');
  app.set('view engine', 'html');

  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());

  //rendering static pages
  app.use('/', index);

  //rendering backend data
  app.use('/suggestedStories', suggestedStories);

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
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
