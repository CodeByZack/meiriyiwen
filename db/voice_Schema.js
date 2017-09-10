				//voice_item_list.desc.push({	
				//	img_src: "/upload_imgs/450_img_250.jpg",
				//	title: "老白干",
				//	author: "作者：寒秋 主播：陈易",
				//	voice_num: "448期",
				//	voice_url:"/voice/448.mp3"
				//});
var mongoose = require('./mongodb.js'),
    Schema = mongoose.Schema;
var VoiceSchema = new Schema({  
	img_src:  {type:String},
    title : { type: String },                    
    author: {type: String},                      
    voice_num: {type: String}, 
    voice_url: {type: String}, 
});
module.exports = mongoose.model('Voice2',VoiceSchema);