<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
	
<title>Login page</title>
<link href="/Web20/Styles/login.css" rel="stylesheet" />

</head>
<body>
	<div class="login">
	
	<form action="checklogin.jsp" method="post" accept-charset="ISO-8859-1">
		<h1 class="form_header">Please sign in</h1>
		
		<div class="input">
			<h2>Login</h2>
			<input class="login_name" type="text" name="name"/><br>
			<h2>Password</h2>
			<input class="password_name" type="password" name="pw"/><br>
		</div>
		
		<input class="submit" type="submit" name="submit" value="Login" />
	</form>
	
	<a href="register.jsp" class="link">Sign up</a>
	</div>
</body>
</html>