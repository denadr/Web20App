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



//ReactDOM.render(< /> , document.getElementById('playlist_view'));