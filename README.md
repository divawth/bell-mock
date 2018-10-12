# bell-mock

启动本地服务器

connect

如何写一个中间件
app.use(a());
var a = function () {
  return function (req, res, next) {
    next();
  }
};

发送请求
  var http = require('http');
  http.request(options, function (res) {
    console.log('STATUS: ' + res.statusCode); 
    console.log('HEADERS: ' + JSON.stringify(res.headers)); 
    res.setEncoding('utf8'); 
    res.on('data', function (chunk) { 
        console.log('BODY: ' + chunk); 
    }); 
  });

拦截请求

中间件中的 req res 可以获取到请求并处理 res
查询 config 文件
创建对应的 mock 文件 并返回一个数据

如何展示一个页面
页面里面发请求
