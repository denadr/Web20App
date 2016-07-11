var loggedIn = false;
var userId = null;
var userName = null;

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
				for (var n = 0; n < lists.length; n++)
				{
					console.log(lists[n].name + ' (' + lists[n].id + '): ' + JSON.stringify(lists[n].titles));
				}
				
				ReactDOM.render(<MasterDetailView playlists={lists} /> , document.getElementById('playlist_view'));
			});
		});
	}
	else console.log('Not logged in.');
});

var MasterDetailView = React.createClass(
{
	render : function ()
	{
		return <a>{JSON.stringify(this.props.playlists)}</a>;
	}
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