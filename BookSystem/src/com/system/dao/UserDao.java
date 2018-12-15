package com.system.dao;

import java.util.List;

import com.system.entity.User;

public interface UserDao {
	public List<User> findAll();

	public User findByName(String name);
    
	public boolean add(User u);
	
	public List<User> getUserList(Integer a,Integer b);
	
	public int getUserNum();
	
	public User getUser(String word);
	
	public void deleteUser(Integer id);
	
	public int findById(Integer id);
	
	public void unlockUser(Integer id,Integer state);
}
