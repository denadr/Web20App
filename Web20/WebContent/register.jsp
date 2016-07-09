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
	<form action="checkregister.jsp" method="post" accept-charset="ISO-8859-1">
		<h1>Please sign up</h1>
		Email<input type="text" name="email"/><br>
		Login<input type="text" name="name" /><br>
		Password<input type="password" name="pw" /><br>
		<input type="submit" name="submit" value="OK" />
	</form>
	<a href="search.html">Back</a>
</body>
</html>