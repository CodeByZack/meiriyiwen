
const express = require('express')
const router = express.Router()
//var dbUtils = require("../db/dbUtils.js");
router.get("/",function(req,res){
    dbUtils.getImgPathCounts(function(imgPath) {
        dbUtils.getArticleByConditions({}, function(article) {
            var temp = article.content;
            temp = temp.replace(/\n/g,'</p><p>');
            temp = '<p>'+temp+'</p>';
            article.content = temp ;
            article.bgurl = imgPath.url;
            if(is_mobile(req)){
                res.render("m/mindex",article);
            }else{
                res.render("index", article);
            }
        });
    });    
})
module.exports = router