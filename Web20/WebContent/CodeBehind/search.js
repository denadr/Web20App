var HelloWorld = React.createClass(
{
    render : function () 
    {
    	return(<h1>Hello, world!</h1>);
    }
});

var search_button_click = function ()
{
	ReactDOM.render(<HelloWorld/>, document.getElementById('results'));
	// Collect parameters from UI
	var query = $('#searchQuery').val();
	var maxResults = 10;
	alert('search_button_click: ' + query);

	// TODO: Call API functionality with data and update UI
	deezerSearch('track', query, maxResults, function (result)
	{
		alert(result);
	});
	soundcloudSearch('tracks', query, maxResults, function (result)
	{
		alert(result);
	});
	spotifySearch('track', query, maxResults, function (result)
	{
		alert(result);
//		for (var n = 0; n < result.length; n++)
//		{
//			alert('debug1');
//			ReactDOM.render(React.createElement(WidgetBox, {uri: result[n]}), document.getElementById("results"));
//			alert('debug3');
//		}
	});
}

document.getElementById('search_button').addEventListener('click', search_button_click);