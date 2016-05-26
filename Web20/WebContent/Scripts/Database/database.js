function testDb(callback)
{
	$.ajax(
	{
		type : "POST",
		url : "/TestClient/rest/TestService/dbtest",
		data : "{}",
		dataType : "json",
		success : function(response)
		{
			callback(response);
		}
	});
}