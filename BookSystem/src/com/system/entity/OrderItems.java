package com.system.entity;

import java.sql.Timestamp;

public class OrderItems {
	// ����id
	private Integer id;
	// ������
	private String orders;
	// �û���
	private String username;
	// �鼮����
	private String bookname;
	// �ܽ��
	private double price;
	// ����
	private Integer num;
	// ����ʱ��
	private Timestamp createtime;
	// ��������
	private String logistics;
	// ����״̬
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
