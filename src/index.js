var cwd = process.cwd();
var fs = require('fs');

var resDefault = {
  // 可以通过该属性来设置响应的延时，也可以设为值为'0,100'，表示随机 0-100ms 的延时，默认 0
  'timeout': 0,

  // 通过该状态来设置响应的 http 的状态码，默认 200
  'status': 200,

  // 对于要响应的 json 数据可以统一放在该字段里，也可以不使用该字段，直接跟 _xx 属性平级放
  'data': {}
};

var scanDir = function (cwd, url) {
  var mockPath = cwd + '/mock';
  if (!fs.existsSync(mockPath)) {
    fs.mkdirSync(mockPath);
  }
  var paths = url.substr(1).split('/');
  paths.forEach(
    (path, index) => {
      mockPath = mockPath + '/' + path;
      if (index == paths.length - 1) {
        fs.writeFileSync(mockPath + '.js', JSON.stringify(resDefault), 'utf-8');
        return;
      }
      if (!fs.existsSync(mockPath)) {
        fs.mkdirSync(mockPath);
      }
    }
  );
}

exports = module.exports = function (option) {
  return function (req, res, next) {
    var mockDir = cwd + '/mock' + req.url + '.js';
    if (!fs.existsSync(mockDir)) {
      scanDir(cwd, req.url);
    }
    
    fs.readFile(mockDir, 'utf8', (error, data) => {
      console.log(data);
      res.write(data);
      next();
    });
    
  };
}