var http = require('https');
var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');

var voiceDBUtils = require("./db/voiceDBUtils.js");

/*
 *两个工具类
 * downloadFile 下载文件到本地
 * 保存文本到本地
 */
function downloadFile(uri, filename, callback) {
	var stream = fs.createWriteStream(filename);
	request(uri).pipe(stream).on('close', callback);
}

function savedContent(fileName,content) {
	var p = "./json/"+fileName+".json";
    fs.writeFile(p, content, function(err){  
        if(err)  
            console.log("fail " + err);  
        else  
            console.log("写入文件ok");  
    });	
}


//voiceDBUtils.getCountsByConditions({},function(res){
//	console.log("Res:" + res);
//});

//voiceDBUtils.getByConditions({"voice_num":"439期"},function(res){
//	console.log("Res:" + res.title);
//});

//voiceDBUtils.getVoiceByPage(12,2);


//var o;
//var num=0 ;
//function readContent(fileName){
//	fs.readFile(fileName,"utf-8",function(err,data){
//		if(err)console.log(err);
//		else{
//			//console.log(data);
//			o = JSON.parse(data);
//
//			console.log(o.desc[0]);
//
//			test();
//	
//		}
//	});
//}
//
//function test(){
//	
//	console.log(num);
//	var voice = {
//		img_src:  o.desc[num].img_src,
//  	title : o.desc[num].title,                    
//  	author: o.desc[num].author,                      
//  	voice_num: o.desc.length-num+"期", 
//  	voice_url: o.desc[num].voice_url 
//	};	
//			
//			
//
//	voiceDBUtils.insert(voice,function(res){
//		console.log(num+"插入成功！");
//		num++;
//		if(num<o.desc.length){
//			test();
//		}				
//	});
//}
//readContent("./json/voice_item_detail.json");

/*
 *下载声音文件
 * 需要 下载地址 在 o[key]里，key为“num+期”
 * 需要存放路径 固定为./public/voice/460.mp3
 * */
function downloadMP3(){
	
	var uri = o[num+"期"];
	var fileName = "./public/voice/"+num+".mp3"
	if(uri != null){
		console.log("开始下载"+num);
		//下载文件
		downloadFile(uri,fileName,function(){
			console.log(num+"期下载成功！");
			if(num<461){
				num++;
				downloadMP3();
			}
		});

	}else{
		console.log("这期没有地址"+num);
		if(num<461){
			num++;
			downloadMP3();
		}
	}
	//
}





//抓取声音的下载链接，现在一共有1-461篇
var num_url = {};

var voice_num = 1;

function  getVoiceDownloadUrl(){
	
	var pathHeader = "/voice/show?vid=";
	var option={
    	hostname:'voice.meiriyiwen.com',
    	path:'/voice/show?vid=450',
    	headers:{
      	'Accept':'*/*',
      	'Accept-Encoding':'utf-8',  //这里设置返回的编码方式 设置其他的会是乱码
      	'Accept-Language':'zh-CN,zh;q=0.8',
      	'Connection':'keep-alive',
      	'Host':'voice.meiriyiwen.com',
      	'User-Agent':'Mozilla/5.0 (iPhone; CPU iPhone OS 9_1 like Mac OS X) AppleWebKit/601.1.46 (KHTML, like Gecko) Version/9.0 Mobile/13B143 Safari/601.1'
    	}
  	};
  	option.path = pathHeader + voice_num;
  	http.get(option, function(res) {
  		var html = "";
  		res.setEncoding('utf-8');
  		res.on('data', function(chunk) {
  			html += chunk;
  		});
  		res.on('end', function() {
  			//console.log(html);
  			var $ = cheerio.load(html, {
  				decodeEntities: false
  			}); //采用cheerio模块解析html
  			console.log($("audio").attr("src"));
  			if(voice_num<461){
  				var key = voice_num+"期";
  				var url = $("audio").attr("src");
  				num_url[key] = url;
  				voice_num++;
  				getVoiceDownloadUrl();
  			}else{
  				var key = voice_num+"期";
  				var url = $("audio").attr("src");
  				num_url[key] = url;
  				var jsonurl = JSON.stringify(num_url,null,4);
  				savedContent("voice_num_url",jsonurl);
  			}
  		});	
  	});
  	

	
}

//getVoiceDownloadUrl();














//下载img
var img_url_f = "http://voice.meiriyiwen.com/upload_imgs/"
var img_url_b = "_img.jpg";
var img_url_b_250 = "_img_250.jpg";

var img_bk_url_f = "https://meiriyiwen.com/images/new_feed/bg_";
var img_bk_url_b = ".jpg";
var x = 1;
function getimgsrc(){
	var uri = img_bk_url_f+x+img_bk_url_b;
	var filename = x+"_bk.jpg";
	downloadFile(uri,filename,function(){
		console.log(filename+"下载完了！");
		if(x<98){
			x++;
			getimgsrc();
		}
	});	
}

//getimgsrc();





//下载voice的作者标题 期数等
var url = "https://voice.meiriyiwen.com/voice/past?page=";
var i = 1;
var voice_item_list = {desc:[]}
function startRequest() {
	//采用http模块向服务器发起一次get请求      
	http.get(url+i, function(res) {
		var html = ''; //用来存储请求网页的整个html内容
		var titles = [];
		res.setEncoding('utf-8'); //防止中文乱码
		//监听data事件，每次取一块数据
		res.on('data', function(chunk) {
			html += chunk;
		});
		//监听end事件，如果整个网页内容的html都获取完毕，就执行回调函数
		res.on('end', function() {

			var $ = cheerio.load(html, {decodeEntities: false}); //采用cheerio模块解析html
			$(".list_box").each(function(index,elem){
				
				var img_src = $(elem).children(".box_list_img").children().attr("src");
				var title = $(elem).children(".list_author").text().trim();
				var author = $(elem).children(".author_name").text().trim();
				var voice_num = $(elem).children(".voice_tag").text().trim();

				//voice_item_list.desc.push({	
				//	img_src: "/upload_imgs/450_img_250.jpg",
				//	title: "老白干",
				//	author: "作者：寒秋 主播：陈易",
				//	voice_num: "448期",
				//	voice_url:"/voice/448.mp3"
				//});
				//
				var i = {};
				i.img_src = img_src;
				i.title = title;
				i.author =author;
				i.voice_num = voice_num;
				i.voice_url = "/voice/"+parseInt(voice_num)+".mp3";
				voice_item_list.desc.push(i);
			});
			
			if(i<40){
				i++;
				startRequest();
			}else{
				var jsonList = JSON.stringify(voice_item_list,null,4);
				savedContent("voice_itme_detail",jsonList);
				
			}
			
		});

	}).on('error', function(err) {
		console.log(err);
	});

}
//startRequest();

