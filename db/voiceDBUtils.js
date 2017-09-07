var Voice = require("./voice_Schema.js");


exports.insert=function(data) {
	var voice = new Voice({
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
			console.log(res.title+" 保存成功！");
		}

	});
}

exports.update=function(wherestr,updatestr) {

	Voice.update(wherestr, updatestr, function(err, res) {
		if(err) {
			console.log("Error:" + err);
		} else {
			console.log("Res:" + res);
		}
	})
}

exports.del=function(wherestr) {

	Voice.remove(wherestr, function(err, res) {
		if(err) {
			console.log("Error:" + err);
		} else {
			console.log("Res:" + res);
		}
	})
}

exports.getByConditions=function(wherestr,fn){
    
    Voice.find(wherestr, function(err, res){
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

    Voice.count(wherestr, function(err, res){
        if (err) {
            console.log("Error:" + err);
        }
        else {
            //console.log("Res:" + res);
            fn(res);
        }
    })
}

exports.getVoiceByPage=function(pageSize,page,fn){
	Voice.find(function(err,res){
		if(err){
			console.log(err);
		}else{
			//console.log(res);
			fn(res);
		}
	}).skip(pageSize*(page-1)).limit(pageSize);
}
