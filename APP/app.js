var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var swig = require('swig');

var routes = require('./routes/index');
var skylarkWeb = require('./routes/skylarkWeb');
var ulogin = require('./routes/login');
var request = require('request');
var session = require('express-session');

var dataRequest = require('./routes/webService');

var app = express();

// view engine setup
app.set('views', __dirname + '/applications')
app.engine('html', swig.renderFile);
app.set('view engine', 'html');

swig.setDefaults({ varControls: ['<%=', '%>'] });

// session settings
app.set('trust proxy', 1) // trust first proxy
app.use(session({
  secret: 'skylarkWeb',
  resave: false,
  saveUninitialized: true,
  //cookie: { secure: true }
}))
// uncomment after placing your favicon in /public
app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/skylarkWebAssets', express.static(path.join(__dirname, 'applications/skylarkWeb/')));
app.use('/nodeModules', express.static(path.join(__dirname, 'node_modules/')));
app.use('/images', express.static(path.join(__dirname, 'public/images')));

app.use('/', ulogin);
app.use('/skylarkWeb', skylarkWeb);
app.use('/login', ulogin);
app.use('/webService', dataRequest);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handlers

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
      message: err.message,
      error: err
    });
  });
}

// production error handler
// no stacktraces leaked to user
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.render('error', {
    message: err.message,
    error: {}
  });
});


module.exports = app;