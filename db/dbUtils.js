var Article = require("./article_Schema.js");


exports.insert=function(data) {
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

exports.update=function(wherestr,updatestr) {

	Article.update(wherestr, updatestr, function(err, res) {
		if(err) {
			console.log("Error:" + err);
		} else {
			console.log("Res:" + res);
		}
	})
}
//wherestr = {'author' : 'Tracy McGrady','title':"World War 2"}
exports.del=function(wherestr,fn) {

	Article.remove(wherestr, function(err, res) {
		if(err) {
			console.log("Error:" + err);
		} else {
			console.log("Res:" + res);
		}
	})
}

exports.getByConditions=function(wherestr,fn){
    
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

exports.getCountsByConditions=function(wherestr,fn){

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

exports.getArticleByPage=function(pageSize,page,fn){
	Article.find(function(err,res){
		if(err){
			console.log(err);
		}else{
			//console.log(res);
			fn(res);
		}
	}).skip(pageSize*(page-1)).limit(pageSize);
}