<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
	<script src="/Web20/Scripts/Database/database.js"></script>
	<script src="https://code.jquery.com/jquery-2.1.3.js"></script>
	
<title>Login page</title>
<link href="/Web20/Styles/login.css" rel="stylesheet" />

</head>
<body>
	<form action="checklogin.jsp" method="post" accept-charset="ISO-8859-1">
		<h1>Please sign in</h1>
		Login<input type="text" name="name"/><br>
		Password<input type="password" name="password" /><br>
		<input type="submit" name="submit" value="OK" />
	</form>
	<a href="register.jsp">Not registered?</a>
</body>
</html>