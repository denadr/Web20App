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

var HelloWorld = React.createClass(
{
    render : function () 
    {
    	return(<h1>Hello, world!</h1>);
    }
});

//var AddItem = React.createClass(
//{
//	add : function ()
//	{
//		
//	},
//	
//	render : function ()
//	{
//		var optionCss =
//		{
//			color : 'black',
//	    	padding : '12px 16px',
//	    	textDecoration : 'none',
//	    	display : 'block'
//		};
//		
//		return (
//				<a style={optionCss} href="#home">{this.props.playlistName}</a>
//			);
//	}
//});

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
	
	addSong : function (playlistId, uri)
	{
		console.log('addSong : ' + uri + ', ' + playlistId);
		//addTitle(playlistId, '', this.props.uri);
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
				<div>
					{this.props.uris.map(function(uri)
					{
						return (
							<div>
								<iframe frameBorder="0" allowTransparency="true" scrolling="no" width="250" height="80" src={uri}></iframe>
								<div style={mainCss}>
									<button style={buttonCss} onClick={this.dropDown}>Add</button>
									<div style={contentCss}>
										{this.props.lists.map(function(playlist)
										{
											return (
													<a style={optionCss} onClick={this.addSong.bind(this, playlist.id, uri)}>{playlist.name}</a>
												);
										}, this)}
					    			</div>
					    		</div>
					    	</div>
							);
					}, this)}
				</div>
			);
	}
});

var WidgetContainer = React.createClass(
{
	render : function ()
	{
		return
		(
			<p>{this.props.uris[0]}</p>
		);
	}
});

var search_button_click = function ()
{
	var query = $('#searchQuery').val();
	var maxResults = 10;
	
	deezerSearch('track', query, maxResults, function (result)
	{
		ReactDOM.render(<WidgetFrame uris={result} lists={playlists} /> , document.getElementById('deezer_results'));
	});
	soundcloudSearch('tracks', query, maxResults, function (result)
	{
		ReactDOM.render(<WidgetFrame uris={result} lists={playlists} /> , document.getElementById('soundcloud_results'));
	});
	spotifySearch('track', query, maxResults, function (result)
	{
		ReactDOM.render(<WidgetFrame uris={result} lists={playlists} /> , document.getElementById('spotify_results'));
	});
}

document.getElementById('search_button').addEventListener('click', search_button_click);