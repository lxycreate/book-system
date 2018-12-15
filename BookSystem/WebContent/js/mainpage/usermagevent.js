//解析用户数据
function ParseUserData(data) {
	userlist = [];
	userbox.html('');
	var df = [];
	for(var i = 0; i < data.length - 1; ++i) {
		df = {
			id: data[i].id,
			username: data[i].username,
			islock: data[i].islock,
			checkstate: 0
		};
		userlist.push(df);
		ShowUserList(df.id, df.username, df.islock);
	}
}

//显示用户数据
function ShowUserList(id, username, islock) {
	var s;
	if(islock == 0)
		s = "正常";
	if(islock == 1)
		s = "锁定";
	var html = '<div class="user-item" data-no="' + id + '">' +
		'<input class="usercheckbox" type="checkbox" onclick = "SelectUser(this)" data-no="' + id + '">' + '</input>' +
		'<span class="username" data-no="' + id + '">' + username + '</span>' +
		'<span class="accountstate" data-no="' + id + '">' + s + '</span>';
	userbox.append(html);
}

//选中或取消选中一个用户
function SelectOrNotUser(id, state, flag) {
	var e = document.getElementsByClassName("usercheckbox");
	var t;
	for(var i = 0; i < e.length; ++i) {
		if(e[i].getAttribute("data-no") == id && state == 1) {
			if(flag == 0)
				e[i].checked = true;
			//把存储书籍数据的表中对应的数据状态改变
			//更新时根据这个标志进行更新操作
			userlist[i - 1].checkstate = 1;
			t = i - 1;
		}
		if(e[i].getAttribute("data-no") == id && state == 0) {
			if(flag == 0)
				e[i].checked = false;
			//把存储书籍数据的表中对应的数据状态改变
			//更新时根据这个标志进行更新操作
			userlist[i - 1].checkstate = 0;
			t = i - 1;
		}
	}
}

//检查是否有选中元素
function CheckIsSelectUser() {
	var num = 0;
	for(var i = 0; i < userlist.length; ++i) {
		if(userlist[i].checkstate == 1)
			num++;
	}
	if(num == 0) {
		var M = {};
		M.dialog12 = jqueryAlert({
			'icon': 'res/alert/img/error.png',
			'content': '请至少选择一个条目',
			'closeTime': 2000,
		});
	}
	return num;
}