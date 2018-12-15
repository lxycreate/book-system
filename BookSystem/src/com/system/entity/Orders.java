package com.system.entity;

import java.sql.Timestamp;

public class Orders {
	// ����id
	private Integer id;
	// ������
	private String orders;
	// �û���
	private String username;
	// �鼮����
	private String bookname;
	// �ܽ��
	private double totalprice;
	// ����
	private Integer num;
	// ����ʱ��
	private Timestamp createtime;
	// ��������
	private String logistics;
	// ����״̬
	private Integer state;
	// ��Ϣ
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
