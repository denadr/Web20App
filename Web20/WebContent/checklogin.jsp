<%@page import="models.*"%>
<%
	//get name and pw from request
	String name = request.getParameter("name");
	String pw = request.getParameter("pw");

	//check if name and pw are correcte
	User user = null;
	try{
		Database db = new Database();
		user = db.login(name, pw);
	}catch(Exception e){
		System.out.println(e.getMessage());
	}
	if(user!=null){
		String id = String.valueOf(user.getId());
		System.out.println(name + id);
		%><script>
			alert('debug');
			console.log('debug');
			var username = '<%=name%>';
			var ID = '<%=id%>';
			alert(username + ID);
			console.log(username + ID);
			localStorage.setItem('username',username)
			localStorage.setItem('ID',ID);
		</script> <%
		response.sendRedirect("search.html");
	}
	else{
		%><script>alert("Password or username not correct");</script> <%
		System.out.println("Login failed.");
		response.sendRedirect("login.jsp");
	}
%>
