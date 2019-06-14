var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');

var app = express();

//new imported
var bodyParser = require('body-parser');
const cors = require('cors')
var fs = require('fs');

var server = require('http').createServer(app);
var io = require('socket.io')(server);
var helper = require('./helpers/helpers');

var user_socket_connect_list = [];



// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


//harsh added--
const corsOptions = {
  origin: '*',
  // origin: 'http://67.207.82.224',
};
app.use(cors(corsOptions));

fs.readdirSync('./controllers').forEach(function (file) {

  if (file.substr(-3) == '.js') {
    // console.log("/controllers/" + file);
    route = require(__dirname+"/controllers/" + file);

    route.controller(app, io, user_socket_connect_list); 
  }

})

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


// mongodb setup

server.listen(3001);

module.exports = app;
