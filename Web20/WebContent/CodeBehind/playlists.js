var userId = null;
var ids = [];

$(document).ready(function ()
{
	userId = localStorage.getItem('ID');
	if (userId != null && userId != 'null')
	{
		var userName = localStorage.getItem('username');
		console.log('Logged in: ' + userName + ' (' + userId + ')');
		
		$('#menu_button').val(userName);
		document.getElementById('signout_button').addEventListener('click', function()
		{
			localStorage.setItem('ID', null);
			localStorage.setItem('username', null);
		});
		
		$.getScript('/Web20/Scripts/SocialAPI/facebook.js', function()
		{
			console.log('Loaded local facebook.js.');	
		});
		$.getScript('/Web20/Scripts/SocialAPI/twitter.js', function()
		{
			console.log('Loaded local twitter.js.');
		});
		
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
	else // This should not happen.
	{
		console.log('Not logged in.');
	}
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
	return -1;
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
			currentPlaylistId : this.props.playlists.length > 0 ? this.props.playlists[0].id : -1,
			changed : false,
			opened : false,
		};
	},
	
	dropDown : function ()
	{
		this.setState( { opened : !this.state.opened } );
	},

	open : function (playlistId)
	{
		this.setState( 
		{ 
			currentPlaylistId : playlistId,
			changed : this.state.changed,
			opened : this.state.opened
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
					changed : self.state.changed,
					opened : self.state.opened
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
			changed : this.state.changed,
			opened : this.state.opened
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
					changed : !this.state.changed,
					opened : this.state.opened
				});
			}
		}
		
		deleteTitle(playlistId, titleId, function(response)
		{
			console.log('removeTitle: ' + response.message);
		});
	},
	
	shareFacebook : function (playlistId)
	{
		var link = window.location.protocol + '://' + window.location.host + '/Web20/playlist.html?id=' + playlistId;
		console.log('shareFacebook: ' + link);
		
		// TODO: call facebook share functionality
				
		this.setState( 
		{ 
			currentPlaylistId : this.state.currentPlaylistId,
			changed : this.state.changed,
			opened : false
		});
	},
	
	shareTwitter : function (playlistId)
	{
		var link = window.location.protocol + '://' + window.location.host + '/Web20/playlist.html?id=' + playlistId;
		console.log('shareTwitter: ' + link);
		
		// TODO: call twitter share functionality
		
		this.setState( 
		{ 
			currentPlaylistId : this.state.currentPlaylistId,
			changed : this.state.changed,
			opened : false
		});
	},
	
	render : function ()
	{
		var playlistIndex = getIndexById(this.state.currentPlaylistId);
		var detailView = <p>No Playlists to show.</p>;

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
		
		var listCss =
		{
			listStyleType : 'none'
		};
		
		if (playlistIndex >= 0)
		{
			var titlesView = <p>No Titles to show.</p>;
			
			if (this.props.playlists[playlistIndex].titles.length > 0)
			{
				titlesView = <ul style={listCss}>
								{this.props.playlists[playlistIndex].titles.map(function(title)
								{
									return(
										<li key={title.id}>
											<iframe frameBorder="0" allowTransparency="true" scrolling="no" width="250" height="80" src={title.url}></iframe>
											<button onClick={this.removeTitle.bind(this, this.props.playlists[playlistIndex].id, title.id)}>Remove</button>
										</li>
									);
								}, this)
								}
							</ul>
			}		
			
			detailView = <div>
							<h1>{this.props.playlists[playlistIndex].name}</h1>
							<button onClick={this.removePlaylist.bind(this, this.props.playlists[playlistIndex].id)}>Delete</button>
							<div>
								<button style={buttonCss} onClick={this.dropDown}>Share</button>
								<div style={contentCss}>
									<a style={optionCss} onClick={this.shareFacebook.bind(this, this.props.playlists[playlistIndex].id)}>Facebook</a>
									<a style={optionCss} onClick={this.shareTwitter.bind(this, this.props.playlists[playlistIndex].id)}>Twitter</a>
								</div>
							</div>	
							<div>{titlesView}</div>
						</div>;
		}
				
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
					<td>{detailView}</td>
				</tr>
			</table>
		);
	}
});
