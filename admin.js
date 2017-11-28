var express = require('express');
var dbUtils = require("./db/dbUtils.js");
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var  session = require('express-session');


var app = express();

app.engine('.html', require('ejs').renderFile);
app.set("view engine","html");

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static('public'));


app.use(session({
  secret: 'secret', //为了安全性的考虑设置secret属性
  cookie: {maxAge: 60 * 1000 * 30}, //设置过期时间
  resave: true, // 即使 session 没有被修改，也保存 session 值，默认为 true
  saveUninitialized: false, //
}));

app.get('/', function (req, res) {
  console.log(req.session.name);
  if (req.session.sign) {//检查用户是否已经登录，如果已登录展现的页面
    res.render('admin.html');
  } else {//否则展示index页面
    res.render('login.html');
  }
});


function checkUsr(usr,password){
  return true;
}

//登录表单处理
app.get("/login",function(req, res){
  res.render('login.html');
}).post('/login', function (req, res) {
  console.log(req.body);
  if(!req.body.username || !req.body.password){
    res.send("输入不能为空！");
    return;
  }
  if(!checkUsr(req.body.username,req.body.password)){
    res.send('用户名或密码错误');
  } else {
    req.session.sign = true;
    req.session.name = "zack";
    res.send('200');
  }
});


app.get('/out', function(req, res){
  req.session.destroy();
  res.redirect('/');
});




app.post("/article/add",function(req,res){
  if(req.session.sign){
    //addArticle();
    res.send({code:0,msg:""});    
  }else{
    res.send({code:-1,msg:"登录过期！"});
  }

});
app.post("/article/del",function(req,res){
  if(req.session.sign){
    //delArticle();
    res.send({code:0,msg:""});    
  }else{
    res.send({code:-1,msg:"登录过期！"});
  }
});
app.post("/article/modify",function(req,res){
  if(req.session.sign){
    modifyArticle();
    //res.send({code:0,msg:""});    
  }else{
    res.send({code:-1,msg:"登录过期！"});
  }
});
app.post("/article/list",function(req,res){
  var page = req.body.page;
  if(req.session.sign){
    listArticle(res,page);
    //res.send({code:0,msg:""});    
  }else{
    res.send({code:-1,msg:"登录过期！"});
  }
});

function listArticle(res,page){
  dbUtils.getArticleByPage(10,page,function(articleList){
    res.send(articleList);
  });
}
function delArticle(res,){
  dbUtils.del(str,function(articleList){
    res.send(articleList);
  });
}
app.listen(8080);