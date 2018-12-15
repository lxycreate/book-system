package com.system.service;

import java.util.List;

import com.system.entity.Orders;

public interface OrderItemsService {
	// ͼ���Ƿ��ڶ�����
	public int isBookInOrders(Integer id);

	// ��ȡ�����б�
	public List<Orders> getOrderList(Integer num);

	public Integer getId(Integer a, Integer b);
	
	public List<Orders> searchOrder(String word);
	
	public List<Orders> searchOrderList(Integer num,Integer state);
	
	public Integer updateOrders(Integer id,Integer state,String logistics);
}
