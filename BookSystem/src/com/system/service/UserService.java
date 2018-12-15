package com.system.service;

import java.util.List;

import com.system.entity.User;

public interface UserService {
	
	public List<User> getUserList(Integer num);

	public User getUser(String word);
	
	public Integer deleteUser(Integer id);
	
	public Integer unlockUser(Integer id);
}
