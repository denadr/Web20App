<%@ page language="java" contentType="text/html; charset=ISO-8859-1"
    pageEncoding="ISO-8859-1"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=ISO-8859-1">
<title>Account Settings</title>

	<!-- Logic -->
	<script type="text/babel" src="/Web20/Scripts/Database/database.js"></script>
	<script type="text/babel" src="/Web20/CodeBehind/account.js"></script>
	
	<!-- Styles -->
	<link href="/Web20/Styles/account.css" rel="stylesheet" />
	
</head>
<body>
	<div class="account">
		<h1>Account</h1>
		<h2>Hello <h2 id="username"></h2></h2>
		<button class="delete_button" id="delete_button">Delete your Account</button>
	</div>
</body>
</html>