function search_button_click()
{
	// Collect parameters from UI
	var query = $("#searchQuery").val();
	var maxResults = 10;
	
	// TODO: Call API functionality with data and update UI
	//alert("Search for " + query);
	deezerSearch('track', query, maxResults, function (result)
	{
		//alert(result);
	});
	soundcloudSearch('tracks', query, maxResults, function (result)
	{
		//alert(result);
	});
	spotifySearch('track', query, maxResults, function (result)
	{
		alert(result);
		for (var n = 0; n < result.length; n++)
		{
			alert('debug1');
			ReactDOM.render(React.createElement(WidgetBox, {uri: result[n]}), document.getElementById("results"));
			alert('debug3');
		}
	});
}