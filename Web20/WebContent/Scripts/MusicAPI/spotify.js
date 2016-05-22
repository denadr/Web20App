function searchSpotify()
{
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
			var html = "<table>";
			for (var n = 0; n < response.tracks.items.length; n++)
			{
				html += "<tr><td><iframe src=\"https://embed.spotify.com/?uri=" 
						+ response.tracks.items[n].uri + 
						"\" frameborder=\"0\"></iframe></td></tr>";
			}
			html += "</table>"
			
			$("#results").html(html);
		}
	});
}