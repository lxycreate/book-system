package com.system.service;

import java.util.List;

import com.system.entity.Book;

public interface BookService {

	public Integer getBookNum();
	
	public Integer getBookWordNum(String word);

	public List<Book> findByNum(Integer a,Integer b);
	
	public List<Book> findByNumWord(Integer a,Integer b,String word);
	
	public Integer delete(Integer id);
	
	public Integer upBook(Integer id);
	
	public Integer updateBook(Integer id,String name,String author,double price,Integer stock);
	
	public Integer insertBook(String bookname, String author, double price, Integer stock);
}
