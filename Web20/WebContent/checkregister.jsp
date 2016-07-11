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
				User user = db.login(name, pw);
				String id = String.valueOf(user.getId());
				%><script>
					var username = '<%=name%>';
					var ID = '<%=id%>';
					localStorage.setItem('username',username)
					localStorage.setItem('ID',ID);
					window.location = 'search.html';
				</script> <%
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
