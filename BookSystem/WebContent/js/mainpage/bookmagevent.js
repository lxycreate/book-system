var addname;
var addauthor;
var addprice;
var addstock;

//上一页
function PreBookPage() {
	// 当前为搜索模式
	if(booksearch == 1) {
		AjaxLoadBookWordList(booknowpage - 1, booksearchword);
	} else {
		AjaxLoadBookList(booknowpage - 1);
	}
}
// 下一页
function NextBookPage() {
	// 当前为搜索模式
	if(booksearch == 1) {
		AjaxLoadBookWordList(booknowpage + 1, booksearchword);
	} else {
		AjaxLoadBookList(booknowpage + 1);
	}
}

// 增加图书
function AddBook() {
	$("#addbox").fadeIn();
}

// 下架图书
function DeleteBook() {
	if(CheckBookIsSelect() != 0) {
		var M = {};
		M.dialog = jqueryAlert({
			'title': '提示',
			'width': '200',
			'content': '是否下架',
			'modal': true,
			'buttons': {
				'确定': function() {
					M.dialog.close();
					bookmiss = [];
					inorders = [];
					for(var i = 0; i < booklist.length; ++i)
						if(booklist[i].checkstate == 1) {
							var e = AjaxDeleteBook(booklist[i].id);
							if(e == 0)
								AddIntoBookMiss(booklist[i].bookname);
							if(e == -1)
								AddIntoInOrders(booklist[i].bookname);
						}
					// 显示操作结果
					DeleteBookErrorDeal();
					// 更新当前页的数据
					UpdateAfterDelete();
					// 复位单选框
					ResetBookCheckBox("mycheckbox");
				},
				'取消': function() {
					M.dialog.close();
				}
			}
		});
	}
}

// 上架图书
function UpBook() {
	if(CheckBookIsSelect() != 0) {
		var M = {};
		M.dialog = jqueryAlert({
			'title': '提示',
			'width': '200',
			'content': '是否上架',
			'modal': true,
			'buttons': {
				'确定': function() {
					M.dialog.close();
					bookmiss = [];
					inorders = [];
					for(var i = 0; i < booklist.length; ++i)
						if(booklist[i].checkstate == 1) {
							var e = AjaxUpBook(booklist[i].id);
							if(e == 0)
								AddIntoBookMiss(booklist[i].bookname);
						}
					// 显示操作结果
					DeleteBookErrorDeal();
					// 更新当前页的数据
					UpdateAfterDelete();
					// 复位单选框
					ResetBookCheckBox("mycheckbox");
				},
				'取消': function() {
					M.dialog.close();
				}
			}
		});
	}
}

// 更新图书,如果更新，显示更新后的值
function UpdateBook() {
	if(CheckBookIsSelect() != 0) {
		var M = {};
		M.dialog = jqueryAlert({
			'title': '提示',
			'width': '200',
			'content': '是否更新',
			'modal': true,
			'buttons': {
				'确定': function() {
					M.dialog.close();
					bookmiss = [];
					inorders = [];
					for(var i = 0; i < booklist.length; ++i)
						if(booklist[i].checkstate == 1) {
							var e = AjaxUpdateBook(booklist[i]);
							if(e == 0)
								AddIntoBookMiss(booklist[i].bookname);
						}
					// 显示操作结果
					DeleteBookErrorDeal();
					// 更新当前页的数据
					UpdateAfterDelete();
					// 复位单选框
					ResetBookCheckBox("mycheckbox");
				},
				'取消': function() {
					M.dialog.close();
				}
			}
		});
	}
}

// 退出搜索图书
function ExitBook() {
	if(booksearch == 0) {
		var M = {};
		M.dialog1 = jqueryAlert({
			'content': '当前为正常模式',
			'closeTime': 2000,
		});
	} else {
		booksearch = 0;
		booksearchword = "";
		document.getElementById('searchbook').value = "";
		AjaxLoadBookList(1);
		var M = {};
		M.dialog1 = jqueryAlert({
			'content': '已退出搜索模式',
			'closeTime': 2000,
		});
	}
}

// 更新页码
function UpdatePageNum(num) {
	usernowpage = num;
	document.getElementById("bpnum").innerHTML = num;
}

// 解析data
function ParseData(data) {
	var tempItem = [];
	for(var i = 0; i < data.length; i++) {
		tempItem = {
			id: data[i].id,
			bookname: data[i].bookname,
			author: data[i].author,
			img: data[i].img,
			price: data[i].price,
			stock: data[i].stock,
			state: data[i].state,
			checkstate: 0
		};
		booklist.push(tempItem);
		ShowBookList(tempItem.id, tempItem.bookname, tempItem.author,
			tempItem.img, tempItem.price, tempItem.stock, tempItem.state);
	}
}

// 删除数据后，更新当前页
function UpdateAfterDelete() {
	var e;
	var temp;
	if(booksearch == 1) {
		e = AjaxGetBookNumByWord(booksearchword);
		temp = ClcTotalPage(e);
		if(booknowpage > temp)
			AjaxLoadBookWordList(temp, booksearchword);
		else
			AjaxLoadBookWordList(booknowpage, booksearchword);
	} else {
		e = AjaxGetBookNum();
		temp = ClcTotalPage(e);
		if(booknowpage > temp)
			AjaxLoadBookList(temp);
		else
			AjaxLoadBookList(booknowpage);
	}
}

// 加入bookmiss
function AddIntoBookMiss(e) {
	//var s = "《" + e + "》";
	bookmiss.push(e);
}

// 生成图书不存在的错误信息
function BookMissErrorData() {
	var s = "";
	for(var i = 0; i < bookmiss.length; ++i) {
		if(i == 0)
			s = s + "书籍";
		s = s + "《" + bookmiss[i] + "》";
		if(i != bookmiss.length - 1)
			s = s + "、";
	}
	s = s + "不存在";
	return s;
}

// 加入inorders
function AddIntoInOrders(s) {
	//var e = "《" + s + "》";
	inorders.push(s);
}

// 图书在订单中的错误信息
function InOrdersErrorData() {
	var s = "";
	for(var i = 0; i < inorders.length; ++i) {
		if(i == 0)
			s = s + "书籍";
		s = s + "《" + inorders[i] + "》";
		if(i != inorders.length - 1)
			s = s + "、";
	}
	s = s + "在订单中";
	return s;
}

// 更新删除，错误处理
function DeleteBookErrorDeal() {
	var M = {};
	var s = "操作信息：成功" + "<br>";
	if(bookmiss.length != 0 || inorders.length != 0) {
		s = s + "异常信息：" + "";
	}
	if(bookmiss.length != 0) {
		s = s + BookMissErrorData();
	}
	if(inorders.length != 0) {
		s = s + InOrdersErrorData();
	}
	M.dialog6 = jqueryAlert({
		'style': 'pc',
		'title': '提示',
		'content': s,
		'modal': true,
		'contentTextAlign': 'left',
		'width': '300',
		'animateType': 'linear',
		'buttons': {
			'关闭': function() {
				M.dialog6.close();
			},
		}
	})
}

// 检查是否有选中的条目
function CheckBookIsSelect() {
	var m = 0;
	var e = document.getElementsByClassName('mycheckbox');
	for(var i = 0; i < e.length; ++i)
		if(e[i].getAttribute("data-no") != 0 && e[i].checked == true)
			m++;
	if(m == 0) {
		var M = {};
		M.dialog12 = jqueryAlert({
			'icon': 'res/alert/img/error.png',
			'content': '请至少选择一个条目',
			'closeTime': 2000,
		});
	}
	return m;
}

// checkbox复位
function ResetBookCheckBox(myclass) {
	var e = document.getElementsByClassName(myclass);
	for(var i = 0; i < e.length; ++i)
		e[i].checked = false;
}

// 得到图书id
function GetBookId(e) {
	bookid = e.getAttribute("data-no");
	$("#uploadpic").fadeIn();
}
// 选择图片
function SelectPic() {
	// 没有选择图片标志
	picflag = 0;
	return $("#bookpicbox").click();
}

// 打开文件图片
function ShowPic(obj) {
	var file = obj.files[0];
	// 创建文件读取相关的变量
	var imgFile;
	var reader = new FileReader();
	// 为文件读取成功设置事件
	reader.onload = function(e) {
		imgFile = e.target.result;
		$("#showpic").attr('src', imgFile);
		// 选择了图片
		picflag = 1;
	}
	reader.readAsDataURL(file);
}

// 上传
function UploadIt() {
	var e = AjaxUploadPic("bookpicbox");
	if(e == 1 || e == 0) {
		// 成功或失败后更新
		if(booksearch == 1) {
			AjaxLoadBookWordList(booknowpage, booksearchword);
		} else
			AjaxLoadBookList(booknowpage);
	}
	if(e == 1) {
		$("#uploadpic").fadeOut();
		var M = {};
		M.dialog = jqueryAlert({
			'icon': 'res/alert/img/right.png',
			'content': '上传成功',
			'closeTime': 2000,
		});
		//成功后复位
		$("#showpic").attr("src", "img/book/default.png");
	}
	if(e == 0) {
		var M = {};
		M.dialog = jqueryAlert({
			'icon': 'res/alert/img/error.png',
			'content': '上传失败，图书不存在',
			'closeTime': 2000,
		});
	}
	if(e == -1) {
		var M = {};
		M.dialog = jqueryAlert({
			'icon': 'res/alert/img/error.png',
			'content': '请选择图片后上传',
			'closeTime': 2000,
		});
	}
}

//添加图片
function AddSelect() {
	// 没有选择图片标志
	picflag = 0;
	//GetOrClearInput(2);
	return $("#addse").click();
}

//添加书籍里面的添加图片
function AddShowPic(obj) {
	GetOrClearInput(2);
	var file = obj.files[0];
	// 创建文件读取相关的变量
	var imgFile;
	var reader = new FileReader();
	// 为文件读取成功设置事件
	reader.onload = function(e) {
		GetOrClearInput(1);
		imgFile = e.target.result;
		$("#addimg").attr('src', imgFile);
		// 选择了图片
		picflag = 1;
	}
	reader.readAsDataURL(file);
}

//设置、获取或者清除添加输入框的值
function GetOrClearInput(e) {
	if(e == 0) {
		document.getElementById("addname").value = "";
		document.getElementById("addauthor").value = "";
		document.getElementById("addprice").value = "";
		document.getElementById("addstock").value = "";
	}
	if(e == 1) {

	}
	if(e == 2) {
		addname = document.getElementById("addname").value;
		addauthor = document.getElementById("addauthor").value;
		addprice = document.getElementById("addprice").value;
		addstock = document.getElementById("addstock").value;
	}
}

//添加数据
function StartAddBook() {
	//把输入框的值装入变量
	GetOrClearInput(2);
	//输入框是空的或者没有选择图片
	if(CheckInputIsEmpty() == 0 || picflag == 0) {
		var M = {};
		M.dialog = jqueryAlert({
			'icon': 'res/alert/img/error.png',
			'content': '请填写必要的信息并选择图片后上传',
			'closeTime': 2000,
		});
	}
	if(CheckInputIsEmpty() == 1 && picflag == 1) {
		var e = AjaxInsertBook(addname, addauthor, addprice, addstock);
		if(e == -1) {
			var M = {};
			M.dialog = jqueryAlert({
				'icon': 'res/alert/img/error.png',
				'content': '图书已经存在',
				'closeTime': 2000,
			});
		}
		if(e >= 1) {
			bookid = e;
			AjaxUploadPic("addse");
			var M = {};
			M.dialog = jqueryAlert({
				'icon': 'res/alert/img/right.png',
				'content': '添加成功',
				'closeTime': 2000,
			});
			GetOrClearInput(0);
		}
		//添加成功后刷新页面
		if(booksearch == 1) {
			AjaxLoadBookWordList(booknowpage, booksearchword);
		} else
			AjaxLoadBookList(booknowpage);
		//成功后复位
		$("#addimg").attr("src", "img/book/default.png");
	}
}
//检查输入框是否都有值
function CheckInputIsEmpty() {
	if(addname.length == 0)
		return 0;
	if(addauthor.length == 0)
		return 0;
	if(addprice.length == 0)
		return 0;
	if(addstock.length == 0)
		return 0;
	return 1;
}