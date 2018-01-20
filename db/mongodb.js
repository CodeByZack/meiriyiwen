var mongoose = require('mongoose');

/**
 * 连接成功
 */
mongoose.connection.on('connected', function () {    
    console.log('Mongoose connection success !!!!!' );  
});    

/**
 * 连接异常
 */
mongoose.connection.on('error',function (err) {    
    console.log('Mongoose connection error: ' + err);  
});    

/**
 * 连接断开
 */
mongoose.connection.on('disconnected', function () {    
    console.log('Mongoose connection disconnected');  
});

let mongo = {
    connect : function(path){
        mongoose.connect(path,{useMongoClient:true});
    },
    mongoose:mongoose
};

module.exports = mongo;