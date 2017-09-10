
# 说明

* 新手入门学习的项目，最原始，最简单的方式开发，代码没有参考价值。仅作为自己学习的记录。
* 抱着学习的目的，模仿[每日一文](https://meiriyiwen.com/)。
* 所使用的文章，声音等资源均为每日一文网站所有。
* 要运行该项目，请确保你本地开启mongdb数据库，且数据库有对应的数据。

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
