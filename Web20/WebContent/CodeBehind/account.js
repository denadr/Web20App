var loggedIn = false;

$(document).ready(function ()
{
	var userId = localStorage.getItem('ID');
	if (userId != null && userId != 'null')
	{
		loggedIn = true;
		var userName = localStorage.getItem('username');
		console.log('Logged in: ' + userName + ' (' + userId + ')');
		
		$('#username').val(userName);
	}
	else 
	{
		console.log('Not logged in.');
	}
});