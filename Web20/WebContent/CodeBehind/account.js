$(document).ready(function ()
{
	var id = localStorage.getItem('ID');
	var name = localStorage.getItem('username');
	console.log('account.jsp: ' + name + ' (' + id + ')');
		
	$('#userName').val(name);
	$('#userNameHidden').val(name);
	$('#userId').val(id);
});
