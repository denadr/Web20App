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
	
	}
	if(user!=null){
		String id = String.valueOf(user.getId());
		%><script>
			var username = '<%=name%>';
			var ID = '<%=id%>';
			localStorage.setItem('username',username)
			localStorage.setItem('ID',ID);
		</script> <%
		response.sendRedirect("search.html");
	}
	else{
		%><script>alert("Password or username not correct")</script> <%
		response.sendRedirect("login.jsp");
	}
%>
