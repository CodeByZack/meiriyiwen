$("document").ready(function(){
	//audio的播放处理
	var audio = $(".player_custom audio")[0];
	//var timer ;
	var seekbar = $(".seekbar_jd");
	var currentTime = $(".player_custom .current_time");
	
	audio.oncanplay = function() {
		currentTime.text(getTimeText(0));
	};
	
	audio.onended = function() {
		$(".player_custom img").attr("src", "img/play.png");
		seekbar.css("width", 0 + "%");
		currentTime.text(getTimeText(0));
	}
	
	audio.ontimeupdate = function() {
		var jd = parseFloat(audio.currentTime * 100 / audio.duration);
		seekbar.css("width", jd.toFixed(2) + "%");
		currentTime.text(getTimeText(audio.currentTime));
	}
	$(".player_custom img").click(function() {
		if(audio.paused) {
			$(this).attr("src", "img/pause.png");
			audio.play();
	
		} else {
			$(this).attr("src", "img/play.png");
			audio.pause();
		}
	});
});

function getTimeText(duration){
	var resText;
	if(duration){
		duration = parseInt(duration);
		var min = parseInt(duration/60);
		if(min<10){
			min = "0"+min;
		}else{
			min = min+"";
		}
		var sec = parseInt(duration%60);
		if(sec<10){
			sec = "0"+sec;
		}else{
			sec = sec+"";
		}
		resText = min+":"+sec;
	}else{
		resText = "00:00";
	}
	return resText;
	
}
