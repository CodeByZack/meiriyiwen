var express = require('express');
var app = express();
var _ = require('lodash');


var qiniu = "http://oztlwbo2e.bkt.clouddn.com/";

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
		
			dbUtils.getByConditions({
				order: count - 1
			}, function(article) {
				if(is_mobile(req)){
					res.render("m/mindex",article);
				}else{
					res.render("index", article);
				}
			});
		});
});

app.get('/random', function (req, res) {
	dbUtils.getCountsByConditions({}, function(count) {
		var index = RandomNum(0, count);
		dbUtils.getByConditions({order: index}, function(article) {
			if(is_mobile(req)){
				res.render("m/mindex",article);
			}else{
				res.render("index",article);
			}
			
		});
	});
});

var voicePageCount ;
voiceDBUtils.getCountsByConditions({},function(num){
	voicePageCount = num/12+1;
	
});
app.get('/voicelist', function (req, res) {
	
	var voice_page_data = {};
	var nowPage;
	//需要vociedata
	//需要arrary
	//需要page

	nowPage = req.query.page ? req.query.page : 1;
	
	voice_page_data.arrary = [nowPage];
	voice_page_data.page = nowPage;

	voiceDBUtils.getVoiceByPage(12, nowPage, function(voice) {
		voice_page_data.data = voice;
		if(is_mobile(req)){
			for(var i = 1; i < 4; i++) {
				if(nowPage - i > 0) {
					voice_page_data.arrary.unshift(nowPage - i);
				}
				if(nowPage - 0 + i <= voicePageCount) {
					voice_page_data.arrary.push(nowPage - 0 + i);
				}
			}
			res.render("m/mvoice", voice_page_data);
		}else{
			for(var i = 1; i < 5; i++) {
				if(nowPage - i > 0) {
					voice_page_data.arrary.unshift(nowPage - i);
				}
				if(nowPage - 0 + i <= voicePageCount) {
					voice_page_data.arrary.push(nowPage - 0 + i);
				}
			}
			res.render("voice", voice_page_data);
		}
		
	});
	
});


app.get('/playrandom',function(req,res){
	
	
	var v_num = {};
	
	v_num.voice_num = RandomNum(0, voicePageCount) + "期";
	voiceDBUtils.getByConditions(v_num, function(voice) {
	
		voice.img_src = voice.img_src.replace("_250", "");
		if(is_mobile(req)) {
			res.render("m/mvoiceplay", voice);
		} else {
			res.render("voiceplay", voice);
		}
	
	});

});

app.get('/play',function(req,res){
	
	var v_num = {};
	
	if(req.query.num){
		v_num.voice_num = req.query.num+"期";
		voiceDBUtils.getByConditions(v_num,function(voice){
		
			voice.img_src = voice.img_src.replace("_250","");
			if(is_mobile(req)){
				res.render("m/mvoiceplay",voice);
			}else{
				res.render("voiceplay",voice);
			}
			
		});
	}

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



var is_mobile = function (req) {
    var ua = req.get('User-Agent')
    if (_.isEmpty(ua)) {
        return false;
    }
    return /Android|webOS|iPhone|iPod|BlackBerry/i.test(ua);
}