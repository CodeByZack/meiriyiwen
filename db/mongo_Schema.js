var mongo = require('./mongodb.js'),Schema = mongo.mongoose.Schema;

var ArticleSchema = new Schema({ 
    title : { type: String },                    
    author: {type: String},                      
    content: {type: String},                     
},{timestamps: {createdAt: 'created', updatedAt: 'updated'}});

var VoiceSchema = new Schema({  
	img_url:  {type:String},
    title : { type: String },                    
    author: {type: String},                      
    voice_num: {type: String}, 
    voice_url: {type: String}, 
},{timestamps: {createdAt: 'created', updatedAt: 'updated'}});

var ArticleImgUrl = new Schema({
    id  : {type : Number},
    url : {type : String}
},{timestamps: {createdAt: 'created', updatedAt: 'updated'}});

module.exports = {
    article : mongo.mongoose.model('Article',ArticleSchema),
    voice   : mongo.mongoose.model('Voice2',VoiceSchema),
    articleImgPath   : mongo.mongoose.model('ArticleImgPath',ArticleImgUrl),
}