
# 说明

* 新手入门学习的项目，最原始，最简单的方式开发，代码没有参考价值。仅作为自己学习的记录。
* 抱着学习的目的，模仿[每日一文](https://meiriyiwen.com/)。
* 所使用的文章，声音等资源均为每日一文网站所有。
* 要运行该项目，请确保你本地开启mongdb数据库，且数据库有对应的数据。
* [在线预览](http://i18377040t.iask.in)。注：服务器搭建在自己电脑上，采用花生壳内网映射到外网，不能保证每次都能点开哈。后面会自己购买服务器。

# 所用到的技术栈

mongdb + mongoose + express + cheerio + ejs

# 开发过程简要说明

主页面（即文章页面），声音列表页面，声音播放页面。

三个页面都有公共的头部，尾部。使用模板抽出该部分，在每个页面中包含进来，减少重复代码。

### 主页面

主页面，就展示一篇文章，主要是css样式的调整。  

### 声音列表页面

声音列表页面，中心区为定宽居中，每一个voice_item的宽度都是计算好的，一行刚好能放下三个。

每个item添加鼠标移过的遮罩层动画效果，这里是踩过坑的。

底部分页按钮的实现，还是很简单的，主要是根据服务端返回的数据进行渲染就ok，因为这里是直接采用的网页跳转的形式，没有用到ajax。

### 声音播放页面

声音播放页面，就一个播放器。audio标签样式太丑了。自己重写样式，用audio的相关api实现，播放，暂停，进度更新功能。

但由于没找到定位进度的api，并没有实现点击进度条定位进度的功能。这个功能肯定是有的，后期补上。                                 


# 项目截图

## 主页面
<img src='https://github.com/CodeByZack/meiriyiwen/blob/master/public/img/main.png' width="800" height="400" />

## 声音列表页面
<img src='https://github.com/CodeByZack/meiriyiwen/blob/master/public/img/voicelist.png' width="800" height="400" />

## 声音播放页面
<img src='https://github.com/CodeByZack/meiriyiwen/blob/master/public/img/voiceplay.png' width="800" height="400" />



# 移动端界面适配

出乎意料的简单，可能是因为页面的内容单一简单，并不需要做太多的改动，基本套用pc界面的结构.

这里只说下怎么实现的pc和移动端的处理的。没有采用响应式布局。

通过User-Agent来判断是移动端还是PC端，分别返回对应的的模板，数据没有变动。如下

	if(is_mobile(req)){
		res.render("m/mindex",article);
	}else{
		res.render("index",article);
	}

~~这样做肯定是有坑的，原凉我是个新手。现在server.js代码也比较乱，需要整理下。~~
这样做肯定是有坑的，原凉我是个新手。server.js已整理。

## 移动端界面截图

### 主页面
<img src='https://github.com/CodeByZack/meiriyiwen/blob/master/public/img/marticle.png' width="418" height="736" />

### 声音列表页面
<img src='https://github.com/CodeByZack/meiriyiwen/blob/master/public/img/mlist.png' width="418" height="736" />

### 声音播放页面
<img src='https://github.com/CodeByZack/meiriyiwen/blob/master/public/img/mplay.png' width="418" height="736" />


# Todo

* 后台管理，可以增删改查数据（自己给自己挖了坑，数据库的结构可能要重新设计下）。
* 响应式布局
* webapp
* 安卓原生开发
