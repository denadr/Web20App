<%@page import="models.*"%>
<%
	String name = request.getParameter("name");
	String pw = request.getParameter("pw");
	String id = request.getParameter("id");

	User user = null;
	Database db = null;
	boolean success = false;
	try
	{
		db = new Database();
		user = db.login(name, pw);
		if (user != null)
		{
			if (db.deleteUser(user.getId()))
			{
				success = true;
			}
		}
	}
	catch(Exception e)
	{
		System.out.println(e.toString());
	}
	finally
	{
		if (db != null)
		{
			db.close();
		}
	}
	
	if (success)
	{
	%><script>
		localStorage.setItem('username', null);
		localStorage.setItem('ID', null);
		window.location = 'search.html';
	</script><%
	}
	else
	{
	%><script>alert("Password not correct.");</script><%
		System.out.println("Delete account failed.");
		response.sendRedirect("account.jsp");
	}
%>
