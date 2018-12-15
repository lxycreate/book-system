package com.system.dao;

import java.util.List;

import com.system.entity.OrderItems;

public interface OrderItemsDao {

	// 检查书籍是否在订单中
	public int isBookInOrders(Integer id);

	// 获取订单总数
	public int getOrderNum();

	public int getOrderNumByState(Integer state);

	public List<OrderItems> getId(Integer a, Integer b);

	public List<OrderItems> getIdByState(Integer a, Integer b, Integer state);

	public List<OrderItems> getOrderItems(Integer id);

	public int isOrderExist(String word);

	public int getIdByWord(String word);

	public int isOrderExistById(Integer id);

	public void updateOrder(Integer id, Integer state, String word);
}
