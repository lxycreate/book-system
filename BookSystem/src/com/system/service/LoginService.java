package com.system.service;

import com.system.entity.User;

public interface LoginService {
	// 登录
	public boolean login(String name, String password);

	// 注册
	public void register(User user);

	// 检查用户是否存在
	public boolean userIsExist(String name);
}
