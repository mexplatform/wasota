var express = require('express');
var session = require('express-session');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var routes = require('./routes/index');
var home = require('./routes/home');
var add = require('./routes/add');
var search = require('./routes/search');
var login = require('./routes/login');
var register = require('./routes/register');
var proxy = require('./routes/proxy');
var admin = require('./routes/admin');

var app = express();

// view engine setup
// app.use(session({
//   cookieName: 'session',
//   secret: 'random_string_goes_here',
//   duration: 30 * 60 * 1000,
//   activeDuration: 5 * 60 * 1000,
// }));
app.set('views', path.join(__dirname, 'views'));
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(express.static(process.cwd() + '/public'));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);
app.use('/partial/home', home);
app.use('/partial/add', add);
app.use('/partial/search', search);
app.use('/partial/login', login);
app.use('/partial/register', register);
app.use('/proxy', proxy);
app.use('/partial/admin/area', admin);

var bodyParser = require('body-parser');
app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

// catch 404 and forward to error handler
 // app.use(function(req, res, next) {
  //  var err = new Error('Not Found');
  //  err.status = 404;
  //  next(err);
 // });


// error handlers

// development error handler
// will print stacktrace
 // if (app.get('env') === 'development') {
  //  app.use(function(err, req, res, next) {
  //    res.status(err.status || 500);
  //    res.render('error', {
  //      message: err.message,
  //      error: err
  //    });
  //  });
 // }

// production error handler
// no stacktraces leaked to user
// app.use(function(err, req, res, next) {
//   res.status(err.status || 500);
//   res.render('error', {
//     message: err.message,
//     error: {}
//   });
// });


module.exports = app;
