var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var session = require('express-session');

var app = express();

/**
 * 设置跨域请求
 */
app.all('*', function(req, res, next){
    // res.header('Access-Control-Allow-Origin', '*');设置credentials之后此处不能设为*
    res.header('Access-Control-Allow-Origin', 'http://localhost:3000');// 需要制定为有限的origin
    res.header('Access-Control-Allow-Headers', 'X-Request-With');
    res.header('Access-Control-Allow-Methods', 'PUT,POST,GET,DELETE,OPTIONS');
    res.header('X-Powered-by', '3.2.1');
    res.header('Content-Type', 'application/json;charset=utf-8');
    res.header("Access-Control-Allow-Credentials","true");// 解决跨域时cookie信息缺失的问题 1
    next();
});

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');


// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));
app.use(cookieParser('fuybooo'));
app.use(session({
    secret: 'fuybooo',
    cookie: {maxAge: 30 * 60 * 1000},
    resave: true,
    saveUninitialized: false
}));
app.use(express.static(path.join(__dirname, 'public')));

// app.use('/', require('./routes/index'));
app.use('/request', require('./routes/request'));

app.use('/register', require('./routes/register'));
app.use('/login', require('./routes/login'));
app.use('/logout', require('./routes/logout'));
app.use('/user', require('./routes/user'));
var webSocket = require('./routes/web-socket').createWebSocket;

webSocket();




// catch 404 and forward to error handler
app.use(function (req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});

module.exports = app;
