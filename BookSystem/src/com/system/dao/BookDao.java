package com.system.dao;

import java.util.List;

import com.system.entity.Book;

public interface BookDao {
	// 获取表中的数据总数
	public int getNum();

	// 按照搜索词获取表中的数据总数
	public int getWordNum(String word);

	// 获取数据
	public List<Book> findByNum(Integer a, Integer b);

	// 按照搜素词和页码数获取数据
	public List<Book> findByNumWord(Integer a, Integer b, String word);

	// 按照id删除
	public Integer delete(Integer id);

	// 检查图书是否存在
	public int isBookExist(Integer id);

	// 删除
	public void updateState(Integer id, String state);

	// 更新图书
	public void updateBook(Integer id, String name, String author, double price, Integer stock);

	// 插入图书
	public int insertBook(String bookname, String author, double price, String img, Integer stock,String state);

	// 插入前检查是否存在图书
	public int isAddBookExist(String bookname, String author, double price);

	// 获取最大的id
	public int getBigId();
}
