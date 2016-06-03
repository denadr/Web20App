
/**
 * type - album, artist or track,
 * searchQuery - name of album, artist or track,
 * numOfResults - number of results,
 * 
 * Results: uris
 */
function deezerSearch(type,searchQuery,numOfResults, callback){

	DZ.init({
		appId  : '180042',
		channelUrl : 'http://localhost:8080/DynamicTest/deezer.html',
	});
	
	DZ.api('/search?q='+type+':'+searchQuery, function(json){
		var result = "";
		var uri="";
		for (var i=0; i<numOfResults ; i++){
			uri = "http://www.deezer.com/plugins/player?autoplay=false&playlist=false&width=700&height=80&cover=true&type=tracks&id="+json.data[i].id+"&title=&app_id=undefined";					
//			$("h3").append('<iframe frameborder="0" allowTransparency="true" scrolling="no" width="250" height="80" src='+uri+'></iframe>')
			result+=uri+"\t";
		}
		callback(result);
	});
}
