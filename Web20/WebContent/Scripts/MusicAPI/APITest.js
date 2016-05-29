/**
 * 
 */
function search(){
	
	//remove existing iframes
	var iframes = document.querySelectorAll('iframe');
	for (var i = 0; i < iframes.length; i++) {
	    iframes[i].parentNode.removeChild(iframes[i]);
	}
	
	//spotify
	$.ajax(
		{
			url : "https://api.spotify.com/v1/search",
			data :
			{
				q : $("#query").val(),
				type : 'track'
			},
			success : function(response)
			{
				for (var n = 0; n < 10; n++){
					var uri = "https://embed.spotify.com/?uri="+response.tracks.items[n].uri;					
					$("h2").append('<iframe frameborder="0" allowTransparency="true" scrolling="no" width="250" height="80" src='+uri+'></iframe>');
//					$("h2").append('<br>')
				}
			}
	});
	
	
	// deezer
	DZ.init({
		appId  : '180042',
		channelUrl : 'http://localhost:8080/DynamicTest/deezer.html',
	});
	DZ.api('/search?q='+$("#query").val(), function(json){
		for (var i=0; i<10 ; i++){
			var uri = "http://www.deezer.com/plugins/player?autoplay=false&playlist=false&width=700&height=80&cover=true&type=tracks&id="+json.data[i].id+"&title=&app_id=undefined";					
			$("h3").append('<iframe frameborder="0" allowTransparency="true" scrolling="no" width="250" height="80" src='+uri+'></iframe>')
		}

	});
	
	//Soundcloud
	SC.initialize({
		client_id: 'c202b469a633a7a5b15c9e10b5272b78'
	});
	SC.get('/tracks', {q: $("#query").val()}).then(function(tracks) {	
		for (var i=0; i<10 ; i++){
			
			var uri = "//w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/"+tracks[i].id+"&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true";
			$("h4").append('<iframe frameborder="0" allowTransparency="true" scrolling="no" width="250" height="80" src='+uri+'></iframe>')
//			$("h4").append('<iframe allowtransparency="true" scrolling="no" frameborder="no" src="https://w.soundcloud.com/icon/?url=http%3A%2F%2Fsoundcloud.com%2Fuser-513584962&color=orange_white&size=32" style="width: 32px; height: 32px;"></iframe>')
//			$("h4").append('<iframe width="1110" height="120" scrolling="no" frameborder="no" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/'+tracks[i].id+'&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true"></iframe>');

		}
	});

		

	
}