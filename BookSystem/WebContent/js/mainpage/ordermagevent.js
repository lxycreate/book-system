//解析订单数据
function ParseOrderData(data) {
	orderbox.html('');
	orderlist = [];
	var temp = [];
	for(var i = 0; i < data.length; ++i) {
		temp = {
			id: data[i].id,
			orders: data[i].orders,
			username: data[i].username,
			bookname: data[i].bookname,
			totalprice: data[i].totalprice,
			num: data[i].num,
			createtime: data[i].createtime,
			logistics: data[i].logistics,
			state: data[i].state
		}
		orderlist.push(temp);
		ShowOrderList(temp.id, temp.orders, temp.username, temp.bookname, temp.totalprice, temp.num, temp.createtime, temp.logistics, temp.state);
	}
}

//显示OrderList
function ShowOrderList(id, order, username, bookname, totalprice, num, createtime, logistics, state) {
	var e = new Date(createtime);
	var s = "";
	s = s + e.getFullYear() + '-' + e.getMonth() + '-' + e.getDate() + ' ' + e.getHours() + ':';
	if(e.getMinutes() == 0)
		s = s + "00";
	else
		s = s + e.getMinutes();
	if(logistics.length == 0)
		logistics = "无";
	var t;
	if(state == 1)
		t = "未发货";
	if(state == 2)
		t = "已发货";
	if(state == 3)
		t = "已完成";
	var html = '<div class="order-item" data-no="' + id + '">' +
		'<span class="thetext order" data-no="' + id + '">' + order + '</span>' +
		'<span class="thetext buyer" data-no="' + id + '">' + username + '</span>' +
		'<span class="thetext thebookname" data-no="' + id + '">' + bookname + '</span>' +
		'<span class="thetext totalprice" data-no="' + id + '">' + totalprice + '</span>' +
		'<span class="thetext thenum" data-no="' + id + '">' + num + '</span>' +
		'<span class="thetext createtime" data-no="' + id + '">' + s + '</span>' +
		'<span class="thetext logistics" ondblclick="UpdateOrder(this)"data-no="' + id + '">' + logistics + '</span>' +
		'<span class="thetext thestate" data-no="' + id + '">' + t + '</span>' +
		'</div>';
	orderbox.append(html);
	//alert(s);
	//alert(id + username + bookname + totalprice + num + +" " + createtime + " " + logistics + state);
}

//更新页码
function UpdateOrderPageNum(num) {
	ordernowpage = num;
	document.getElementById("opnum").innerHTML = num;
}