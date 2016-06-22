require.config(
{
	paths: 
	{
        'react': 'Interaction/react',
    }
});

var React = null;
var ReactDOM = null;
require(['/Web20/Interaction/react.js'], function(react)
	{
		alert("REACT:" + react);
		React = react;
	});
require(['/Web20/Interaction/react-dom.js'], function(reactDom)
	{
		alert("REACTDOM:" + reactDom);
		ReactDOM = reactDom;
	});
require(['/Web20/Interaction/myreact.js'], function(myreact)
		{
			alert("MYREACT:" + myreact);
		});

var search_button_click = function ()
{
	// Collect parameters from UI
	var query = $("#searchQuery").val();
	var maxResults = 10;
	
	// TODO: Call API functionality with data and update UI
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