var express = require('express');
var app = express();
//数据库工具
var dbUtils = require("./db/dbUtils.js");
var voiceDBUtils = require("./db/voiceDBUtils.js");

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


var voicePageCount ;
voiceDBUtils.getCountsByConditions({},function(num){
	voicePageCount = num/12+1;
	
});
app.get('/voice2', function (req, res) {
	
	
	console.log(req.query);
	var voice_page_data = {};
	var nowPage ;
	//需要vociedata
	//需要arrary
	//需要page
	
	nowPage = req.query.page?req.query.page:1;
	
	voice_page_data.arrary = [nowPage];
	voice_page_data.page = nowPage;
	for(var i=1;i<5;i++){
		if(nowPage-i>0){
			voice_page_data.arrary.unshift(nowPage-i);
		}
		if(nowPage-0+i<=voicePageCount){
			voice_page_data.arrary.push(nowPage-0+i);
		}
	}
	voiceDBUtils.getVoiceByPage(12, nowPage, function(voice) {
		voice_page_data.data = voice;
		res.render("voice", voice_page_data);
	});

	 
	
});


app.get('/play',function(req,res){
	res.render("voiceplay");
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

