###背景图片api

	来源:每日一文

	api地址:https://meiriyiwen.com/images/new_feed/bg_97.jpg

	数据范围: bg_1 - bg_98 有效

###问题1:ul设置padding margin为0时  li上面有一点间隔。

	原因：第一个li设置了不一样的font-size.
	解决办法：待解决，暂时取消font-size。


###问题2：vocie界面的 img_cover 层鼠标移入移出闪烁的问题。

	原因：
	为同级兄弟元素img绑定的mouseover，mouseout属性，当mouseover触发show函数，img_cover层出现并覆盖		了img元素，触发该img的mouseout事件，调用hide函数，又把img_cover层隐藏。再次触发mouseover。

	img(show) img_cover(hide)同级，

	鼠标移动到img上-->img.mousover()-->img_cover.show()-->img.mouseout()-->img_cover.hide(）-->img.mouseover()...

	解决：
	img绑定mouseover事件-->img_cover.show();
	img_cover绑定mouseout事件-->img_cover.hide();
	
###简单算法问题 给定一个数字 num ,求出num之前依次递减的4个数字，之后一次增加的4个数字。

	var num;
	var arrary =[num];
	for(var i=0;i<4;i++){
		if(num-i>0){
			arrary.shift(num-i);
		}
		arrary.push(num+i);
	}
