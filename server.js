var express = require('express');
var app = express();
var config = require("./config/config.js");
var mongo = require('./db/mongodb.js');
var bodyParser = require("body-parser"); 
var routes = require('./routes/routes');
const winston = require('winston')
const expressWinston = require('express-winston')
require("./global.js");

app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));  
app.engine('.html', require('ejs').renderFile);
app.set("view engine","html");

mongo.connect(config.mongodb);

dbUtils.getVoiceCountsByConditions({},function(num){
  voiceCounts = num;
	voicePageCount = num/12+1;
});
dbUtils.getArticleCountsByConditions({},function(num){
	articleCounts = num;
});

// 正常请求的日志
app.use(expressWinston.logger({
  transports: [
    new (winston.transports.Console)({
      json: true,
      colorize: true
    }),
    new winston.transports.File({
      filename: 'logs/success.log'
    })
  ]
}))
// 路由
routes(app)
// 错误请求的日志
app.use(expressWinston.errorLogger({
  transports: [
    new winston.transports.Console({
      json: true,
      colorize: true
    }),
    new winston.transports.File({
      filename: 'logs/error.log'
    })
  ]
}))

var server = app.listen(config.port, function () {
  var host = server.address().address;
  var port = server.address().port;
	
  console.log('Example app listening at http://%s:%s', host, port);
});

