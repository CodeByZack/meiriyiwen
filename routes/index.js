
const express = require('express')
const router = express.Router()
//var dbUtils = require("../db/dbUtils.js");
router.get("/",function(req,res){
    dbUtils.getArticleCountsByConditions({}, function(count) {
		
        dbUtils.getArticleByConditions({
            order: count - 1
        }, function(article) {
            if(is_mobile(req)){
                res.render("m/mindex",article);
            }else{
                console.log(article)
                res.render("index", article);
            }
        });
    });    
})
module.exports = router