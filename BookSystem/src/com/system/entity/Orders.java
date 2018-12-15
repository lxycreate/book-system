package com.system.entity;

import java.sql.Timestamp;

public class Orders {
	// 订单id
	private Integer id;
	// 订单号
	private String orders;
	// 用户名
	private String username;
	// 书籍名称
	private String bookname;
	// 总金额
	private double totalprice;
	// 数量
	private Integer num;
	// 创建时间
	private Timestamp createtime;
	// 物流单号
	private String logistics;
	// 订单状态
	private Integer state;
	// 信息
	private Integer message;

	public Orders() {

	}

	public Orders(Integer id, String orders, String username, String bookname, double totalprice, Integer num,
			Timestamp createtime, String logistics, Integer state) {
		this.id = id;
		this.setOrders(orders);
		this.username = username;
		this.bookname = bookname;
		this.totalprice = totalprice;
		this.num = num;
		this.createtime = createtime;
		this.logistics = logistics;
		this.state = state;
	}

	public Integer getId() {
		return id;
	}

	public void setId(Integer id) {
		this.id = id;
	}

	public String getBookname() {
		return bookname;
	}

	public void setBookname(String bookname) {
		this.bookname = bookname;
	}

	public double getTotalprice() {
		return totalprice;
	}

	public void setTotalprice(double totalprice) {
		this.totalprice = totalprice;
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

	public Integer getMessage() {
		return message;
	}

	public void setMessage(Integer message) {
		this.message = message;
	}

	public Integer getNum() {
		return num;
	}

	public void setNum(Integer num) {
		this.num = num;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getOrders() {
		return orders;
	}

	public void setOrders(String orders) {
		this.orders = orders;
	}

}
