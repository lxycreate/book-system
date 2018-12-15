//登录的ajax操作
function AjaxLogin(name, psd) {
	$.ajax({
		type: "post",
		url: "login",
		data: "userName=" + name + "&passWord=" + psd,
		dataype: "json",
		success: function(data) {
			if(data.name.length != 0) {
				window.location.href = "mainpage.html";
			} else {
				var M = {};
				M.dialog = jqueryAlert({
					'icon': 'res/alert/img/error.png',
					'content': '用户名或密码不正确',
					'closeTime': 2000,
				});
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert("error");
		}

	});
}

//注册的ajax操作
function AjaxRegister(name, psd, email) {
	$.ajax({
		type: "post",
		url: "register",
		data: "userName=" + name + "&passWord=" + psd + "&email=" + email,
		dataype: "json",
		success: function(data) {
			if(data.code == 1)
				alert("注册成功");
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			alert("error");
		}
	});
}