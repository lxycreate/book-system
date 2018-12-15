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

	// ��¼
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

	// ע��
	@Override
	public void register(User user) {
		try {
			userDao.add(user);
		} catch (Exception e) {
			throw (e);
		}
	}

	// ����Ƿ�����û�
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
