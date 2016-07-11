var loggedIn = false;
var userId = null;
var userName = null;
var ids = [];

var listCss =
{
	listStyleType : 'none'
};

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
					ids[n] = lists[n].id;
				}
				
				ReactDOM.render(<MasterDetailView playlists={lists} ></MasterDetailView>, document.getElementById('playlist_view'));
			});
		});
	}
	else console.log('Not logged in.');
});

var getIndexById = function (id)
{
	for (var index = 0; index < ids.length; index++)
	{
		if (ids[index] == id)
		{
			return index;
		}
	}
}

var removePlaylistId = function (playlistId)
{
	var newIds = [];
	for (var n = 0, m = 0; n < ids.length; n++)
	{
		if (ids[n] != playlistId)
		{
			newIds[m++] = ids[n];
		}
	}
	ids = newIds;
}

var MasterDetailView = React.createClass(
{
	getInitialState : function ()
	{
		return { 
			currentPlaylistId : this.props.playlists[0].id,
			changed : false
		};
	},
	
	open : function (playlistId)
	{
		this.setState( 
		{ 
			currentPlaylistId : playlistId,
			changed : this.state.changed
		});
	},
	
	createPlaylist : function ()
	{
		var playlistName = $('#newPlaylistName').val();
		$('#newPlaylistName').val('');
		console.log('createPlaylist(' + playlistName + ')...');
		
		if (playlistName != null && playlistName != '')
		{
			addPlaylist(userId, playlistName, function(playlist, self)
			{
				ids[ids.length] = playlist.id;
						
				self.props.playlists.push(playlist);
				self.setState( 
				{ 
					currentPlaylistId : playlist.id,
					changed : self.state.changed
				});
						
				console.log('createPlaylist: success -> ' + JSON.stringify(playlist));
			}, this);
		}
		else alert('Please enter a name.');
	},

	removePlaylist : function (playlistId)
	{
		var playlistIndex = getIndexById(playlistId);
		removePlaylistId(playlistId);
		
		this.props.playlists.splice(playlistIndex, 1);
		this.setState( 
		{ 
			currentPlaylistId : this.props.playlists[playlistIndex < this.props.playlists.length ? playlistIndex : playlistIndex - 1].id,
			changed : this.state.changed
		});
		
		deletePlaylist(playlistId, function(response)
		{
			console.log('removePlaylist: ' + response.message);
		});
	},
	
	removeTitle : function (playlistId, titleId)
	{
		var playlistIndex = getIndexById(playlistId);
		var titleIndex;
		for (var n = 0; n < this.props.playlists[playlistIndex].titles.length; n++)
		{
			if (this.props.playlists[playlistIndex].titles[n].id == titleId)
			{
				this.props.playlists[playlistIndex].titles.splice(n, 1);
				this.setState( 
				{ 
					currentPlaylistId : this.state.currentPlaylistId,
					changed : !this.state.changed
				});
			}
		}
		
		deleteTitle(playlistId, titleId, function(response)
		{
			console.log('removeTitle: ' + response.message);
		});
	},
	
	render : function ()
	{
		var playlistIndex = getIndexById(this.state.currentPlaylistId);
		
		return(
			<table>
				<tr>
					<td>
						<input type="text" id="newPlaylistName" placeholder="Playlist name..."></input>
						<button onClick={this.createPlaylist}>New</button>
						<ul style={listCss}>
						{this.props.playlists.map(function(list)
						{
							return(
								<li key={list.id}>
									<a onClick={this.open.bind(this, list.id)}>{list.name}</a>
								</li>
							);
						}, this)}
						</ul>
					</td>
					<td>
						<h1>{this.props.playlists[playlistIndex].name}</h1>
						<button onClick={this.removePlaylist.bind(this, this.props.playlists[playlistIndex].id)}>Delete</button>
						<ul style={listCss}>
							{this.props.playlists[playlistIndex].titles.map(function(title)
							{
								return(
									<li key={title.id}>
										<iframe frameBorder="0" allowTransparency="true" scrolling="no" width="250" height="80" src={title.url}></iframe>
										<button onClick={this.removeTitle.bind(this, this.props.playlists[playlistIndex].id, title.id)}>Remove</button>
									</li>
								);
							}, this)}
						</ul>
					</td>
				</tr>
			</table>
		);
	}
});
