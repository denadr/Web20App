/**
 * type - tracks or users (if needed)
 * searchQuery - name of album, artist or track,
 * numOfResults - number of results,
 * 
 * Results: uris
 */
function soundcloudSearch(type,searchQuery,numOfResults, callback){
	
	SC.initialize({
		client_id: 'c202b469a633a7a5b15c9e10b5272b78'
	});
	
	SC.get('/'+type, {q: searchQuery}).then(function(tracks) {	
		var result = [];
		
		var uri="";
		for (var i=0; i<numOfResults ; i++){
			uri = "//w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/"+tracks[i].id+"&amp;auto_play=false&amp;hide_related=false&amp;show_comments=true&amp;show_user=true&amp;show_reposts=false&amp;visual=true";
//			$("h4").append('<iframe frameborder="0" allowTransparency="true" scrolling="no" width="250" height="80" src='+uri+'></iframe>')
			result[i]=uri;
		}
		callback(result);
	});
}