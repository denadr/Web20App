<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Register page</title>

<link href="/Web20/Styles/register.css" rel="stylesheet" />

</head>

<body>
	<div class="register">
	
	<form action="checkregister.jsp" method="post" accept-charset="ISO-8859-1">
		<h1 class="form_header">Create a new account</h1>
		
		<div class="input">

		<h2>Email</h2>
		<input class="inputfield" type="text" name="email"/><br>
		
		<h2>Login</h2>
		<input class="inputfield" type="text" name="name" /><br>
		
		<h2>Password</h2>
		<input class="inputfield" type="password" name="pw" /><br>
		</div>
		
		<input class="submit" type="submit" name="submit" value="Sign up" />
	</form>
	
	</div>
</body>
</html>