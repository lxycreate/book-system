package com.system.bean;

public class UserBean {
	private Integer code;
	private String message;
	// �����û�����������ɹ���""��ǰ�˸���������������Ӧ����ʾ
	private String name;

	public void setName(String name) {
		this.name = name;
	}

	public String getName() {
		return name;
	}

	public void setCode(Integer code) {
		this.code = code;
	}

	public Integer getCode() {
		return code;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getMessage() {
		return message;
	}

}
