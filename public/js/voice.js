$("document").ready(function(){
	
	$(".header li").removeClass("current").eq(1).addClass("current");
	$(".voice_item").each(function(){
	    $(this).mouseenter(function(){
	        $(this).find(".img_cover").show();
	    });
	    $(this).mouseleave(function(){
	        $(this).find(".img_cover").hide();
	    });
	});
});
