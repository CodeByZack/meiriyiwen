var express = require('express');
var app = express();
app.use(express.static('public'));
var data = {
	title:"他们那时多有趣",
	author:"艾萨克.阿西莫夫",
	content:" <p>2155年5月17日晚上，麦琪记下了自己的日记：“今天，托米发现一本真正的书。”</p><p>这是一本很旧的书。麦琪的爷爷以前告诉她，当他还是一个小孩子的时候，他的爷爷对他讲，曾经有一个时候，所有的故事都是印在纸上的。</p><p>麦琪和托米翻着这本书，书页已经发黄，皱皱巴巴的。</p><p>他们读到的字全都静止不动，不像通常他们在屏幕上看到的那些“书”一样，会按顺序移动。这可真有趣，读到后面时再翻回来，刚才读过的字居然还停留在原地。</p><p>“多浪费呀。”托米说，“这种书一读完就得扔掉。而我们的屏幕大概已经给我们看过一百万本书了，而且它还会给我们看许多书，我可不会把它扔掉。”托米比11岁的麦琪大两岁，因此读的书也比她要多。</p><p>“你是在哪儿找到这本书的？”麦琪问托米。</p><p>“在我们家的顶楼上。”托米边全神贯注地看书边向上指了一下。</p>"
}
app.engine('.html', require('ejs').renderFile);
app.set("view engine","html");

app.get('/', function (req, res) {
  res.render("index" ,data);
});





var server = app.listen(3000, function () {
  var host = server.address().address;
  var port = server.address().port;
	
  console.log('Example app listening at http://%s:%s', host, port);
});