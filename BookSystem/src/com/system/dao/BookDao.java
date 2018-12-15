package com.system.dao;

import java.util.List;

import com.system.entity.Book;

public interface BookDao {
	// ��ȡ���е���������
	public int getNum();

	// ���������ʻ�ȡ���е���������
	public int getWordNum(String word);

	// ��ȡ����
	public List<Book> findByNum(Integer a, Integer b);

	// �������شʺ�ҳ������ȡ����
	public List<Book> findByNumWord(Integer a, Integer b, String word);

	// ����idɾ��
	public Integer delete(Integer id);

	// ���ͼ���Ƿ����
	public int isBookExist(Integer id);

	// ɾ��
	public void updateState(Integer id, String state);

	// ����ͼ��
	public void updateBook(Integer id, String name, String author, double price, Integer stock);

	// ����ͼ��
	public int insertBook(String bookname, String author, double price, String img, Integer stock,String state);

	// ����ǰ����Ƿ����ͼ��
	public int isAddBookExist(String bookname, String author, double price);

	// ��ȡ����id
	public int getBigId();
}
