var searched = false;
var loggedIn = false;
var playlists = [];

$(document).ready(function ()
{
	var userId = localStorage.getItem('ID');
	if (userId != null && userId != 'null')
	{
		loggedIn = true;
		var userName = localStorage.getItem('username');
		console.log('Logged in: ' + userName + ' (' + userId + ')');
		
		$('#menu_button').val(userName);
		$('#menu_flyout').html('<li><a href="playlists.html">Playlists</a></li>' +
							   '<li><a href="account.html">Account</a></li>' +
							   '<li><a href="search.html" id="signout_button">Sign out</a></li>');
		document.getElementById('signout_button').addEventListener('click', function()
		{
			localStorage.setItem('ID', null);
			localStorage.setItem('username', null);
		});
		
		$.getScript('/Web20/Scripts/Database/database.js', function()
		{
			getPlaylistsFlat(userId, function(lists)
			{
				playlists = lists;
				console.log('Playlists: ' + JSON.stringify(playlists));
			});
		});
	}
	else 
	{
		console.log('Not logged in.');
		
		$('#menu_flyout').html('<li><a href="login.jsp">Sign in</a></li>' +
    						   '<li><a href="register.jsp">Sign up</a></li>');
	}
});

var AddMenu = React.createClass(
{
	getInitialState : function ()
	{
		return { opened : false };
	},
	
	dropDown : function ()
	{
		if (loggedIn)
		{
			this.setState( { opened : !this.state.opened } );
		}
		else
		{
			alert('Please sign in.');
		}
	},

	addSong : function (playlist)
	{
		addTitle(playlist.id, '', this.props.uri, function(response)
		{
			console.log('addSong: ' + response.message);
		});
		
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
	
	if (!searched)
	{
		searched = true;
		
		
	}
}
document.getElementById('search_button').addEventListener('click', search_button_click);