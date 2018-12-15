package com.system.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.system.dao.BookDao;
import com.system.dao.OrderItemsDao;
import com.system.entity.Book;
import com.system.service.BookService;

@Service
public class BookImpl implements BookService {

	@Autowired
	private BookDao bookdao;
	@Autowired
	private OrderItemsDao orderitemsdao;

	// ������ģʽ�»�ȡ������Ŀ����
	@Override
	public Integer getBookNum() {
		Integer a = 0;
		try {
			a = bookdao.getNum();
		} catch (Exception e) {
			a = 0;
			throw (e);
		}
		return a;
	}

	// ���������ʻ�ȡ��Ŀ����
	@Override
	public Integer getBookWordNum(String word) {
		Integer a = 0;
		try {
			a = bookdao.getWordNum(word);
		} catch (Exception e) {
			a = 0;
			throw (e);
		}
		return a;
	}

	// ��ȡĳҳ����
	@Override
	public List<Book> findByNum(Integer a, Integer b) {
		List<Book> book = null;
		try {
			book = bookdao.findByNum(a, b);
		} catch (Exception e) {
			book = null;
			throw (e);
		}
		return book;
	}

	// ���������ʻ�ȡ�ڼ�ҳ������
	@Override
	public List<Book> findByNumWord(Integer a, Integer b, String word) {
		List<Book> book = null;
		try {
			book = bookdao.findByNumWord(a, b, word);
		} catch (Exception e) {
			book = null;
			throw (e);
		}
		return book;
	}

	// ɾ��
	@Override
	public Integer delete(Integer id) {
		int a, b;
		try {
			a = bookdao.isBookExist(id);
		} catch (Exception e) {
			a = 0;
			throw (e);
		}
		try {
			b = orderitemsdao.isBookInOrders(id);
		} catch (Exception e) {
			b = 0;
		}
		if (a != 0 && b == 0) {
			int m = 1;
			System.out.println("����");
			try {
				bookdao.updateState(id, "�¼�");
			} catch (Exception e) {
				m = 0;
				throw (e);
			}
			return m;
		}
		// ͼ�鲻����
		if (a == 0)
			return 0;
		// ͼ���ڶ�����
		return -1;
	}

	// �ϼ�

	@Override
	public Integer upBook(Integer id) {
		int a;
		try {
			a = bookdao.isBookExist(id);
		} catch (Exception e) {
			a = 0;
			throw (e);
		}
		if (a != 0) {
			bookdao.updateState(id, "����");
			return 1;
		}
		return 0;
	}

	// ����ͼ��
	@Override
	public Integer updateBook(Integer id, String name, String author, double price, Integer stock) {
		int a = 1, b = 0;
		try {
			a = bookdao.isBookExist(id);
		} catch (Exception e) {
			a = 0;
			throw (e);
		}
		try {
			if (a != 0) {

				b = 1;
				bookdao.updateBook(id, name, author, price, stock);
			}
		} catch (Exception e) {
			b = 0;
			throw (e);
		}
		return b;
	}

	// �����鼮
	@Override
	public Integer insertBook(String bookname, String author, double price, Integer stock) {
		int a = 0, b = 0;
		try {
			a = bookdao.isAddBookExist(bookname, author, price);
			// -1�����Ѿ�����
			if (a != 0)
				return -1;
			b = bookdao.getBigId();
			// ��ȡ����id
			System.out.println("����b" + b);
			int c = b + 1;
			bookdao.insertBook(bookname, author, price, "img/book/" + c + "/pic.png", stock, "����");
			return b + 1;
		} catch (Exception e) {
			a = 0;
			throw (e);
		}
	}

}
