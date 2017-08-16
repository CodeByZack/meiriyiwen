var http = require('https');
var fs = require('fs');
var cheerio = require('cheerio');
var request = require('request');
//数据库工具
var dbUtils = require("./db/dbUtils.js");

//var fileUrl = 'http://static.meiriyiwen.com/20111225.mp3';
//var filename = '20111225.mp3';
//downloadFile(fileUrl, filename, function() {
//	console.log(filename + '下载完毕');
//});

//工具函数
function savedContent(fileName,content) {
	
	var p = "./article/"+fileName+".txt";
    fs.writeFile(p, content, function(err){  
        if(err)  
            console.log("fail " + err);  
        else  
            console.log("写入文件ok");  
    });	
}

function downloadFile(uri, filename, callback) {
	var stream = fs.createWriteStream("./MP3/"+filename);
	request(uri).pipe(stream).on('close', callback);
}










//控制单次爬取文章数量
var i = 50;
//爬虫地址
var url = "https://meiriyiwen.com/random";
//初始url 

function fetchPage(x) { //封装了一层函数
	startRequest(x);
}

function startRequest(x) {
	//采用http模块向服务器发起一次get请求      
	http.get(x, function(res) {
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

			var article_title = $("#article_show h1").text();
			var article_author = $(".article_author span").text();
			var article_text = $('#article_show .article_text').html().trim();

			i--;
			var article = {
				title : article_title,
				author: article_author,
				content:article_text
			}
			var whrstr = { title : article_title };
			dbUtils.getCountsByConditions()
			dbUtils.insert(article);
			if(i>0){
				fetchPage(url);
			}
		});

	}).on('error', function(err) {
		console.log(err);
	});

}





fetchPage(url); //主程序开始运行

