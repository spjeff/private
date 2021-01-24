var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

//from https://stackoverflow.com/questions/17981677/using-post-data-to-write-to-local-file-with-node-js-and-express
var fs = require('fs');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//REM app.use('/', indexRouter);
//REM app.use('/users', usersRouter);

// from https://stackoverflow.com/questions/21119288/simplest-way-to-have-express-serve-a-default-page
// app.get('/', function(req, res){
//   res.sendfile('index.html', { root: __dirname } );
// });

// from https://stackoverflow.com/questions/17981677/using-post-data-to-write-to-local-file-with-node-js-and-express
app.post('/proposal', function(request, respond) {
  var body = '';
  body += "\r\n";
  body += (new Date()).toString();
  body += "\r\n";
  filePath = __dirname + '/proposal.txt';
  request.on('data', function(data) {
      body += data;
  });

  request.on('end', function (){
      fs.appendFile(filePath, body, function() {
          respond.end();
      });
  });
});

app.post('/auth', function(request, respond) {
  var body = '';
  body += "\r\n";
  body += (new Date()).toString();
  body += "\r\n";
  filePath = __dirname + '/auth.txt';
  request.on('data', function(data) {
      body += data;
  });

  request.on('end', function (){
      fs.appendFile(filePath, body, function() {
          respond.end();
      });
  });
});

// from https://expressjs.com/en/starter/static-files.html
app.use(express.static(__dirname));



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
