$("document").ready(function(){
	
	
	//header的处理，待抽取为公共部分
	$(".header li").mouseover(function(){
		$(this).addClass("current");
	}).mouseout(function(){
		$(this).removeClass("current");
		$(".header li").eq(0).addClass("current");
	});
	
	$(".container .voice_list img").mouseover(function(){
		//$(this).siblings(".img_cover").show();
		$(this).siblings(".img_cover").css("display","block");
		$(this).siblings(".img_cover").css("cursor","pointer");
		console.log("mouseover");
	});
	
	$(".container .voice_list .img_cover").mouseout(function(){
		//$(this).hide();
		$(this).css("display","none");
		console.log("mouseout");
	});
});
