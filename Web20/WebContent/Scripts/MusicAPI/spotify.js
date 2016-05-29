/**
 * type - album, artist or track,
 * searchQuery - name of album, artist or track,
 * numOfResults - number of results,
 * 
 * Results: uris
 */
function spotifySearch(type,searchQuery,numOfResults){
	var result = "";
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
				var uri="";
				switch (type){
					case "track":
						uri = "https://embed.spotify.com/?uri="+response.tracks.items[n].uri;
						break;
					case "album":
						uri = "https://embed.spotify.com/?uri="+response.albums.items[n].uri;
						break;
					case "artist":
						uri = "https://embed.spotify.com/?uri="+response.artists.items[n].uri;
						break;
				}
				result+=uri+"\t"
//				$("h2").append('<iframe frameborder="0" allowTransparency="true" scrolling="no" width="250" height="80" src='+uri+'></iframe>');				
			}
		}
	});
	return result;
}