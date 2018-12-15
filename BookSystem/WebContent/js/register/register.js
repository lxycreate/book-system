//代表确认密码失去焦点
//解决在确认密码框为空和密码框为空的条件下，确认密码框失去焦点时，提示密码长度为8-20
var focus = 0;
// 初始化register注册相关
function InitRegister() {
	InitRegisterEvent();
}
// 加载register事件
function InitRegisterEvent() {
	// 注册按钮单击事件
	$("#registerbtn").click(function() {
		Register();
	});
	// 用户名输入框获得焦点的事件
	document.getElementById('renametxt').onfocus = function() {
		HideTipById("renametip");
	};
	// 邮箱输入框获得焦点的事件
	document.getElementById('emailtxt').onfocus = function() {
		HideTipById("emailtip");
	};
	// 密码输入框获得焦点的事件
	document.getElementById("repsdtxt").onfocus = function() {
		HideTipById("repsdtip");
	};
	// 密码输入框失去焦点的事件
	document.getElementById("repsdtxt").onblur = function() {
		PsdTip();
	};
	// 确认密码输入框获得焦点的事件
	document.getElementById("againpsdtxt").onfocus = function() {
		HideTipById("againpsdtip");
	};
	// 确认密码输入框失去焦点的事件
	document.getElementById("againpsdtxt").onblur = function() {
		focus = 0;
		AgainPsdTip();
	};
}
// 注册按钮事件
function Register() {
	focus = 1;
	var rename = document.getElementById("renametxt").value;
	var email = document.getElementById("emailtxt").value;
	var e = document.getElementById("repsdtxt").value;
	var a = document.getElementById("againpsdtxt").value;
	// 用户名检查
	if(rename.length == 0) {
		ShowTipById("renametip");
	}
	// 密码检查
	if(e.length < 8) {
		document.getElementById("repsdtip").innerText = "密码长度为8-20";
		ShowTipById("repsdtip");
	}
	// 邮件检查
	if(email.length == 0) {
		ShowTipById("emailtip");
	}
	// 确认密码检查
	AgainPsdTip();

	//输入框的数据均合法，下一步进行Ajax注册
	if(rename.length != 0 && email.length != 0 && e.length >= 8 && a.length >= 8 && a == e) {
		AjaxRegister(rename, a, email);
	}
}
// 密码提示
function PsdTip() {
	// 先检查密码框中的密码是不是长度大于0小于8
	var e = document.getElementById("repsdtxt").value;
	if(e.length < 8 && e.length > 0) {
		document.getElementById("repsdtip").innerText = "密码长度为8-20";
		ShowTipById("repsdtip");
	}
	var a = document.getElementById("againpsdtxt").value;
	// 两个框中的密码不一致
	if(a != e && a.length != 0) {
		document.getElementById("againpsdtip").innerText = "两次输入的密码不一致";
		ShowTipById("againpsdtip");
	}
	if(a == e)
		// 两个框中的密码一致，但是长度小于8
		if(a.length < 8 && a.length > 0) {
			document.getElementById("againpsdtip").innerText = "密码长度为8-20";
			ShowTipById("againpsdtip");
		} else
			HideTipById("againpsdtip");
}
// 确认密码提示
function AgainPsdTip() {
	var a = document.getElementById("againpsdtxt").value;
	var b = document.getElementById("repsdtxt").value;
	if(a != b) {
		document.getElementById("againpsdtip").innerText = "两次输入的密码不一致";
		ShowTipById("againpsdtip");
	} else if(focus == 0 && a.length > 0 && a.length < 8) {
		document.getElementById("againpsdtip").innerText = "密码长度为8-20";
		ShowTipById("againpsdtip");
	} else if(focus == 1 && a.length < 8) {
		document.getElementById("againpsdtip").innerText = "密码长度为8-20";
		ShowTipById("againpsdtip");
	}

}
// 通过id显示tip
function ShowTipById(lid) {
	$("#" + lid).stop();
	$("#" + lid).slideDown();
}
// 通过id隐藏tip
function HideTipById(lid) {
	$("#" + lid).stop();
	$("#" + lid).slideUp();
}