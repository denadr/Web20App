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

var MasterDetailView = React.createClass(
{
	getInitialState : function ()
	{
		return { currentPlaylistId : this.props.playlists[0].id };
	},
	
	open : function (playlistId)
	{
		this.setState( { currentPlaylistId : playlistId } );
	},
	
	render : function ()
	{
		var playlistIndex = getIndexById(this.state.currentPlaylistId);
		
		return(
			<div>
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
				<DetailView playlist={this.props.playlists[playlistIndex]} ></DetailView>
			</div>
		);
	}
});

var DetailView = React.createClass(
{
	render : function ()
	{
		return(
			<ul style={listCss}>
				{this.props.playlist.titles.map(function(title)
				{
					return(
						<li key={title.id}>
							<iframe frameBorder="0" allowTransparency="true" scrolling="no" width="250" height="80" src={title.url}></iframe>
						</li>
					);
				})}
			</ul>
		);
	}
});
