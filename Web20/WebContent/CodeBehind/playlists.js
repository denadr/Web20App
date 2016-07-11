var loggedIn = false;
var userId = null;
var userName = null;
var playlists = [];

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
			getPlaylistsDeep(userId, function(lists)
			{
				console.log('Playlists: ' + JSON.stringify(lists));
				
				//ReactDOM.render(< /> , document.getElementById('playlist_view'));
			});
		});
	}
	else console.log('Not logged in.');
});

var MasterList = React.createClass(
{
	render : function ()
	{
		
	}
});

var DetailList = React.createClass(
{
	render : function ()
	{
		
	}
});