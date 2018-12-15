//存储订单条目
var orderlist = [];

//模式标志，0代表正常模式，1代表搜索框搜索模式，2代表查询模式
var ordersearch;

//当前页面页码
var ordernowpage;

//用于实例化名为orderbox的div
var orderbox;

//底部搜索的标志 ，0是正常模式，1是未发货，2是已发货，3已完成
var selectstate;
//初始化
function InitOrderMag() {
	InitOrderItems();
	InitScrollBar();
	AjaxLoadOrderList(1);
}

//初始化订单管理相关
function InitOrderItems() {
	selectstate = 0;
	ordersearch = 0;
	ordernowpage = 1;
	orderlist = [];
	orderbox = $("#orderbox");
	document.getElementById("searchorder").value = "";
	orderbox.html('');
}

//为订单列表加载滚动条
function InitScrollBar() {
	$("#orderbox").niceScroll({
		cursorcolor: "#3a6089", //滚动条的颜色   
		cursoropacitymax: 0.8, //滚动条的透明度，从0-1   
		touchbehavior: false, //使光标拖动滚动像在台式电脑触摸设备   
		cursorwidth: "4px", //滚动条的宽度   
		cursorborder: "0", // 游标边框css定义    
		cursorborderradius: "1px", //以像素为光标边界半径  圆角   
		autohidemode: true, //是否隐藏滚动条  true的时候默认不显示滚动条，当鼠标经过的时候显示滚动条   
		zindex: "auto", //给滚动条设置z-index值    
		railpadding: {
			top: 0,
			right: 0,
			left: 0,
			bottom: 0
		}, //滚动条的位置
	});
}

//搜索订单
function SearchOrder() {
	if(document.getElementById('searchorder').value.length == 0) {
		usersearch = 0;
		AjaxLoadOrderList(1);
	} else
		AjaxSearchOrder(document.getElementById('searchorder').value);
	return false;
}
//上一页
function OPPage() {
	if(ordersearch == 1) {
		var M = {};
		M.dialog = jqueryAlert({
			'content': '页码超过界限值',
			'closeTime': 2000,
		});
	}
	if(ordersearch == 0)
		AjaxLoadOrderList(ordernowpage - 1);
	if(ordersearch == 2) {
		AjaxBottomSearchOrder(ordernowpage - 1, selectstate);
	}
}

//下一页
function ONPage() {
	if(ordersearch == 1) {
		var M = {};
		M.dialog = jqueryAlert({
			'content': '页码超过界限值',
			'closeTime': 2000,
		});
	}
	if(ordersearch == 0)
		AjaxLoadOrderList(ordernowpage + 1);
	if(ordersearch == 2) {
		AjaxBottomSearchOrder(ordernowpage + 1, selectstate);
	}
}
//搜索按钮
function SelectTheOrder() {
	var e = document.getElementById('theselect').value;
	if(e == "all") {
		usersearch = 0;
		AjaxLoadOrderList(1);
	}
	if(e == "no")
		AjaxBottomSearchOrder(1, 1);
	if(e == "yes") {
		AjaxBottomSearchOrder(1, 2);
	}
	if(e == "finish")
		AjaxBottomSearchOrder(1, 3);
}

//退出搜索
function ExitSearchOrder() {
	if(ordersearch == 0) {
		var M = {};
		M.dialog1 = jqueryAlert({
			'content': '当前为正常模式',
			'closeTime': 2000,
		});
	} else {
		ordersearch = 0;
		booksearchword = "";
		document.getElementById('searchorder').value = "";
		AjaxLoadOrderList(1);
		var M = {};
		M.dialog1 = jqueryAlert({
			'content': '已退出搜索模式',
			'closeTime': 2000,
		});
	}
}

//更新物流
function UpdateOrder(element) {
	var e = document.getElementsByClassName('logistics');
	var number = element.getAttribute("data-no");
	var num;
	for(var i = 0; i < e.length; ++i) {
		if(e[i].getAttribute("data-no") == number) {
			num = i;
			break;
		}
	}
	if(orderlist[num - 1].state == 3) {
		var M = {};
		M.dialog1 = jqueryAlert({
			'content': '订单已完成不能修改物流信息',
			'closeTime': 2000,
		});
		return false;
	}
	var oldhtml = element.innerHTML;
	var newobj = document.createElement('input');
	newobj.style.width = "80px";
	newobj.style.paddingLeft = "5px";
	//创建新的input元素
	newobj.type = 'text';
	newobj.onblur = function() {
		//当触发时判断新增元素值是否为空，为空则不修改，并返回原有值 
		if(this.value.length != 6) {
			var M = {};
			M.dialog1 = jqueryAlert({
				'content': '物流单号为6位',
				'closeTime': 2000,
			});
			element.innerHTML = oldhtml;
		} else {
			var x = AjaxUpdateOrder(number, 2, this.value);
			if(x == 0) {
				var M = {};
				M.dialog1 = jqueryAlert({
					'content': '订单不存在',
					'closeTime': 2000,
				});
			} else {
				orderlist[num - 1].logistics = this.value;
				orderlist[num - 1].state = 2;
				e[num].innerHTML = this.value;
				var t = document.getElementsByClassName('thestate');
				t[num].innerHTML = "已发货";
				var M = {};
				M.dialog1 = jqueryAlert({
					'content': '发货成功',
					'closeTime': 2000,
				});
			}
		}
		//删除输入框
		element.removeChild(newobj);
		newobj = undefined;
	}
	element.innerHTML = '';
	element.appendChild(newobj);
	newobj.focus();
}