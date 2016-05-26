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
			//alert(JSON.stringify(response));
			alert(response.albums.items[0].uri);
//			for (var n = 0; n < numOfResults; n++){
//				var uri = "https://embed.spotify.com/?uri="+response.tracks.items[n].uri;					
//				$("h2").append('<iframe frameborder="0" allowTransparency="true" scrolling="no" width="250" height="80" src='+uri+'></iframe>');				
//			}
		}
	});
}