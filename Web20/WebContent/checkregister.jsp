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
				response.sendRedirect("search.html");
			}
			else{
				%><script>alert("Username not free");</script><%
				response.sendRedirect("register.jsp");

			}
		}catch(Exception e){
			
		}
	}
	else{
		%><script>alert("Need more information");</script><%
		response.sendRedirect("register.jsp");
	}
%>
