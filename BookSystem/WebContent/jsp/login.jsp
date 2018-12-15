<%@ page language="java" import="java.util.*"
	contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%
	String path = request.getContextPath();
	String basePath = request.getScheme() + "://" + request.getServerName() + ":" + request.getServerPort()
			+ path + "/";
%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html>
<head>
<!-- 解决引入css不生效的问题 -->
<base href="<%=basePath%>">
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<link href="css/login.css" type="text/css" rel="stylesheet">

<title>登录</title>
</head>

<script type="text/javascript" src="js/jquery.min.js"></script>
<body>
	<div id="login">
		<div id="loginbox">
			<form name="loginform">
				<div id="namebox" class="box">
					<input type="text" id="name" class="intxt" placeholder=" 用户名"></input>
					<div id="nametip" class="tip" hidden>用户名不能为空</div>
				</div>
				<div id="psdbox" class="box">
					<input type="password" id="psd" class="intxt" placeholder=" 密码"></input>
					<div id="psdtip" class="tip" hidden>密码不能为空</div>
				</div>
			</form>
			<div id="loginbutton" class="box">
				<div id="loginbtn" onclick="login()">登录</div>
			</div>
		</div>
	</div>
</body>
<script type="text/javascript" src="js/main.js"></script>
<script type="text/javascript" src="js/login.js"></script>
</html>