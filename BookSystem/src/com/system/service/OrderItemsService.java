package com.system.service;

import java.util.List;

import com.system.entity.Orders;

public interface OrderItemsService {
	// 图书是否在订单中
	public int isBookInOrders(Integer id);

	// 获取订单列表
	public List<Orders> getOrderList(Integer num);

	public Integer getId(Integer a, Integer b);
	
	public List<Orders> searchOrder(String word);
	
	public List<Orders> searchOrderList(Integer num,Integer state);
	
	public Integer updateOrders(Integer id,Integer state,String logistics);
}
