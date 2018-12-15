package com.system.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import com.system.bean.UserBean;
import com.system.entity.User;
import com.system.service.LoginService;
import com.system.service.UserService;

//�������û�����ز�������
@Controller
public class UserController {
	@Autowired
	private LoginService loginService;
	@Autowired
	private UserService userService;

	// ajax��¼�ӿ�
	@RequestMapping(value = "/login", method = RequestMethod.POST)
	public @ResponseBody UserBean login(@RequestParam("userName") String username,
			@RequestParam("passWord") String password) {
		UserBean bean = new UserBean();
		try {
			if (loginService.login(username, password)) {
				bean.setName(username);
			} else
				bean.setName("");
		} catch (Exception e) {
			bean.setName("");
			e.printStackTrace();
		}
		return bean;
	}

	// ajaxע��ӿ�
	@RequestMapping(value = "/register", method = RequestMethod.POST)
	public @ResponseBody UserBean register(@RequestParam("userName") String username,
			@RequestParam("passWord") String password, @RequestParam("email") String email) {
		User user = new User();
		user.setUsername(username);
		user.setEmail(email);
		user.setPassword(password);
		UserBean bean = new UserBean();
		try {
			if (!loginService.userIsExist(username)) {
				bean.setCode(1);
				loginService.register(user);
			} else
				bean.setCode(0);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return bean;
	}

	// ��ȡ�û�����
	@RequestMapping(value = "/getuserlist", method = RequestMethod.POST)
	public @ResponseBody List<User> getUserList(@RequestParam("userpageNum") Integer num) {
		return userService.getUserList(num);
	}

	// ��ȡ�û�����
	@RequestMapping(value = "/getuserbyword", method = RequestMethod.POST)
	public @ResponseBody User getUser(@RequestParam("word") String word) {
		return userService.getUser(word);
	}

	// ɾ���û�����
	@RequestMapping(value = "/deleteuser", method = RequestMethod.POST)
	public @ResponseBody Integer deleteUser(@RequestParam("uid") Integer id) {
		int a = userService.deleteUser(id);
		return a;
	}

	//�����û�
	@RequestMapping(value = "/unlockuser", method = RequestMethod.POST)
	public @ResponseBody Integer unlockUser(@RequestParam("uid") Integer id) {
		int a = userService.unlockUser(id);
		return a;
	}

}
