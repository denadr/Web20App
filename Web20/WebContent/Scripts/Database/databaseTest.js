function test_click()
{
	var updateUI = function(data)
	{
		$("#output").html("Hello from user: " + data.user.username);
	}
	
	testDb(updateUI);
}