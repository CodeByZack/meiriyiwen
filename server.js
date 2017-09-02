var express = require('express');
var app = express();
//数据库工具
//var dbUtils = require("./db/dbUtils.js");
var bodyParser = require("body-parser"); 
app.use(express.static('public'));
app.use(bodyParser.urlencoded({ extended: false }));  


app.engine('.html', require('ejs').renderFile);
app.set("view engine","html");


app.get("/",function(req,res){
	dbUtils.getCountsByConditions({}, function(count) {
		
		dbUtils.getByConditions({order: count-1}, function(article) {
			res.render("index",article);
		});
	});	
	
});

app.get('/random', function (req, res) {
	dbUtils.getCountsByConditions({}, function(count) {
		var index = RandomNum(0, count);
		dbUtils.getByConditions({order: index}, function(article) {
			res.render("index",article);
		});
	});
});
var d = {
	data:[
	{
		img_src : "img/voice_pic/448_img.jpg",
		title : "老白干",
		author : "作者：寒秋 主播：陈易",
		voice_num : "448期"		
	},
	{
		img_src : "img/voice_pic/448_img.jpg",
		title : "老白干",
		author : "作者：寒秋 主播：陈易",
		voice_num : "448期"		
	},
	{
		img_src : "img/voice_pic/448_img.jpg",
		title : "老白干",
		author : "作者：寒秋 主播：陈易",
		voice_num : "448期"		
	},
	]
};
app.get('/voice', function (req, res) {
	res.render("voice",d);
});
var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
	
  console.log('Example app listening at http://%s:%s', host, port);
});


function RandomNum(Min, Max) {
      var Range = Max - Min;
      var Rand = Math.random();
      var num = Min + Math.floor(Rand * Range); //舍去
      return num;
}

