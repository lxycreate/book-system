//登录注册页面标志，0代表是登录页
var lgre = 0;
// 加载登录界面
function InitLogin() {
	InitLoginEvent();
	InitQuickLg();
}
// 初始化快速登录
function InitQuickLg() {
	ChangeColorById("quicklg", "rgba(0,0,0,0.8)");
	var len = document.getElementById("mainbox").offsetWidth;
	ChangeWidthById("headbar", "" + len / 2);
}

// 加载登录界面的事件
function InitLoginEvent() {
	// 登录按钮
	$("#loginbtn").click(function() {
		Login();
	});
	// 快速登录
	$("#quicklg").click(function() {
		QuickLg();

	});
	// 快速注册
	$("#quickre").click(function() {
		QuickRe();
	});
	// 用户名输入框获得焦点的事件
	document.getElementById('name').onfocus = function() {
		$("#nametip").stop();
		$("#nametip").slideUp();
	};
	// 密码输入框获得焦点的事件
	document.getElementById("psd").onfocus = function() {
		$("#psdtip").stop();
		$("#psdtip").slideUp();
	};

}
// 快速登录事件

function QuickLg() {
	HideTip();
	// 改变header上的“快速登录”字体颜色
	ChangeColorById("quicklg", "rgba(0,0,0,0.9)");
	if (lgre == 1)
		// 改变header上的bar的位置
		ChangePosById("headbar", "0");
	// 改变两个页面的位置
	ChangePosById("registerbox", "-340");
	ChangePosById("loginbox", "0");
	// 改变header上的“快速注册”字体颜色
	ChangeColorById("quickre", "rgba(0,0,0,0.6)");
	// 改变页面header以下的名为nxtbox的div的高度
	ChangeHeById("nxtbox", "270");
	// 代表当前是登录页面
	lgre = 0;
}
// 快速注册事件
function QuickRe() {
	HideTip();
	ChangeColorById("quickre", "rgba(0,0,0,0.9)");
	if (lgre == 0)
		ChangePosById("headbar", "170");
	ChangePosById("registerbox", "0");
	ChangePosById("loginbox", "340");
	ChangeColorById("quicklg", "rgba(0,0,0,0.6)");
	ChangeHeById("nxtbox", "410");
	lgre = 1;
}
// 登录事件
function Login() {
	var name = document.getElementById("name").value;
	var psd = document.getElementById("psd").value;
	if (name.length == 0) {
		$("#nametip").stop();
		$("#nametip").slideDown();
	}
	if (psd.length == 0) {
		$("#psdtip").stop();
		$("#psdtip").slideDown();
	}
	if (name.length != 0 && psd.length != 0) {
		AjaxLogin(name, psd);
	}
}
// 传入id和width改变长度
function ChangeWidthById(lid, len) {
	$("#" + lid).stop();
	$("#" + lid).animate({
		width : len + "px"
	}, 500);
}
// 传入id和color改变颜色
function ChangeColorById(lid, newcolor) {
	document.getElementById(lid + "").style.color = "" + newcolor;
}
// 传入id和length改变位置
function ChangePosById(lid, pos) {
	$("#" + lid).stop();
	$("#" + lid).animate({
		left : pos + "px"
	}, 500);
}
// 传入id和height改变高度
function ChangeHeById(lid, hei) {
	$("#" + lid).stop();
	$("#" + lid).animate({
		height : hei + "px"
	}, 500);
}
// 隐藏所有提示
function HideTip() {
	/*
	 * var e = document.getElementById("tip"); for(i = 0; i < e.length; ++i) {
	 * e[i].stop(); e[i].slideUp(); }
	 */
	$(".tip").stop();
	$(".tip").slideUp();
}