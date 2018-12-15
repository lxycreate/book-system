//用于储存书籍数据
var booklist = [];

//用于实例化名为bookbox的div
var bookbox;

//当前页面
var booknowpage;

//书籍搜索词
var booksearchword;

//搜索标志,0代表正常模式
var booksearch;

//操作时图书不存在，将其加入此表
var bookmiss = [];

//操作时图书在订单中，加入此表
var inorders = [];

//记录上传图片的图书的id
var bookid;

//选择图片标志
var picflag = 0;
//初始化
function InitBookMag() {
	//初始化变量
	InitBookItems();
	//左部三个按钮的单击事件
	ClickChangePage();
	ShowAndHide("bookmag", "usermag", "ordermag", "book", "user", "orders");
	//加载第一页数据	
	AjaxLoadBookList(1);
	//单击弹窗外的地方隐藏弹窗
	HideWindow();
}
//初始化图书管理相关
function InitBookItems() {
	bookbox = $("#bookbox");
	booknowpage = 1;
	booksearch = 0;
	booksearchword = "";
	//清空搜索词
	document.getElementById('searchbook').value = "";
	//checkbox复位
	ResetBookCheckBox('mycheckbox');
}
//页面切换
function ClickChangePage() {
	$("#bookmag").click(function() {
		ShowAndHide("bookmag", "usermag", "ordermag", "book", "user", "orders");
		InitBookItems();
		AjaxLoadBookList(1);
	});
	$("#usermag").click(function() {
		ShowAndHide("usermag", "bookmag", "ordermag", "user", "book", "orders");
		InitUserItems();
		AjaxLoadUserList(1);
	});
	$("#ordermag").click(function() {
		ShowAndHide("ordermag", "usermag", "bookmag", "orders", "user", "book");
		InitOrderItems();
		AjaxLoadOrderList(1)
	});
}
//页面切换
function ShowAndHide(showid, hideid, hide2, showbox, hidebox, hidebox2) {
	document.getElementById(showid).style.backgroundColor = '#5496cd';
	document.getElementById(hideid).style.backgroundColor = 'steelblue';
	document.getElementById(hide2).style.backgroundColor = 'steelblue';
	$("#" + showbox).show();
	$("#" + hidebox).hide();
	$("#" + hidebox2).hide();
}

//计算页面总数
function ClcTotalPage(num) {
	var e = num;
	totalpage = e / 5;
	if(e % 5 > 0)
		totalpage++;
	return parseInt(totalpage);
}

//显示书籍列表
function ShowBookList(id, bookname, author, img, price, stock, state) {
	var html = '<div id="item' + id + '"' + 'class="list-item" data-no="' + id + '">' +
		'    <input class="mycheckbox" type="checkbox" onclick = "ChangeSelectState(this)" data-no="' + id + '">' + '</input>' +
		'    <span class="mytxt bookname listtxt" ondblclick="ShowElement(this)" data-no="' + id + '">' + bookname + '</span>' +
		'    <span class="mytxt author listtxt" ondblclick="ShowElement(this)" data-no="' + id + '">' + author + '</span>' +
		'    <div class="mytxt img">' +
		'         <img src="' + img + '"width="50px" height="60px" ondblclick="GetBookId(this)" data-no="' + id + '">' + '</img>' +
		'    </div> ' +
		'    <span class="mytxt price listtxt" ondblclick="ShowElement(this)" data-no="' + id + '">' + price + '</span>' +
		'    <span class="mytxt stock listtxt" ondblclick="ShowElement(this)" data-no="' + id + '">' + stock + '</span>' +
		'    <span class="mytxt state listtxt"  data-no="' + id + '">' + state + '</span>' +
		'</div>';
	bookbox.append(html);
}

//双击编辑模式
function ShowElement(element) {
	var oldhtml = element.innerHTML;
	var newobj = document.createElement('input');
	newobj.style.width = "80px";
	newobj.style.paddingLeft = "5px";
	//创建新的input元素
	newobj.type = 'text';
	//为新增元素添加类型
	newobj.onblur = function() {
		//当触发时判断新增元素值是否为空，为空则不修改，并返回原有值 
		element.innerHTML = this.value ? this.value : oldhtml;
		var e = $(element).attr('class').split(" ");
		var ee = element.getAttribute("data-no");

		//更新数据表中的数据
		UpdateBookList(ee, e[1], element.innerHTML);

		//把checkbox的状态改变为选中
		ChangeCheckBox(ee, 1, 0);

		//删除输入框
		element.removeChild(newobj);
		newobj = undefined;
	}
	element.innerHTML = '';
	element.appendChild(newobj);
	newobj.focus();
}

//编辑后更新booklist中的数据
function UpdateBookList(id, name, value) {
	//alert('111');
	if(booklist.length > 0)
		for(var i = 0; i < booklist.length; ++i)
			if(booklist[i].id == id) {
				booklist[i][name] = value;
				//alert(booklist[i][name]);
			}
}

//checkbox单击事件
function ChangeSelectState(e) {
	var id = e.getAttribute("data-no");
	if(id > 0)
		if(e.checked == true)
			ChangeCheckBox(id, 1, 1);
		else
			ChangeCheckBox(id, 0, 1);
	//全选或全不选框
	if(id == 0) {
		if(e.checked == true) {
			for(var i = 0; i < booklist.length; ++i) {
				ChangeCheckBox(booklist[i].id, 1, 0);
			}
		} else {
			for(var i = 0; i < booklist.length; ++i) {
				ChangeCheckBox(booklist[i].id, 0, 0);
			}
		}
	}
}
//改变checkbox的状态,flag解决checkbox单击事件冲突导致状态无变化(解决单击全选的那个bug)
function ChangeCheckBox(id, state, flag) {
	var e = document.getElementsByClassName("mycheckbox");
	var t;
	for(var i = 0; i < e.length; ++i) {
		if(e[i].getAttribute("data-no") == id && state == 1) {
			if(flag == 0)
				e[i].checked = true;
			//把存储书籍数据的表中对应的数据状态改变
			//更新时根据这个标志进行更新操作
			booklist[i - 1].checkstate = 1;
			t = i - 1;
		}
		if(e[i].getAttribute("data-no") == id && state == 0) {
			if(flag == 0)
				e[i].checked = false;
			//把存储书籍数据的表中对应的数据状态改变
			//更新时根据这个标志进行更新操作
			booklist[i - 1].checkstate = 0;
			t = i - 1;
		}
	}
}
//搜索书籍
function SearchTheBook() {

	AjaxLoadBookWordList(1, document.getElementById('searchbook').value);
	//form提交必须要return false,否则出错
	return false;
}

//单击弹窗外的地方隐藏弹窗
function HideWindow() {
	document.addEventListener("click", function(e) {
		// 判断被点击的元素是不是scheduleInput元素，不是的话，就隐藏之
		var m = e.target.className;
		var s = m.split(' ');
		var t;
		if(s.length > 1)
			t = s[1];
		else
			t = s[0];

		if(t == "nohide") {
			$("#addbox").fadeOut();
		}
		if(t == "adhide") {
			$("#uploadpic").fadeOut();
		}
		if(t != "nohide" && t != "adhide" && e.target != document.getElementById('addbook')) {
			$("#addbox").fadeOut();
			$("#uploadpic").fadeOut();
		}
	});
}