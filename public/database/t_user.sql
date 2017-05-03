/*
Navicat MySQL Data Transfer

Source Server         : fuybooo
Source Server Version : 50555
Source Host           : localhost:3306
Source Database       : fuybooo_blog

Target Server Type    : MYSQL
Target Server Version : 50555
File Encoding         : 65001

Date: 2017-05-03 18:53:53
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for t_user
-- ----------------------------
DROP TABLE IF EXISTS `t_user`;
CREATE TABLE `t_user` (
  `id` varchar(100) CHARACTER SET latin1 NOT NULL COMMENT '主键',
  `user_id` varchar(3) CHARACTER SET latin1 NOT NULL,
  `user_name` varchar(20) CHARACTER SET latin1 NOT NULL,
  `user_state` int(1) NOT NULL,
  `user_email` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `user_phone_no` varchar(20) CHARACTER SET latin1 DEFAULT NULL,
  `user_home_address` varchar(255) DEFAULT NULL,
  `user_company_address` varchar(255) DEFAULT NULL,
  `user_native_place` varchar(255) DEFAULT NULL,
  `user_card_id` varchar(18) CHARACTER SET latin1 DEFAULT NULL,
  `user_birthday` date DEFAULT NULL,
  `user_sex` int(1) DEFAULT NULL,
  `user_entry_date` date DEFAULT NULL,
  PRIMARY KEY (`id`),
  UNIQUE KEY `index_t_user` (`id`) USING HASH
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of t_user
-- ----------------------------
INSERT INTO `t_user` VALUES ('1', '1', 'fuybooo', '1', 'fuybooo@qq.com', '13521892712', '北京市朝阳区北辰西路华严北里67号楼', '北京市海淀区龙翔路甲1号', '湖北省', '429006199101158888', '1991-01-15', '1', '2017-03-29');
