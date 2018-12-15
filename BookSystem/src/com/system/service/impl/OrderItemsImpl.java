package com.system.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.system.dao.OrderItemsDao;
import com.system.entity.OrderItems;
import com.system.entity.Orders;
import com.system.service.OrderItemsService;

@Service
public class OrderItemsImpl implements OrderItemsService {
	@Autowired
	private OrderItemsDao orderitemsdao;

	// 检查图书是否在订单中
	@Override
	public int isBookInOrders(Integer id) {
		return orderitemsdao.isBookInOrders(id);
	}

	// 获取订单数据
	@Override
	public List<Orders> getOrderList(Integer num) {
		Orders a = new Orders();
		List<Orders> temp = new ArrayList<Orders>();
		int low = (num - 1) * 5;
		try {
			for (int i = 0; i < 5; ++i) {
				if (low >= orderitemsdao.getOrderNum()) {
					if (low == (num - 1) * 5) {
						a.setMessage(0);
						temp.add(a);
					}
					break;
				} else {
					int id = getId(low, 1);
					List<OrderItems> c = orderitemsdao.getOrderItems(id);
					makeOrder(c, temp);
				}
				low++;
			}
		} catch (Exception e) {
			throw (e);
		}
		return temp;
	}

	// 获得第a+1条的id
	@Override
	public Integer getId(Integer a, Integer b) {
		try {
			int num = orderitemsdao.getOrderNum();
			if (a >= num)
				return 0;
			else {
				List<OrderItems> m = orderitemsdao.getId(a, b);
				return m.get(0).getId();
			}
		} catch (Exception e) {
			throw (e);
		}
	}

	// 把List<OrderItems>转换为List<Orders>
	public void makeOrder(List<OrderItems> a, List<Orders> b) {

		if (a.size() == 1) {
			OrderItems c = a.get(0);
			String logistics = null;
			if (c.getLogistics() != null)
				logistics = c.getLogistics();
			else
				logistics = "";
			Orders m = new Orders(c.getId(), c.getOrders(), c.getUsername(), c.getBookname(), c.getPrice() * c.getNum(),
					c.getNum(), c.getCreatetime(), logistics, c.getState());
			m.setMessage(1);
			b.add(m);

		} else {
			int num = 0;
			double totalprice = 0;
			for (OrderItems t : a) {
				num += t.getNum();
				totalprice += t.getPrice() * t.getNum();
			}
			OrderItems c = a.get(0);
			String logistics = null;
			if (c.getLogistics() != null)
				logistics = c.getLogistics();
			else
				logistics = "";
			Orders m = new Orders(c.getId(), c.getOrders(), c.getUsername(), "多名称", totalprice, num, c.getCreatetime(),
					logistics, c.getState());
			m.setMessage(1);
			b.add(m);
			for (OrderItems t : a) {
				String s = null;
				if (t.getLogistics() != null)
					s = t.getLogistics();
				else
					s = "";
				Orders temp = new Orders(t.getId(), "", t.getUsername(), t.getBookname(), t.getPrice() * t.getNum(),
						t.getNum(), t.getCreatetime(), s, t.getState());
				temp.setMessage(1);
				b.add(temp);
			}
		}
	}

	// 搜索订单
	@Override
	public List<Orders> searchOrder(String word) {
		List<Orders> temp = new ArrayList<Orders>();
		Orders a = new Orders();
		if (orderitemsdao.isOrderExist(word) == 0) {
			a.setMessage(0);
			temp.add(a);
			return temp;
		} else {
			try {
				int m = orderitemsdao.getIdByWord(word);
				List<OrderItems> c = orderitemsdao.getOrderItems(m);
				makeOrder(c, temp);
				return temp;
			} catch (Exception e) {
				throw (e);
			}
		}
	}

	// 按照未发货、已发货、已完成搜索订单
	@Override
	public List<Orders> searchOrderList(Integer num, Integer state) {
		Orders a = new Orders();
		List<Orders> temp = new ArrayList<Orders>();
		int low = (num - 1) * 5;
		try {
			for (int i = 0; i < 5; ++i) {
				if (low >= orderitemsdao.getOrderNumByState(state)) {
					if (low == (num - 1) * 5) {
						a.setMessage(0);
						temp.add(a);
					}
					break;
				} else {
					int id = getIdByState(low, 1, state);
					List<OrderItems> c = orderitemsdao.getOrderItems(id);
					makeOrder(c, temp);
				}
				low++;
			}
		} catch (Exception e) {
			throw (e);
		}
		return temp;
	}

	// 获取某状态的第几条订单的id
	public Integer getIdByState(Integer a, Integer b, Integer state) {
		try {
			int num = orderitemsdao.getOrderNumByState(state);
			if (a >= num)
				return 0;
			else {
				List<OrderItems> m = orderitemsdao.getIdByState(a, b, state);
				return m.get(0).getId();
			}
		} catch (Exception e) {
			throw (e);
		}
	}

	// 更新
	@Override
	public Integer updateOrders(Integer id, Integer state, String logistics) {
		if (orderitemsdao.isOrderExistById(id) == 0)
			return 0;
		try {
			orderitemsdao.updateOrder(id, state, logistics);
			return 1;
		} catch (Exception e) {
			e.getStackTrace();
            return 0;
		}
	}
}
