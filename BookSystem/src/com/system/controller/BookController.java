package com.system.controller;

import java.io.File;

import java.io.FileOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.util.List;


import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import com.system.dao.BookDao;
import com.system.entity.Book;
import com.system.service.BookService;

@Controller
public class BookController {
	@Autowired
	private BookService bookService;
	@Autowired
	private BookDao bookDao;

	// ajax��ȡ��Ŀ����
	@RequestMapping(value = "/getbooknum", method = RequestMethod.POST)
	public @ResponseBody Integer getBookNum(@RequestParam("bookNum") String a) {

		return bookService.getBookNum();
	}

	// ajax��������������ȡ��Ŀ����
	@RequestMapping(value = "/getbookwordnum", method = RequestMethod.POST)
	public @ResponseBody Integer getBookWordNum(@RequestParam("bookWordNum") String a) {
		return bookService.getBookWordNum(a);
	}

	// ajax��ȡĳҳ����
	@RequestMapping(value = "/getbooklist", method = RequestMethod.POST)
	public @ResponseBody List<Book> getBookList(@RequestParam("pageNum") Integer a) {
		int low = (a - 1) * 5;
		int high = 5;
		List<Book> book = bookService.findByNum(low, high);
		System.out.println("�ҵ��鼮");
		if (book != null)
			for (Book b : book) {
				System.out.println(b.getState());
			}
		return book;
	}

	// ajax���չؼ��ֻ�ȡĳҳ����
	@RequestMapping(value = "/getbookwordlist", method = RequestMethod.POST)
	public @ResponseBody List<Book> getBookWordList(@RequestParam("pageNewNum") Integer num,
			@RequestParam("word") String word) {
		int low = (num - 1) * 5;
		int high = 5;
		List<Book> book = null;
		if (word.length() != 0)
			book = bookService.findByNumWord(low, high, word);
		else
			book = bookService.findByNum(low, high);
		System.out.println("�ҵ������鼮");
		if (book != null)
			for (Book b : book) {
				System.out.println(b.getState());
			}
		return book;
	}

	// ajaxɾ��
	@RequestMapping(value = "/deletebook", method = RequestMethod.POST)
	public @ResponseBody Integer Delete(@RequestParam("bookId") Integer id) {
		int a = bookService.delete(id);
		return a;
	}

	// ajax�ϼ�ͼ��
	@RequestMapping(value = "/upbook", method = RequestMethod.POST)
	public @ResponseBody Integer upBook(@RequestParam("bookId") Integer id) {
		int a = bookService.upBook(id);
		return a;
	}

	// ajax����
	@RequestMapping(value = "/updatebook", method = RequestMethod.POST)
	public @ResponseBody Integer updateBook(@RequestParam("bookId") Integer id, @RequestParam("bookName") String name,
			@RequestParam("author") String author, @RequestParam("price") double price,
			@RequestParam("stock") Integer stock) {
		int a = bookService.updateBook(id, name, author, price, stock);
		return a;
	}

	// �ϴ�ͼƬ
	@RequestMapping(value = "/upload", method = RequestMethod.POST)
	@ResponseBody
	public Integer uploadFile(@RequestParam("file") MultipartFile myfile, @RequestParam("bookid") Integer bookid) {
		int a = bookDao.isBookExist(bookid);
		String filepath = null;
		String fileName = null;
		if (a == 0)
			return 0;
		else {
			filepath = "D:\\Work\\BookSystem\\WebContent\\img\\book\\" + bookid + "\\";
			// ��ȡ�ļ���
			fileName = myfile.getOriginalFilename();
			try {
				// ���浽����
				savePic(myfile.getInputStream(), myfile.getOriginalFilename(), filepath);
				fixFileName(filepath, fileName, "pic.png");
				return 1;
			} catch (IOException e) {
				e.getStackTrace();
				return 0;
			}
		}
	}

	// ajax��������
	@RequestMapping(value = "/insertbook", method = RequestMethod.POST)
	public @ResponseBody Integer insertBook(@RequestParam("bookName") String bookname, @RequestParam("author") String author,
			@RequestParam("price") double price, @RequestParam("stock") Integer stock) {
		int a = bookService.insertBook(bookname, author, price, stock);
		return a;
	}

	// ����ͼƬ
	private void savePic(InputStream inputStream, String fileName, String path) {

		OutputStream os = null;
		try {
			// 2�����浽��ʱ�ļ�
			// 1K�����ݻ���
			byte[] bs = new byte[1024];
			// ��ȡ�������ݳ���
			int len;
			// ������ļ������浽�����ļ�
			// ���·�������ھ�����
			File tempFile = new File(path);
			if (!tempFile.exists()) {
				tempFile.mkdirs();
			}
			os = new FileOutputStream(tempFile.getPath() + File.separator + fileName);
			// ��ʼ��ȡ
			while ((len = inputStream.read(bs)) != -1) {
				os.write(bs, 0, len);
			}

		} catch (IOException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			// ��ϣ��ر���������
			try {
				os.close();
				inputStream.close();
			} catch (IOException e) {
				e.printStackTrace();
			}
		}
	}

	// �޸��ļ���
	private String fixFileName(String filePath, String oldName, String newName) {
		File f = new File(filePath + oldName);
		File nf = new File(filePath + newName);
		if (f.exists()) {
			try {
				f.renameTo(nf); // �޸��ļ���
			} catch (Exception err) {
				err.printStackTrace();
				return null;
			}
		}
		return newName;
	}
}
