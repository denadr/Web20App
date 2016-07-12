var userId = null;
var ids = [];

$(document).ready(function ()
{
	userId = localStorage.getItem('ID');
	if (userId != null && userId != 'null')
	{
		var userName = localStorage.getItem('username');
		//console.log('Logged in: ' + userName + ' (' + userId + ')');
		
		$('#menu_button').val(userName);
		document.getElementById('signout_button').addEventListener('click', function()
		{
			localStorage.setItem('ID', null);
			localStorage.setItem('username', null);
		});
		
		//$.getScript('/Web20/Scripts/SocialAPI/facebook.js', function () { /*console.log('Loaded local facebook.js.');*/ });
		
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
		//console.log('Not logged in.');
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
	
	render : function ()
	{
		var playlistIndex = getIndexById(this.state.currentPlaylistId);
		var detailView = <p>No Playlist to show</p>;
		
		var listCss =
		{
			listStyleType : 'none'
		};
		
		var listElemCss =
		{
			marginBottom: '15px'
		};
		
		var bodyCss =
		{
			margin: '50px auto',
			textAlign: 'top',
			verticalAlign: 'top',
			fontFamily: 'Lucida Sans Unicode, Lucida Grande, sans-serif'
		};
		
		var asideListCss =
		{
			width: '25%'
		};
		
//		var heart =
//		{
//			marginRight: '10px',
//			float: 'left'
//		};
		
		var playlist =
		{
			fontSize: '12pt'
		};
		
		var namingCss =
		{
			margin: '10px',
			padding: '5px 0px',
			fontSize: '12pt'
		};
		
		var detailViewCss =
		{
			padding: '5% 10%',
			width: '50%',
		    
			color: '#92959c',
		    background: '#2b303b',
		    borderWidth: '0',
			borderRadius: '10px'
		};
		
		var headingCss =
		{
			width: '95%'
		};
		
		var buttonCss =
		{
			width: '5%'
		};
		
		var deleteButtonCss =
		{
			display: 'inlineblock',
			position: 'relative',
			float: 'right',
			padding: '2.5% 5%',
		
			fontSize: '12pt',
			color: '#92959c',
			background: '#495366',
			borderWidth: '0',
	  		borderRadius: '10px'
		};
		
		var subheadingCss =
		{
			fontSize: '10pt'
		};
		
		var shareLinksCss =
		{
			
		};
		
		var titlesViewCss =
		{
			display: 'block',
			textAlign: 'center',
			verticalAlign: 'middle'
		};
		
		var widgetCss =
		{
			verticalAlign: 'middle',
			marginBottom: '10px'
		};
		
		var newButtonCss =
		{
			fontSize: '12pt',
			padding: '2.5% 5%',
		
			color: '#92959c',
			background: '#495366',
			borderWidth: '0',
	  		borderRadius: '10px'
		};
		
		var removeButtonCss =
		{
			display: 'block',
			float: 'right',
			padding: '2%',
			verticalAlign: 'middle',
			
			backgroundColor: '#4CAF50',
		    color: 'white',
		    fontSize: '12pt',
		    borderWidth: '0'
		};
		
		var facebookCss =
		{
			border: 'none',
			overflow: 'hidden',
			width: 60,
			height: 20
		};

		if (playlistIndex >= 0)
		{
			var titlesView = <p>No Titles to show</p>;
			
			if (this.props.playlists[playlistIndex].titles.length > 0)
			{
				titlesView = <ul style={listCss}>
								{this.props.playlists[playlistIndex].titles.map(function(title)
								{
									return(
										<li key={title.id} style={widgetCss}>
											<iframe frameBorder="0" allowTransparency="true" scrolling="no" width="250" height="80" src={title.url}></iframe>
											<button onClick={this.removeTitle.bind(this, this.props.playlists[playlistIndex].id, title.id)} style={removeButtonCss}>Remove</button>
										</li>
									);
								}, this)
								}
							</ul>
			}		
			
			var shareLink = window.location.protocol + '//' + window.location.host + '/Web20/playlist.html?id=' + this.props.playlists[playlistIndex].id;
			var twitterLink = 'https://twitter.com/share?text=' + this.props.playlists[playlistIndex].name;
			var facebookLink = 'https://www.facebook.com/plugins/share_button.php?href=' + escape(shareLink) + '&layout=button&mobile_iframe=true&width=60&height=20&appId';
			
			detailView = <div>
							<table><tbody><tr>
								<td style={headingCss}>
									<h1>{this.props.playlists[playlistIndex].name}</h1>
								</td>
								<td style={buttonCss}>
									<button onClick={this.removePlaylist.bind(this, this.props.playlists[playlistIndex].id)} style={deleteButtonCss}>Delete Playlist</button>
								</td>
							</tr></tbody></table>
							<table><tbody><tr>
								<td style={subheadingCss}>
									<h2>Share the playlist with your friends: </h2>
								</td>
								<td style={shareLinksCss}>
									<iframe src={facebookLink} style={facebookCss}></iframe>								
									<div id="tweet_button"><a className="twitter-share-button" href={twitterLink} ref="share" data-url={shareLink} data-hashtags="UMSE">Tweet</a></div>
								</td>
							</tr></tbody></table>	
							<div style={titlesViewCss}>{titlesView}</div>
						</div>;
		}
				
		return(
			<table style={bodyCss}>
				<tbody><tr>
					<td style={asideListCss}>
						<input type="text" id="newPlaylistName" placeholder="Playlist name..." style={namingCss}></input>
						<button onClick={this.createPlaylist} style={newButtonCss}>New</button>
						
						<ol>
						{this.props.playlists.map(function(list)
						{
							return(
								<li key={list.id} style={listElemCss}>
									<a onClick={this.open.bind(this, list.id)} style={playlist}>{list.name}</a>
								</li>
							);
						}, this)}
						</ol>
					</td>
					
					<td style={detailViewCss}>{detailView}</td>
					
				</tr></tbody>
			</table>
		);
	},
	
	componentDidMount : function ()
	{
		window.twttr.widgets.load();
	},
	
	componentDidUpdate : function ()
	{
		var playlistIndex = getIndexById(this.state.currentPlaylistId);
		if (playlistIndex >= 0)
		{
			var shareLink = window.location.protocol + '//' + window.location.host + '/Web20/playlist.html?id=' + this.props.playlists[playlistIndex].id;
			var twitterLink = 'https://twitter.com/share?text=' + this.props.playlists[playlistIndex].name + '&url=' + escape(shareLink);
			
			$('#tweet_button').html('');
			$('#tweet_button').html('<a data-twitter-extracted-i146835363954740267="true" data-hashtags="UMSE" href="' + twitterLink + '" class="twitter-share-button">Tweet</a>');
			
			//console.log('componentDidUpdate: ' + $('#tweet_button').html());
			window.twttr.ready(function(twttr)
			{
				twttr.widgets.load();
			});
		}
	}
});
