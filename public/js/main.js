$("document").ready(function(){
	$(".header li").mouseover(function(){
		$(this).addClass("current");
	}).mouseout(function(){
		$(this).removeClass("current");
		$(".header li").eq(0).addClass("current");
	});
	var randomNum = Math.floor(Math.random()*100);
	var bgUrl = "url(https://meiriyiwen.com/images/new_feed/bg_"+randomNum+".jpg)"
	$("body").css("background-image",bgUrl);
	$(".container .button").click(function(){
		window.location = "/random";
	});
});
