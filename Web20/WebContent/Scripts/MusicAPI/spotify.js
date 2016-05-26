/**
 * type - album, artist or track,
 * searchQuery - name of album, artist or track,
 * numOfResults - number of results,
 * 
 * Results: -> iframes at "h2"
 */
function spotifySearch(type,searchQuery,numOfResults){
	$.ajax(
	{
		url : "https://api.spotify.com/v1/search",
		data :
		{
			q : searchQuery,
			type : type
		},
		success : function(response)
		{
			for (var n = 0; n < numOfResults; n++){
				switch (type){
					case "track":
						var uri = "https://embed.spotify.com/?uri="+response.tracks.items[n].uri;
						break;
					case "album":
						var uri = "https://embed.spotify.com/?uri="+response.albums.items[n].uri;
						break;
					case "artist":
						var uri = "https://embed.spotify.com/?uri="+response.artists.items[n].uri;
						break;
				}
				$("h2").append('<iframe frameborder="0" allowTransparency="true" scrolling="no" width="250" height="80" src='+uri+'></iframe>');				
			}
		}
	});
}