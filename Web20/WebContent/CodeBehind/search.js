var loggedIn = false;
var userId = null;
var userName = null;
var playlists = null;

$(document).ready(function ()
{
	$.getScript('/Web20/Scripts/Database/database.js', function()
			{
				getPlaylists(18, function(lists)
				{
					playlists = lists;
					console.log(JSON.stringify(lists));
				});
			});
	userId = localStorage.getItem('ID');
	if (userId != null)
	{
		loggedIn = true;
		console.log('UserID : ' + userId);
		userName = localStorage.getItem('username');
		console.log('Username : ' + userName);
		$.getScript('/Web20/Scripts/Database/database.js', function()
		{
			getPlaylists(userId, function(lists)
			{
				playlists = lists;
				console.log(JSON.stringify(playlists));
			});
		});
	}
	else console.log('userId : ' + userId);
});

var AddMenu = React.createClass(
{
	getInitialState : function ()
	{
		return { opened : false };
	},
	
	dropDown : function ()
	{
		this.setState( { opened : !this.state.opened } );
	},

	addSong : function (playlist)
	{
		addTitle(playlist.id, '', this.props.uri);
		
		this.setState( { opened : false } );
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
			display : this.state.opened ? 'block' : 'none',
	    	position : 'absolute',
	    	backgroundColor : '#F9F9F9',
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
		
		return (
			<div style={mainCss}>
				<button style={buttonCss} onClick={this.dropDown}>Add</button>
				<div style={contentCss}>
					{this.props.options.map(function(option)
					{
						return <a style={optionCss} onClick={this.addSong.bind(this, option)}>{option.name}</a>;
					}, this)}
	   			</div>
	   		</div>	
		);
	}
});

var WidgetFrame = React.createClass(
{
	render : function ()
	{		
		return (
			<div>
				<iframe frameBorder="0" allowTransparency="true" scrolling="no" width="250" height="80" src={this.props.uri}></iframe>
				<AddMenu uri={this.props.uri} options={playlists} />
			</div>
		);
	}
});

var WidgetContainer = React.createClass(
{
	render : function ()
	{
		return (
			<div>
				{this.props.uris.map(function(uri)
				{
					return <WidgetFrame uri={uri} />;
				}, this)}
			</div>
		);
	}
});

var search_button_click = function ()
{
	var query = $('#searchQuery').val();
	var maxResults = 3;
	
	deezerSearch('track', query, maxResults, function (result)
	{
		ReactDOM.render(<WidgetContainer uris={result} /> , document.getElementById('deezer_results'));
	});
	soundcloudSearch('tracks', query, maxResults, function (result)
	{
		ReactDOM.render(<WidgetContainer uris={result} /> , document.getElementById('soundcloud_results'));
	});
	spotifySearch('track', query, maxResults, function (result)
	{
		ReactDOM.render(<WidgetContainer uris={result} /> , document.getElementById('spotify_results'));
	});
}
document.getElementById('search_button').addEventListener('click', search_button_click);