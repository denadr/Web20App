function testDb() { request('dbtest', testCallback); }

function testCallback(data) { alert(JSON.stringify(data)); }

function request(methodUrl, callback)
{alert('request');
	$.ajax
	({
		url : '/Web20/rest/DatabaseService/' + methodUrl,
		success : function(response) { alert('success');callback(response); }
	});
}

// ===== User requests =====

function register(email, username, password)
{
	request('user/register/' + email + '/' + username + '/' + password, testCallback);
}

function login(username, password)
{alert('login');
	request('user/login/' + username + '/' + password, testCallback);
}

function deleteUser(userId)
{
	request('user/delete/' + userId, testCallback);
}

//===== Playlist requests =====

function addPlaylist(userId, playlistName)
{
	request('playlist/add/' + userId + '/' + playlistName, testCallback);
}

function deletePlaylist(playlistId)
{
	request('playlist/delete/' + playlistId, testCallback);
}

function getPlaylists(userId, callback)
{
	request('playlist/getall/' + userId, function(dbResponse)
	{
		callback(dbResponse.playlists);
	});
}

function getPlaylist(playlistId)
{
	request('playlist/get/' + playlistId, testCallback);
}

//===== Title requests =====

function addTitle(playlistId, description, url)
{
	request('title/add/' + playlistId + '/' + description + '/' + url, testCallback);
}

function deleteTitle(playlistId, titleId)
{
	request('title/delete/' + playlistId + '/' + titleId, testCallback);
}