var mongo = require('./mongodb.js'),Schema = mongo.mongoose.Schema;

var ArticleSchema = new Schema({  
	order:  {type:Number},
    title : { type: String },                    
    author: {type: String},                      
    content: {type: String},                     
});

var VoiceSchema = new Schema({  
	img_src:  {type:String},
    title : { type: String },                    
    author: {type: String},                      
    voice_num: {type: String}, 
    voice_url: {type: String}, 
});

module.exports = {
    article : mongo.mongoose.model('Article',ArticleSchema),
    voice   : mongo.mongoose.model('Voice2',VoiceSchema)
}