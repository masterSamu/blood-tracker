<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Bloodlist</title>
</head>
<body>
<form action='/rest/bloodservice/addblood' method='post'>
<input type='text' name='bloodType' value=''>
<input type='text' name='amount' value=''>
<input type='submit' name='ok' value='OK'>
</form>
<ol>
<c:forEach var="blood" items="${requestScope.bloodlist}">
	<li>${blood} <a href='../deleteblood?id=${blood.id}'>Delete</a> <a href='../readtoupdateblood?id=${blood.id}'>Update</a>
</c:forEach>
</ol>
</body>
</html>