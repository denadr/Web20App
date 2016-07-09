function testDb() { request('dbtest', testCallback); }

function testCallback(data) { console.log(JSON.stringify(data)); }

function request(methodUrl, callback)
{
	$.ajax
	({
		url : '/Web20/rest/DatabaseService/' + methodUrl,
		success : function(response) { callback(response); }
	});
}

// ===== User requests =====

//function register(email, username, password)
//{
//	request('user/register/' + email + '/' + username + '/' + password, testCallback);
//}

//function login(username, password)
//{
//	request('user/login/' + username + '/' + password, testCallback);
//}

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

function addTitle(listId, descr, uri, callback)
{
	descr = 'DummyDescription';
	$.ajax
	({
		type : 'post',
		url : '/Web20/rest/DatabaseService/title/add',
        contentType : 'application/json; charset=utf-8',
        dataType : 'json',
        data : JSON.stringify( { playlistId : listId, description : descr, url : uri } ),
        traditional : true,
		success : function(response) { testCallback(response); }
	});
}

function deleteTitle(playlistId, titleId)
{
	request('title/delete/' + playlistId + '/' + titleId, testCallback);
}