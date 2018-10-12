var connect = require('connect');
var http = require('http');

var app = connect();
 
// gzip/deflate outgoing responses
var compression = require('compression');
app.use(compression());
 
// store session state in browser cookie
var cookieSession = require('cookie-session');
app.use(cookieSession({
  keys: ['secret1', 'secret2']
}));
 
// parse urlencoded request bodies into req.body
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({extended: false}));

// var bellMock = require('../src/index');
// app.use(bellMock());
app.use(function (req, res, next) {
  next();
});
 
//create node.js http server and listen on port
http.createServer(app).listen(3000);

   
var data = { 
  a: 123, 
  time: new Date().getTime()
}; // 这是需要提交的数据 
   
var options = { 
  hostname: '127.0.0.1', 
  port: 3000, 
  path: '/pay/pay_callback', 
  method: 'POST' 
}; 
   
var req = http.request(options, function (res) { 
  res.setEncoding('utf8'); 
  res.on('data', function (chunk) { 
    console.log('BODY: ' + chunk); 
  }); 
}); 
   
req.on('error', function (e) { 
  console.log('problem with request: ' + e.message); 
}); 
   
req.end();