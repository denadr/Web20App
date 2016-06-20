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
		%><script>window.location="search.html";</script><%
	}
	else{
		%><script>alert("Password or username not correct")</script> <%
		%><script>window.location="login.jsp";</script><%
	}
%>
