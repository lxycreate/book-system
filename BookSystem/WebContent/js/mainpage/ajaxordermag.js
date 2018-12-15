//获取订单信息
function AjaxLoadOrderList(num) {
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
		url: "getorderlist",
		data: "orderpageNum=" + num,
		dataType: "json",
		success: function(data) {
			if(data[0].message == 0 && num != 1) {
				var M = {};
				M.dialog = jqueryAlert({
					'content': '页码超过界限值',
					'closeTime': 2000,
				});
				return false;
			}
			if(data[0].message == 0 && num == 1) {
				var M = {};
				M.dialog = jqueryAlert({
					'content': '无订单数据',
					'closeTime': 2000,
				});
				return false;
			}
			if(data[0].message == 1) {
				ordersearch = 0;
				UpdateOrderPageNum(num);
				ParseOrderData(data);
			}

		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.error(XMLHttpRequest + textStatus + errorThrown);
		}
	});
}

//搜索订单
function AjaxSearchOrder(word) {
	$.ajax({
		type: "post",
		url: "searchorder",
		data: "order=" + word,
		dataType: "json",
		success: function(data) {
			if(data[0].message == 0) {
				var M = {};
				M.dialog = jqueryAlert({
					'content': '无此订单',
					'closeTime': 2000,
				});
				return false;
			} else {
				ordersearch = 1;
				UpdateOrderPageNum(1);
				ParseOrderData(data);
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.error(XMLHttpRequest + textStatus + errorThrown);
		}
	});
}

//底部搜索
function AjaxBottomSearchOrder(num, state) {
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
		url: "searchorderlist",
		data: "orderpageNum=" + num + "&orderState=" + state,
		dataType: "json",
		success: function(data) {
			if(data[0].message == 0 && num != 1) {
				var M = {};
				M.dialog = jqueryAlert({
					'content': '页码超过界限值',
					'closeTime': 2000,
				});
				return false;
			}
			if(data[0].message == 0 && num == 1) {
				var M = {};
				M.dialog = jqueryAlert({
					'content': '无订单数据',
					'closeTime': 2000,
				});
				return false;
			}
			if(data[0].message == 1) {
				ordersearch = 2;
				selectstate = state;
				UpdateOrderPageNum(num);
				ParseOrderData(data);
			}
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.error(XMLHttpRequest + textStatus + errorThrown);
		}
	});
}

//更新物流
function AjaxUpdateOrder(id, state, logistics) {
	var num;
	$.ajax({
		type: "post",
		url: "updateorder",
		async: false,
		data: "orderid=" + id + "&orderstate=" + state + "&orderlogistics=" + logistics,
		dataType: "json",
		success: function(data) {
			num = data;
		},
		error: function(XMLHttpRequest, textStatus, errorThrown) {
			console.error(XMLHttpRequest + textStatus + errorThrown);
		}
	});
	return num;
}