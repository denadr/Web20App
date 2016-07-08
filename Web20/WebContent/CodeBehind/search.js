var loggedIn = false;
var userId = null;
var userName = null;
var playlists = null;

window.onload = function ()
{
	userId = localStorage.getItem('ID');
	if (userId != null)
	{
		loggedIn = true;
		userName = localStorage.getItem('username');
		alert('User : ' + userName);
//		getPlaylists(userId, function (dbData)
//		{
//			playlists = dbData;
//			alert(JSON.stringify(playlists));
//		});
	}
	else alert('userId : ' + userId);
}

var HelloWorld = React.createClass(
{
    render : function () 
    {
    	return(<h1>Hello, {this.props.name}!</h1>);
    }
});

var WidgetFrame = React.createClass(
{
	getInitialState : function ()
	{
		return { clicked : false };
	},
	
	dropDown : function ()
	{
		this.setState({ clicked : !this.state.clicked });
	},
	
	render : function ()
	{		
		var mainCss = 
		{
			float : 'right',
	    	position : 'relative',
	    	display : 'inline-block'
		};
		
		var buttonCss =
		{
			backgroundColor : '#4CAF50',
	    	color : 'white',
	    	padding : 16,
	    	fontSize : 16,
			border : 'none',
	    	cursor : 'pointer'
		};
		
		var contentCss =
		{
			display : this.state.clicked ? 'block' : 'none',
	    	position : 'absolute',
	    	backgroundColor : '#f9f9f9',
	    	minWidth : 160,
	    	overflow : 'auto',
	    	boxShadow : '0px 8px 16px 0px rgba(0,0,0,0.2)',
	    	right : 0
		};
		
		var optionCss =
		{
			color : 'black',
	    	padding : '12px 16px',
	    	textDecoration : 'none',
	    	display : 'block'
		};
		
		return(
				<div>
					<iframe frameborder="0" allowTransparency="true" scrolling="no" width="250" height="80" src={this.props.uri}></iframe>
					<div style={mainCss}>
						<button style={buttonCss} onClick={this.dropDown}>Dropdown</button>
						<div style={contentCss}>
		    				<a style={optionCss} href="#home">Home</a>
		    				<a style={optionCss} href="#help">Help</a>
		    			</div>
		    		</div>
				</div>
			);
	}
});

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
		ReactDOM.render(<WidgetFrame uri={result[0]} /> , document.getElementById('soundcloud_results'));
	});
	spotifySearch('track', query, maxResults, function (result)
	{
		ReactDOM.render(<WidgetFrame uri={result[0]} /> , document.getElementById('spotify_results'));
	});
}

document.getElementById('search_button').addEventListener('click', search_button_click);