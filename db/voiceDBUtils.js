var Voice2 = require("./voice_Schema.js");


exports.insert=function(data,fn) {
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

exports.update=function(wherestr,updatestr) {

	Voice2.update(wherestr, updatestr, function(err, res) {
		if(err) {
			console.log("Error:" + err);
		} else {
			console.log("Res:" + res);
		}
	})
}

exports.del=function(wherestr) {

	Voice2.remove(wherestr, function(err, res) {
		if(err) {
			console.log("Error:" + err);
		} else {
			console.log("Res:" + res);
		}
	})
}

exports.getByConditions=function(wherestr,fn){
    
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

exports.getCountsByConditions=function(wherestr,fn){

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

exports.getVoiceByPage=function(pageSize,page,fn){
	Voice2.find(function(err,res){
		if(err){
			console.log(err);
		}else{
			//console.log(res);
			fn(res);
		}
	}).skip(pageSize*(page-1)).limit(pageSize);
}
