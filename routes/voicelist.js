
const express = require('express')
const router = express.Router()
//var dbUtils = require("../db/dbUtils.js");
router.get("/",function(req,res){
	var voice_page_data = {};
	var nowPage;
	//需要vociedata
	//需要arrary
	//需要page

	nowPage = req.query.page ? req.query.page : 1;
	
	voice_page_data.arrary = [nowPage];
	voice_page_data.page = nowPage;

	dbUtils.getVoiceByPage(12, nowPage, function(voice) {
		console.log(voice.img_url);
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
})
module.exports = router