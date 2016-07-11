<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Account Settings</title>

	<!-- jQuery -->
	<script src="/Web20/Libs/jquery-2.1.3.js"></script>
	
	<!-- Logic -->
	<script src="/Web20/CodeBehind/account.js"></script>
		
	<!-- Styles -->
	<link href="/Web20/Styles/login.css" rel="stylesheet" />
		
</head>
<body>

	<div class="login">
		<form action="checkDeleteAccount.jsp" method="post" accept-charset="ISO-8859-1">
			<h1 class="form_header">Account Settings</h1>
			
			<h2 class="form_header2">Delete Account</h2>
			<div class="input">
				<h2>User</h2>
				<input class="login_name" id="userName" type="text" disabled/><br>
				<input class="hidden_id" id="userNameHidden" type="text" name="name"/><br>
				<h2>Password</h2>
				<input class="password_name" type="password" name="pw"/><br>
				<input class="hidden_id" id="userId" type="text" name="id"/><br>
			</div>
		
			<input class="submit" type="submit" name="submit" value="Delete your Account" />
		</form>
	</div>
	
</body>
</html>