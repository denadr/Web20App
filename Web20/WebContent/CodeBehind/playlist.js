$(document).ready(function ()
{
	var userId = localStorage.getItem('ID');
	if (userId != null && userId != 'null')
	{
		var userName = localStorage.getItem('username');
		console.log('Logged in: ' + userName + ' (' + userId + ')');
		
		$('#menu_button').val(userName);
		$('#menu_flyout').html('<li><a href="playlists.html">Playlists</a></li>' +
							   '<li><a href="account.jsp">Account</a></li>' +
							   '<li><a href="search.html" id="signout_button">Sign out</a></li>');
		document.getElementById('signout_button').addEventListener('click', function()
		{
			localStorage.setItem('ID', null);
			localStorage.setItem('username', null);
		});
	}
	else
	{
		console.log('Not logged in.');
		
		$('#menu_flyout').html('<li><a href="login.jsp">Sign in</a></li>' +
    						   '<li><a href="register.jsp">Sign up</a></li>');
	}

	var playlistId = window.location.search.split('=')[1]; // .../playlist.html?id=XXX
	console.log('Loading playlist with ID: ' + playlistId);
	$.getScript('/Web20/Scripts/Database/database.js', function()
	{
		getPlaylist(playlistId, function(list)
		{
			console.log(list.name + ': ' + JSON.stringify(list.titles));
			
			ReactDOM.render(<PlaylistView playlist={list} ></PlaylistView>, document.getElementById('playlist_view'));
		});
	});
});

var PlaylistView = React.createClass(
{
	render : function ()
	{
		var listCss =
		{
			listStyleType : 'none'
		};
		
		return(
			<div>
				<h1>{this.props.playlist.name}</h1>
				<ul style={listCss}>
					{this.props.playlist.titles.map(function(title)
						{
							return(
								<li key={title.id}>
									<iframe frameBorder="0" allowTransparency="true" scrolling="no" width="250" height="80" src={title.url}></iframe>
								</li>
							);
						}, this)
					}
				</ul>
			</div>
		);
	}
});