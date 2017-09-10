$("document").ready(function(){

	$(".header li").removeClass("current").eq(0).addClass("current");
	
	var randomNum = Math.floor(Math.random()*99);
	var bgUrl = "url(/upload_imgs/"+randomNum+"_bk.jpg)"
	$("body").css("background-image",bgUrl);
	$(".container .button").click(function(){
		window.location = "/random";
	});
});
