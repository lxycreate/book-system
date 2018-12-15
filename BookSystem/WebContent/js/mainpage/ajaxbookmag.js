//加载第几页书籍信息
function AjaxLoadBookList(num) {
	var e = AjaxGetBookNum();
	var temp = ClcTotalPage(e);
	if(temp > 0) {
		if(temp >= num && num > 0) {
			$.ajax({
				type: "post",
				url: "getbooklist",
				data: "pageNum=" + num,
				dataType: "json",
				success: function(data) {
					//更新页码值
					booknowpage = num;
					//清空
					booklist = [];
					bookbox.html('');
					//更新页面上的值
					UpdatePageNum(booknowpage);
					if(data != null) {
						ParseData(data);
						ResetBookCheckBox("mycheckbox");
					}
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					//layer.msg("error");
					console.error(XMLHttpRequest + textStatus + errorThrown);
				}
			});
		} else if(num > temp || num <= 0) {
			var M = {};
			M.dialog = jqueryAlert({
				'content': '页码超过界限值',
				'closeTime': 2000,
			});
		}
	} else {
		var M = {};
		M.dialog = jqueryAlert({
			'content': '无图书数据',
			'closeTime': 2000,
		});
		//bookbox.html('');
	}
}

//加载第几页书籍信息
function AjaxLoadBookWordList(num, word) {
	var e = AjaxGetBookNumByWord(word);
	var temp = ClcTotalPage(e);
	if(word.length == 0)
		temp = 999;
	if(temp > 0) {
		if(temp >= num && num > 0) {
			$.ajax({
				type: "post",
				url: "getbookwordlist",
				data: "pageNewNum=" + num + "&word=" + word,
				dataType: "json",
				success: function(data) {
					//更新页码值
					booknowpage = num;
					//清空
					booklist = [];
					bookbox.html('');
					//更新页面上的值
					UpdatePageNum(booknowpage);
					if(data.length != 0) {
						if(word.length != 0) {
							booksearchword = word;
							booksearch = 1;
						} else
							booksearch = 0;
						ParseData(data);
						ResetBookCheckBox("mycheckbox");
					}
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
					//layer.msg("error");
					console.error(XMLHttpRequest + textStatus + errorThrown);
				}
			});
		}
		if(num > temp || num <= 0) {
			var M = {};
			M.dialog = jqueryAlert({
				'content': '页码超过界限值',
				'closeTime': 2000,
			});
		}
	} else {
		var M = {};
		M.dialog = jqueryAlert({
			'content': '无相关图书',
			'closeTime': 2000,
		});
	}
}

//获取书籍数据表条目总数
function AjaxGetBookNum() {
	var num;
	$.ajax({
		type: "post",
		url: "getbooknum",
		async: false,
		data: "bookNum=" + 0,
		dataType: "json",
		success: function(data) {
			//alert(data.id);
			num = data;
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			//layer.msg("error");
			num = 0;
			console.error(XMLHttpRequest + textStatus + errorThrown);
		}
	});
	return num;
}

//根据搜索词获取总页面数
function AjaxGetBookNumByWord(word) {
	var num;
	$.ajax({
		type: "post",
		url: "getbookwordnum",
		data: "bookWordNum=" + word,
		dataType: "json",
		async: false,
		success: function(data) {
			num = data;
			//return totalnum;
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			//layer.msg("error");
			num = 0;
			console.error(XMLHttpRequest + textStatus + errorThrown);
		}
	});
	return num;
}

//将图书改为下架状态
function AjaxDeleteBook(id) {
	var num;
	$.ajax({
		type: "post",
		url: "deletebook",
		data: "bookId=" + id,
		dataType: "json",
		async: false,
		success: function(data) {
			num = data;
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.error(XMLHttpRequest + textStatus + errorThrown);
		}
	});
	return num;
}

//上架图书
function AjaxUpBook(id) {
	var num;
	$.ajax({
		type: "post",
		url: "upbook",
		data: "bookId=" + id,
		dataType: "json",
		async: false,
		success: function(data) {
			num = data;
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.error(XMLHttpRequest + textStatus + errorThrown);
		}
	});
	return num;
}

//更新图书
function AjaxUpdateBook(e) {
	var num;
	$.ajax({
		type: "post",
		url: "updatebook",
		data: "bookId=" + e.id + "&bookName=" + e.bookname + "&author=" + e.author + "&price=" + e.price + "&stock=" + e.stock,
		dataType: "json",
		async: false,
		success: function(data) {
			num = data;
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.error(XMLHttpRequest + textStatus + errorThrown);
		}
	});
	return num;
}

//提交图片
function AjaxUploadPic(id) {
	var formData = new FormData();
	var fileobj = document.getElementById(id).files[0];
	//没选择图片就不上传
	if(picflag == 0)
		return -1;
	formData.append("file", fileobj);
	formData.append("bookid", bookid);
	var num;
	$.ajax({
		type: "post",
		url: "upload",
		data: formData,
		async: false,
		cache: false, //上传文件无需缓存
		processData: false, //用于对data参数进行序列化处理 这里必须false
		contentType: false, //必须
		success: function(data) {
			num = data;
		},
		error: function(data) {
			num = 0;
		}
	});
	return num;
}

//添加新的书籍
function AjaxInsertBook(bookname, author, price, stock) {
	var num;
	$.ajax({
		type: "post",
		url: "insertbook",
		async: false,
		data: "bookName=" + bookname + "&author=" + author + "&price=" + price + "&stock=" + stock,
		dataType: "json",
		success: function(data) {
			num = data;
		},
		error: function(data) {
			num = 0;
		}
	});
	return num;
}