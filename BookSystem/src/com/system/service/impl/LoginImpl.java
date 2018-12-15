package com.system.service.impl;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.system.dao.UserDao;
import com.system.entity.User;
import com.system.service.LoginService;

@Service
public class LoginImpl implements LoginService {

	@Autowired
	private UserDao userDao;

	// 登录
	@Override
	public boolean login(String name, String password) {
		User u;
		try {
			u = userDao.findByName(name);
			String nametemp = u.getUsername();
			String psdtemp = u.getPassword();
			if (name.equals(nametemp) && password.equals(psdtemp))
				return true;
			else
				return false;
		} catch (Exception e) {
			return false;
		}
		
	}

	// 注册
	@Override
	public void register(User user) {
		try {
			userDao.add(user);
		} catch (Exception e) {
			throw (e);
		}
	}

	// 检查是否存在用户
	@Override
	public boolean userIsExist(String name) {
		try {
			User u = userDao.findByName(name);
			if (u != null)
				return true;
			else
				return false;
		} catch (Exception e) {
			throw (e);
		}
	}

}
