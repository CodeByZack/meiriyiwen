/**
 * 用户信息
 */
var mongoose = require('./mongodb.js'),
    Schema = mongoose.Schema;
var ArticleSchema = new Schema({  
	order:  {type:Number},
    title : { type: String },                    
    author: {type: String},                      
    content: {type: String},                     
});
module.exports = mongoose.model('Article',ArticleSchema);