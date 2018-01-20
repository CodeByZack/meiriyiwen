
const express = require('express')
const router = express.Router()
//var dbUtils = require("../db/dbUtils.js");
router.get("/",function(req,res){
	var v_num = {};
	
	v_num.voice_num = RandomNum(0, voicePageCount) + "期";
	dbUtils.getVoiceByConditions(v_num, function(voice) {
	
		voice.img_src = voice.img_src.replace("_250", "");
		if(is_mobile(req)) {
			res.render("m/mvoiceplay", voice);
		} else {
			res.render("voiceplay", voice);
		}
	
	}); 
})
module.exports = router