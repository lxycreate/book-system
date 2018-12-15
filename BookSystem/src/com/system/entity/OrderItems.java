package com.system.entity;

import java.sql.Timestamp;

public class OrderItems {
	// 订单id
	private Integer id;
	// 订单号
	private String orders;
	// 用户名
	private String username;
	// 书籍名称
	private String bookname;
	// 总金额
	private double price;
	// 数量
	private Integer num;
	// 创建时间
	private Timestamp createtime;
	// 物流单号
	private String logistics;
	// 订单状态
	private Integer state;

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getOrders() {
		return orders;
	}

	public void setOrder(String orders) {
		this.orders = orders;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getBookname() {
		return bookname;
	}

	public void setBookname(String bookname) {
		this.bookname = bookname;
	}

	public double getPrice() {
		return price;
	}

	public void setPrice(double price) {
		this.price = price;
	}

	public Integer getNum() {
		return num;
	}

	public void setNum(Integer num) {
		this.num = num;
	}

	public Timestamp getCreatetime() {
		return createtime;
	}

	public void setCreatetime(Timestamp createtime) {
		this.createtime = createtime;
	}

	public String getLogistics() {
		return logistics;
	}

	public void setLogistics(String logistics) {
		this.logistics = logistics;
	}

	public Integer getState() {
		return state;
	}

	public void setState(Integer state) {
		this.state = state;
	}

}
