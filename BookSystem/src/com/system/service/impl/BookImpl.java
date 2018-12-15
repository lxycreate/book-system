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

	// 非搜索模式下获取数据条目总数
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

	// 按照搜索词获取条目总数
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

	// 获取某页数据
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

	// 按照搜索词获取第几页的数据
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

	// 删除
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
			System.out.println("离线");
			try {
				bookdao.updateState(id, "下架");
			} catch (Exception e) {
				m = 0;
				throw (e);
			}
			return m;
		}
		// 图书不存在
		if (a == 0)
			return 0;
		// 图书在订单中
		return -1;
	}

	// 上架

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
			bookdao.updateState(id, "正常");
			return 1;
		}
		return 0;
	}

	// 更新图书
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

	// 插入书籍
	@Override
	public Integer insertBook(String bookname, String author, double price, Integer stock) {
		int a = 0, b = 0;
		try {
			a = bookdao.isAddBookExist(bookname, author, price);
			// -1代表已经存在
			if (a != 0)
				return -1;
			b = bookdao.getBigId();
			// 获取最大的id
			System.out.println("最大的b" + b);
			int c = b + 1;
			bookdao.insertBook(bookname, author, price, "img/book/" + c + "/pic.png", stock, "正常");
			return b + 1;
		} catch (Exception e) {
			a = 0;
			throw (e);
		}
	}

}
