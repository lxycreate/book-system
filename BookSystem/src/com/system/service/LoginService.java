package com.system.service;

import com.system.entity.User;

public interface LoginService {
	// ��¼
	public boolean login(String name, String password);

	// ע��
	public void register(User user);

	// ����û��Ƿ����
	public boolean userIsExist(String name);
}
