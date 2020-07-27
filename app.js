var createError = require('http-errors');
var express = require('express');
var path = require('path');
var Config = require('./lib/config/config.js');
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var proxy = require('express-http-proxy');
var cors = require('cors');
var { corsWhitelist } = require('./lib/config/config.js');


var app = express();
var corsOptionsDelegate = function(req, callback) {
    let corsOptions;
    if (corsWhitelist.indexOf(req.header('Origin')) !== -1) {
        corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
    } else {
        corsOptions = { origin: false } // disable CORS for this request
    }
    callback(null, corsOptions) // callback expects two parameters: error and options
};

app.use(cors(corsOptionsDelegate)); // 解决跨域问题

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


app.use(logger('dev'));
app.use(bodyParser.json({limit: '100mb'}));
app.use(express.json({limit: '100mb'}));
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

//自动加载路由
app.use('/', require('./routes'));
//转发请求
// 反向代理（这里把需要进行反代的路径配置到这里即可）
let opts = {
    preserveHostHdr: true,
    https: true,
    reqAsBuffer:true,
    proxyReqPathResolver: function(req, res) {
        console.log('路径')
        console.log(require('url').parse(req.url).path)
        return require('url').parse(req.url).path;
    }
}
app.use('/app', proxy('http://donuttest.koolearn.com',opts));
// catch 404 and forward to error handler
// 如果任何路由都没匹配到，则认为 404
app.use(function(req, res, next) {
    console.log('未匹配的路由', req.url, '来源ip：', req.headers['x-real-ip']);
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