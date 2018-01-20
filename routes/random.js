
const express = require('express')
const router = express.Router()
//var dbUtils = require("../db/dbUtils.js");
router.get("/",function(req,res){
	dbUtils.getArticleCountsByConditions({}, function(count) {
		var index = RandomNum(0, count);
		dbUtils.getArticleByConditions({order: index}, function(article) {
			if(is_mobile(req)){
				res.render("m/mindex",article);
			}else{
				res.render("index",article);
			}
			
		});
	});
})
module.exports = router