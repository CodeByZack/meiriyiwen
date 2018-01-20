
const express = require('express')
const router = express.Router()
//var dbUtils = require("../db/dbUtils.js");
router.get("/",function(req,res){
	var v_num = {};
	if(req.query.num && req.query.num<=voiceCounts){
		v_num.voice_num = req.query.num+"期";
		dbUtils.getVoiceByConditions(v_num,function(voice){
			voice.img_src = voice.img_src.replace("_250","");
			if(is_mobile(req)){
				res.render("m/mvoiceplay",voice);
			}else{
				res.render("voiceplay",voice);
			}
			
		});
	}else{
		res.status(404).render('404');
	} 
})
module.exports = router