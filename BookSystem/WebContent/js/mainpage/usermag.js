//用于储存用户数据
var userlist = [];

//用于实例化名为bookbox的div
var userbox;

//搜索模式标志
var usersearch;

//保存当前页
var usernowpage;

//初始化用户管理
function InitUserMag() {
	InitUserItems();
	AjaxLoadUserList(1);
}

//初始化用户管理相关
function InitUserItems() {
	usersearch = 0;
	userlist = [];
	usernowpage = 1;
	userbox = $("#userbox");
	document.getElementById('searchuser').value = "";
	userbox.html('');
}

//上一页
function UPPage() {
	if(usersearch == 0)
		AjaxLoadUserList(usernowpage - 1);
	else {
		var M = {};
		M.dialog = jqueryAlert({
			'content': '页码超过界限值',
			'closeTime': 2000,
		});
	}
}

//下一页
function UNPage() {
	if(usersearch == 0)
		AjaxLoadUserList(usernowpage + 1);
	else {
		var M = {};
		M.dialog = jqueryAlert({
			'content': '页码超过界限值',
			'closeTime': 2000,
		});
	}
}

//更新页码
function UpdateUserPage(num) {
	usernowpage = num;
	document.getElementById("usernum").innerHTML = num;
}

//搜索用户
function SearchUser() {
	if(document.getElementById('searchuser').value.length != 0)
		AjaxSearchUser(document.getElementById('searchuser').value);
	else {
		usersearch = 0;
		AjaxLoadUserList(1);
	}
	return false;
}

//选中所有的用户
function SelectUser(e) {
	var id = e.getAttribute("data-no");
	if(id > 0)
		if(e.checked == true)
			SelectOrNotUser(id, 1, 1);
		else
			SelectOrNotUser(id, 0, 1);
	//全选或全不选框
	if(id == 0) {
		if(e.checked == true) {
			for(var i = 0; i < userlist.length; ++i) {
				SelectOrNotUser(userlist[i].id, 1, 0);
			}
		} else {
			for(var i = 0; i < userlist.length; ++i) {
				SelectOrNotUser(userlist[i].id, 0, 0);
			}
		}
	}
}

//退出搜索
function ExitSearchUser() {
	if(usersearch == 0) {
		var M = {};
		M.dialog1 = jqueryAlert({
			'content': '当前为正常模式',
			'closeTime': 2000,
		});
	} else {
		usersearch = 0;
		document.getElementById('searchuser').value = "";
		AjaxLoadUserList(1);
		var M = {};
		M.dialog1 = jqueryAlert({
			'content': '已退出搜索模式',
			'closeTime': 2000,
		});
	}
}

//删除用户
function DeleteUser() {
	var m = CheckIsSelectUser();
	if(m != 0) {
		var M = {};
		M.dialog3 = jqueryAlert({
			'title': '警告',
			'content': '此操作不可恢复，是否继续？',
			'modal': true,
			'buttons': {
				'确定': function() {
					for(var i = 0; i < userlist.length; ++i) {
						if(userlist[i].checkstate == 1)
							AjaxDeleteUser(userlist[i].id);
					}
					M.dialog3.close();
					var W = {};
					W.dialog = jqueryAlert({
						'icon': 'res/alert/img/right.png',
						'content': '删除成功',
						'closeTime': 2000,
					});
					AjaxLoadUserList(usernowpage);
				},
				'取消': function() {
					M.dialog3.close();
				}
			}
		});
	}
}

//解锁
function UnlockUser() {
	var m = CheckIsSelectUser();
	if(m != 0) {
		var M = {};
		M.dialog3 = jqueryAlert({
			'title': '提示',
			'content': '是否解锁？',
			'modal': true,
			'buttons': {
				'确定': function() {
					for(var i = 0; i < userlist.length; ++i) {
						if(userlist[i].checkstate == 1)
							AjaxUnlockUser(userlist[i].id);
					}
					M.dialog3.close();
					var W = {};
					W.dialog = jqueryAlert({
						'icon': 'res/alert/img/right.png',
						'content': '解锁成功',
						'closeTime': 2000,
					});
					AjaxLoadUserList(usernowpage);
				},
				'取消': function() {
					M.dialog3.close();
				}
			}
		});
	}
}