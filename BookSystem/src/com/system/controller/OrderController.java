package com.system.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.system.entity.Orders;
import com.system.service.OrderItemsService;

@Controller
public class OrderController {
	@Autowired
	private OrderItemsService orderitemsservice;

	// ajax����鼮�Ƿ��ڶ�����
	@RequestMapping(value = "/isbook", method = RequestMethod.POST)
	public @ResponseBody Integer isBookExist(@RequestParam("bookId") Integer a) {
		return orderitemsservice.isBookInOrders(a);
	}

	// ajax��ȡ����
	@RequestMapping(value = "/getorderlist", method = RequestMethod.POST)
	public @ResponseBody List<Orders> getOrder(@RequestParam("orderpageNum") Integer number) {
		return orderitemsservice.getOrderList(number);
	}

	// ��������
	@RequestMapping(value = "/searchorder", method = RequestMethod.POST)
	public @ResponseBody List<Orders> searchOrder(@RequestParam("order") String word) {
		return orderitemsservice.searchOrder(word);
	}

	// ����δ�������ѷ������������������
	@RequestMapping(value = "/searchorderlist", method = RequestMethod.POST)
	public @ResponseBody List<Orders> searchOrderList(@RequestParam("orderpageNum") Integer num,
			@RequestParam("orderState") Integer state) {
		return orderitemsservice.searchOrderList(num, state);
	}

	// ������������
	@RequestMapping(value = "/updateorder", method = RequestMethod.POST)
	public @ResponseBody Integer updateOrder(@RequestParam("orderid") Integer id, @RequestParam("orderstate") Integer state,
			@RequestParam("orderlogistics") String logistics) {
		System.out.println(id+state+logistics+"1212");
		return orderitemsservice.updateOrders(id, state, logistics);
	}

}
