$("document").ready(function(){
	
	
	//header的处理，待抽取为公共部分
	$(".header li").mouseover(function(){
		$(this).addClass("current");
	}).mouseout(function(){
		$(this).removeClass("current");
		$(".header li").eq(1).addClass("current");
	});
	
	$(".voice_item").each(function(){
	    $(this).mouseenter(function(){
	        $(this).find(".img_cover").show();
	    });
	    $(this).mouseleave(function(){
	        $(this).find(".img_cover").hide();
	    });
	});
});
