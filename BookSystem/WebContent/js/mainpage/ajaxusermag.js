//加载第几页的用户信息
function AjaxLoadUserList(num) {
	if(num <= 0) {
		var M = {};
		M.dialog = jqueryAlert({
			'content': '页码超过界限值',
			'closeTime': 2000,
		});
		return false;
	}
	$.ajax({
		type: "post",
		url: "getuserlist",
		data: "userpageNum=" + num,
		dataType: "json",
		success: function(data) {
			if(data[data.length - 1].message == 0 && num != 1) {
				var M = {};
				M.dialog = jqueryAlert({
					'content': '页码超过界限值',
					'closeTime': 2000,
				});
				return false;
			}
			if(data[data.length - 1].message == 0 && num == 1) {
				var M = {};
				M.dialog = jqueryAlert({
					'content': '无用户数据',
					'closeTime': 2000,
				});
				return false;
			}
			if(data[data.length - 1].message == 1) {
				ParseUserData(data);
				UpdateUserPage(num);
				ResetBookCheckBox("usercheckbox");
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			//layer.msg("error");
			console.error(XMLHttpRequest + textStatus + errorThrown);
		}
	});
}

//搜索用户
function AjaxSearchUser(word) {
	$.ajax({
		type: "post",
		url: "getuserbyword",
		data: "word=" + word,
		dataType: "json",
		success: function(data) {
			if(data.message == 0) {
				var M = {};
				M.dialog = jqueryAlert({
					'content': '无此用户',
					'closeTime': 2000,
				});
			} else {
				userbox.html("");
				userlist = [];
				usersearch = 1;
				var e = [];
				e = {
					id: data.id,
					username: data.username,
					islock: data.islock,
					checkstate: 0
				}
				userlist.push(e);
				UpdateUserPage(1);
				ShowUserList(e.id, e.username, e.islock);
				ResetBookCheckBox("usercheckbox");
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.error(XMLHttpRequest + textStatus + errorThrown);
		}
	});
}

//删除用户
function AjaxDeleteUser(id) {
	$.ajax({
		type: "post",
		url: "deleteuser",
		data: "uid=" + id,
		dataType: "json",
		success: function(data) {

		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.error(XMLHttpRequest + textStatus + errorThrown);
		}
	});
}

//解锁用户

function AjaxUnlockUser(id) {
	$.ajax({
		type: "post",
		url: "unlockuser",
		data: "uid=" + id,
		dataType: "json",
		success: function(data) {
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.error(XMLHttpRequest + textStatus + errorThrown);
		}
	});
}