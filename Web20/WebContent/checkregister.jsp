<%@page import="models.*"%>
<%
	//get name and pw from request
	String name = request.getParameter("name");
	String pw = request.getParameter("pw");
	String email = request.getParameter("email");
	
	if(!name.isEmpty() && !pw.isEmpty() && !email.isEmpty()){
		try{
			Database db = new Database();
			if(db.register(email, name, pw)){
				%><script>alert("Succeeded");</script><%
				%><script>window.location="search.html";</script><%
			}
			else{
				%><script>alert("Username not free");</script><%
				%><script>window.location="register.jsp";</script><%

			}
		}catch(Exception e){
			
		}
	}
	else{
		%><script>alert("Need more information");</script><%
		%><script>window.location="register.jsp";</script><%
	}
%>
