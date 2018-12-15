package com.system.service.impl;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.system.dao.UserDao;
import com.system.entity.User;
import com.system.service.UserService;

@Service
public class UserImpl implements UserService {

	@Autowired
	private UserDao userdao;

	// 获取用户列表
	@Override
	public List<User> getUserList(Integer num) {
		List<User> u = null;
		User a = new User();
		int low = (num - 1) * 5;
		int high = 5;
		if (userdao.getUserNum() <= low) {
			u = new ArrayList<User>();
			a.setMessage(0);
			u.add(a);
			return u;
		}
		try {
			System.out.println("3333333");
			u = userdao.getUserList(low, high);
			a.setMessage(1);
			System.out.println("sss");
			for (User m : u) {
				System.out.println(m.getUsername());
			}
			u.add(a);
			return u;

		} catch (Exception e) {
			u = new ArrayList<User>();
			a.setMessage(0);
			u.add(a);
			e.getStackTrace();
			return u;
		}
	}

	// 搜索用户
	@Override
	public User getUser(String word) {
		User u = new User();
		try {
			u = userdao.getUser(word);
			if (u.getUsername() != null)
				u.setMessage(1);
			else
				u.setMessage(0);
		} catch (Exception e) {
			u = new User();
			u.setMessage(0);
			e.getStackTrace();
		}
		return u;
	}

	// 删除用户
	@Override
	public Integer deleteUser(Integer id) {
		try {
			if (userdao.findById(id) != 0)
				userdao.deleteUser(id);
		} catch (Exception e) {
			throw (e);
		}
		return 0;
	}

	// 解锁用户
	@Override
	public Integer unlockUser(Integer id) {
		try {
			if (userdao.findById(id) != 0)
				userdao.unlockUser(id, 0);
		} catch (Exception e) {
			throw (e);
		}
		return 0;
	}

}
