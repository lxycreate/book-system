/*
Navicat MySQL Data Transfer

Source Server         : localhost_3306
Source Server Version : 50625
Source Host           : localhost:3306
Source Database       : booksystem

Target Server Type    : MYSQL
Target Server Version : 50625
File Encoding         : 65001

Date: 2018-07-23 09:42:55
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `book`
-- ----------------------------
DROP TABLE IF EXISTS `book`;
CREATE TABLE `book` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `bookname` varchar(255) DEFAULT NULL,
  `author` varchar(255) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `price` double DEFAULT NULL,
  `stock` int(11) DEFAULT NULL,
  `state` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=15 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of book
-- ----------------------------
INSERT INTO `book` VALUES ('1', '江南', '林俊杰', 'img/book/1/pic.png', '10', '10', '正常');
INSERT INTO `book` VALUES ('2', '初学者', '薛之谦', 'img/book/2/pic.png', '20', '20', '正常');
INSERT INTO `book` VALUES ('3', '因为爱情', '王菲', 'img/book/3/pic.png', '30', '30', '正常');
INSERT INTO `book` VALUES ('4', '天后', '陈势安', 'img/book/4/pic.png', '40', '40', '正常');
INSERT INTO `book` VALUES ('5', '远走高飞', '金志文', 'img/book/5/pic.png', '40', '40', '正常');
INSERT INTO `book` VALUES ('6', '潮流季', '薛之谦', 'img/book/6/pic.png', '50', '50', '正常');
INSERT INTO `book` VALUES ('7', '我的歌声里', '曲婉婷', 'img/book/7/pic.png', '60', '60', '正常');
INSERT INTO `book` VALUES ('8', '停止跳动', '汪苏泷', 'img/book/8/pic.png', '50', '50', '正常');
INSERT INTO `book` VALUES ('9', '晴天', '周杰伦', 'img/book/9/pic.png', '40', '40', '正常');
INSERT INTO `book` VALUES ('10', '我的大学', '萧敬腾', 'img/book/10/pic.png', '30', '30', '正常');
INSERT INTO `book` VALUES ('11', '平凡之路', '朴树', 'img/book/11/pic.png', '40', '40', '正常');
INSERT INTO `book` VALUES ('12', '等你下课', '周杰伦', 'img/book/12/pic.png', '40', '30', '正常');
INSERT INTO `book` VALUES ('13', '我的测试', '我的测试', 'img/book/13/pic.png', '20', '20', '正常');
INSERT INTO `book` VALUES ('14', '测试', '测试', 'img/book/14/pic.png', '1', '1', '正常');

-- ----------------------------
-- Table structure for `orderitems`
-- ----------------------------
DROP TABLE IF EXISTS `orderitems`;
CREATE TABLE `orderitems` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `orderid` int(11) DEFAULT NULL,
  `bookid` int(11) DEFAULT NULL,
  `num` int(11) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `forderid` (`orderid`),
  KEY `fbookid` (`bookid`),
  CONSTRAINT `fbookid` FOREIGN KEY (`bookid`) REFERENCES `book` (`id`),
  CONSTRAINT `forderid` FOREIGN KEY (`orderid`) REFERENCES `orders` (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=9 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of orderitems
-- ----------------------------
INSERT INTO `orderitems` VALUES ('1', '1', '1', '1');
INSERT INTO `orderitems` VALUES ('2', '2', '2', '2');
INSERT INTO `orderitems` VALUES ('3', '3', '3', '3');
INSERT INTO `orderitems` VALUES ('4', '4', '4', '4');
INSERT INTO `orderitems` VALUES ('5', '4', '5', '5');
INSERT INTO `orderitems` VALUES ('6', '5', '5', '6');
INSERT INTO `orderitems` VALUES ('7', '6', '5', '7');
INSERT INTO `orderitems` VALUES ('8', '7', '6', '8');

-- ----------------------------
-- Table structure for `orders`
-- ----------------------------
DROP TABLE IF EXISTS `orders`;
CREATE TABLE `orders` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `uid` int(11) DEFAULT NULL,
  `totalprice` double DEFAULT NULL,
  `createtime` datetime DEFAULT NULL,
  `state` int(11) DEFAULT NULL,
  `ordernum` int(11) DEFAULT NULL,
  `logistics` varchar(255) DEFAULT NULL,
  `orders` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `fid` (`uid`),
  CONSTRAINT `fid` FOREIGN KEY (`uid`) REFERENCES `user` (`id`) ON DELETE CASCADE ON UPDATE CASCADE
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of orders
-- ----------------------------
INSERT INTO `orders` VALUES ('1', '2', '10', '2018-07-16 10:52:17', '1', null, '', '1001');
INSERT INTO `orders` VALUES ('2', '3', '40', '2018-07-17 08:32:25', '1', null, '', '1002');
INSERT INTO `orders` VALUES ('3', '3', '90', '2018-07-17 08:33:27', '2', null, '876543', '1003');
INSERT INTO `orders` VALUES ('4', '4', '360', '2018-07-17 08:33:42', '3', null, '123456', '1004');
INSERT INTO `orders` VALUES ('5', '6', '240', '2018-07-18 08:33:58', '3', null, 'abcdef', '1005');
INSERT INTO `orders` VALUES ('6', '7', '280', '2018-07-17 09:00:49', '2', null, 'zxcvbn', '1006');
INSERT INTO `orders` VALUES ('7', '8', '400', '2018-07-17 17:01:57', '2', null, '654321', '1007');

-- ----------------------------
-- Table structure for `user`
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `username` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `islock` int(11) DEFAULT '0',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=11 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('1', 'Lxy', '12345678', '12345678', '0');
INSERT INTO `user` VALUES ('2', 'WK', '12345678', 'Apple', '0');
INSERT INTO `user` VALUES ('3', 'Meizu', 'Meizu', 'Meizu', '0');
INSERT INTO `user` VALUES ('4', 'HuaWei', 'HuaWei', 'HuaWei', '0');
INSERT INTO `user` VALUES ('6', 'Oppo', 'Oppo', 'Oppo', '0');
INSERT INTO `user` VALUES ('7', 'Vivo', 'Vivo', 'Vivo', '1');
INSERT INTO `user` VALUES ('8', 'OnePlus', 'OnePlus', 'OnePlus', '1');
INSERT INTO `user` VALUES ('9', 'KK', '12345678', 'KK', '1');
INSERT INTO `user` VALUES ('10', 'MM', 'qwertyu', 'MM', '1');
