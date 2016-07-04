var HelloWorld = React.createClass(
{
    render : function () 
    {
    	return(<h1>Hello, {this.props.name}!</h1>);
    }
});

var WidgetFrame = React.createClass(
{
	render : function ()
	{
		return(<iframe frameborder="0" allowTransparency="true" scrolling="no" width="250" height="80" src={this.props.uri}></iframe>);
	}
});
//
//var WidgetContainer = React.createClass(
//{
//	render : function ()
//	{
//		return
//		(
//			<p>{this.props.uris[0]}</p>
//		);
//	}
//});

var search_button_click = function ()
{
	var query = $('#searchQuery').val();
	var maxResults = 10;
	
	deezerSearch('track', query, maxResults, function (result)
	{
		ReactDOM.render(<WidgetFrame uri={result[0]} /> , document.getElementById('deezer_results'));
	});
	soundcloudSearch('tracks', query, maxResults, function (result)
	{
		alert(result);
		//ReactDOM.render(<WidgetFrame uri={result[0]} /> , document.getElementById('soundcloud_results'));
	});
	spotifySearch('track', query, maxResults, function (result)
	{
		ReactDOM.render(<WidgetFrame uri={result[0]} /> , document.getElementById('spotify_results'));
	});
}

document.getElementById('search_button').addEventListener('click', search_button_click);