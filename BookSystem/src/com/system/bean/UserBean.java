package com.system.bean;

public class UserBean {
	private Integer code;
	private String message;
	// 储存用户名，如果不成功存""，前端根据其内容做出相应的提示
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
