var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger= require('./modules/logging/logger');
var errorLogger = require('./modules/logging/error-logger');
var NotFound = require('./modules/errors/not-found');
var InternalError = require('./modules/errors/internal');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var users = require('./routes/users');
// a special route for receiving a custom webhook fired by Loggly alert for status 500 errors
var webhook500 = require('./routes/webhooks/500');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(require('./modules/logging/request'));
// loggly webhooks can come in as text/plain
app.use(bodyParser.text());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(require('compression')());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/users', users);

// listen for webhooks
app.use('/webhooks/500', webhook500);

app.use('/error/500', function (req, res, next) {
  // on purpose give internal error for testing purposes
  next (new InternalError('500 on purpose'));
});

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new NotFound(req);
  errorLogger.log(err, err.tags, function (err) {
    // catch if there has been an error with logger
    if (err) console.error('error', err);
  });
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    var error = err.status ? err : new InternalError(err, req);
    errorLogger.log(error, error.tags);
    res.status(error.status);
    res.render('error', {
      message: error.message,
      error: error
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  var error = err.status ? err : new InternalError(err, req);
  errorLogger.log(error, error.tags);
  res.status(error.status);
  res.render('error', {
    message: error.message,
    error: {}
  });
});


module.exports = app;
