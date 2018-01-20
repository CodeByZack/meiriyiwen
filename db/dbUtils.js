var Article = require("./mongo_Schema.js").article;
var Voice2 =  require("./mongo_Schema.js").voice;
let dbUtils = {}

dbUtils.insertArticle=function(data) {
	var article = new Article({
		order: data.order,
		title: data.title, 
		author: data.author, 
		content: data.content
	});
	article.save(function(err, res) {

		if(err) {
			console.log("Error:" + err);
		} else {
			console.log(res.order+" 保存成功！");
		}

	});
}

dbUtils.updateArticle=function(wherestr,updatestr) {

	Article.update(wherestr, updatestr, function(err, res) {
		if(err) {
			console.log("Error:" + err);
		} else {
			console.log("Res:" + res);
		}
	})
}
//wherestr = {'author' : 'Tracy McGrady','title':"World War 2"}
dbUtils.delArticle=function(wherestr,fn) {

	Article.remove(wherestr, function(err, res) {
		if(err) {
			console.log("Error:" + err);
			fn(err);
		} else {
			console.log("Res:" + res);
			fn(res);
		}
	})
}

dbUtils.getArticleByConditions=function(wherestr,fn){
    
    Article.find(wherestr, function(err, res){
        if (err) {
            console.log("Error:" + err);
        }
        else {
            //console.log("Res:" + res[0].title);
            fn(res[0]);
        }
    })
}

dbUtils.getArticleCountsByConditions=function(wherestr,fn){

    Article.count(wherestr, function(err, res){
        if (err) {
            console.log("Error:" + err);
        }
        else {
            //console.log("Res:" + res);
            fn(res);
        }
    })
}

dbUtils.getArticleByPage=function(pageSize,page,fn){
	Article.find(function(err,res){
		if(err){
			console.log(err);
		}else{
			//console.log(res);
			fn(res);
		}
	}).skip(pageSize*(page-1)).limit(pageSize);
}

dbUtils.insertVoice=function(data,fn) {
	var voice = new Voice2({
		img_src:  data.img_src,
    	title : data.title,                    
    	author: data.author,                      
    	voice_num: data.voice_num, 
    	voice_url: data.voice_url 
	});
	voice.save(function(err, res) {

		if(err) {
			console.log("Error:" + err);
		} else {
			if(fn){
				fn(res);
			}
			console.log(res.title+" 保存成功！");
		}

	});
}

dbUtils.updateVoice=function(wherestr,updatestr) {

	Voice2.update(wherestr, updatestr, function(err, res) {
		if(err) {
			console.log("Error:" + err);
		} else {
			console.log("Res:" + res);
		}
	})
}

dbUtils.delVoice=function(wherestr) {

	Voice2.remove(wherestr, function(err, res) {
		if(err) {
			console.log("Error:" + err);
		} else {
			console.log("Res:" + res);
		}
	})
}

dbUtils.getVoiceByConditions=function(wherestr,fn){
    
    Voice2.find(wherestr, function(err, res){
        if (err) {
            console.log("Error:" + err);
        }
        else {
            //console.log("Res:" + res[0].title);
            fn(res[0]);
        }
    })
}

dbUtils.getVoiceCountsByConditions=function(wherestr,fn){

    Voice2.count(wherestr, function(err, res){
        if (err) {
            console.log("Error:" + err);
        }
        else {
            //console.log("Res:" + res);
            fn(res);
        }
    })
}

dbUtils.getVoiceByPage=function(pageSize,page,fn){
	Voice2.find(function(err,res){
		if(err){
			console.log(err);
		}else{
			//console.log(res);
			fn(res);
		}
	}).skip(pageSize*(page-1)).limit(pageSize);
}


module.exports = dbUtils