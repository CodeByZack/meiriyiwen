
const express = require('express')
const router = express.Router()
//var dbUtils = require("../db/dbUtils.js");
router.get("/",function(req,res){
	var v_num = {};
	
	v_num.voice_num = RandomNum(0, voiceCounts);
	console.log(v_num.voice_num);
	console.log(voiceCounts);
	dbUtils.getVoiceByConditions(v_num, function(voice) {
		if(is_mobile(req)) {
			res.render("m/mvoiceplay", voice);
		} else {
			res.render("voiceplay", voice);
		}
	
	}); 
})
module.exports = router