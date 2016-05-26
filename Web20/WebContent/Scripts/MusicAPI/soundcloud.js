/**
 * type - tracks or users (if needed)
 * searchQuery - name of album, artist or track,
 * numOfResults - number of results,
 * 
 * Results: -> iframes at "h4"
 */
function soundcloudSearch(type,searchQuery,numOfResults){
	
	SC.initialize({
		client_id: 'c202b469a633a7a5b15c9e10b5272b78'
	});
	
	SC.get('/'+type, {q: searchQuery}).then(function(tracks) {	
		alert(tracks[0].id);
		for (var i=0; i<numOfResults ; i++){
			
			var uri = "//w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/"+tracks[i].id+"&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true";
			$("h4").append('<iframe frameborder="0" allowTransparency="true" scrolling="no" width="250" height="80" src='+uri+'></iframe>')

		}
	});
}