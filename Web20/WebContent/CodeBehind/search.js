var loggedIn = false;
var userId = null;
var userName = null;
var playlists = null;

$(document).ready(function ()
{
	userId = localStorage.getItem('ID');
	if (userId != null)
	{
		loggedIn = true;
		userName = localStorage.getItem('username');
		console.log('Logged in: ' + userName + ' (' + userId + ')');
		
		$.getScript('/Web20/Scripts/Database/database.js', function()
		{
			getPlaylistsFlat(userId, function(lists)
			{
				playlists = lists;
				console.log('Playlists: ' + JSON.stringify(playlists));
			});
		});
	}
	else console.log('Not logged in.');
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
		if (loggedIn)
		{
			addTitle(playlist.id, '', this.props.uri);
		}
		else
		{
			alert('Please login.');
		}
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
		
		return(
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
		return(
			<div>
				<iframe frameBorder="0" allowTransparency="true" scrolling="no" width="250" height="80" src={this.props.uri}></iframe>
				<AddMenu uri={this.props.uri} options={playlists} ></AddMenu>
			</div>
		);
	}
});

var WidgetContainer = React.createClass(
{
	render : function ()
	{
		return(
			<div>
				{this.props.uris.map(function(uri)
				{
					return <WidgetFrame uri={uri} ></WidgetFrame>;
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
		ReactDOM.render(<WidgetContainer uris={result} ></WidgetContainer>, document.getElementById('deezer_results'));
	});
	soundcloudSearch('tracks', query, maxResults, function (result)
	{
		ReactDOM.render(<WidgetContainer uris={result} ></WidgetContainer>, document.getElementById('soundcloud_results'));
	});
	spotifySearch('track', query, maxResults, function (result)
	{
		ReactDOM.render(<WidgetContainer uris={result} ></WidgetContainer>, document.getElementById('spotify_results'));
	});
}
document.getElementById('search_button').addEventListener('click', search_button_click);