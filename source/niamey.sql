/*
Navicat MySQL Data Transfer

Source Server         : localhost
Source Server Version : 50200
Source Host           : localhost:3306
Source Database       : niamey

Target Server Type    : MYSQL
Target Server Version : 50200
File Encoding         : 65001

Date: 2018-01-10 00:05:26
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for `tb_order`
-- ----------------------------
DROP TABLE IF EXISTS `tb_order`;
CREATE TABLE `tb_order` (
  `id` int(11) NOT NULL AUTO_INCREMENT COMMENT '订单id',
  `type_id` int(11) DEFAULT NULL COMMENT '房型id',
  `init_id` int(11) DEFAULT NULL COMMENT '初始化房型id',
  `order_num_rooms` int(2) DEFAULT NULL COMMENT '预约房间个数',
  `order_status` int(2) DEFAULT NULL COMMENT '订单状态：1 为在线预定，2为预定确认，3为预定取消',
  `username` varchar(50) COLLATE utf8_bin DEFAULT NULL COMMENT '用户名称',
  `telephone` varchar(20) COLLATE utf8_bin DEFAULT NULL COMMENT '用户电话',
  `email` varchar(50) COLLATE utf8_bin DEFAULT NULL COMMENT '邮箱',
  `start_date` datetime DEFAULT NULL COMMENT '预定开始时间',
  `end_date` datetime DEFAULT NULL COMMENT '预定结束时间',
  `late_arri_time` varchar(10) COLLATE utf8_bin DEFAULT NULL COMMENT '最晚到店时间',
  `sum_price` double DEFAULT NULL COMMENT '总价',
  `sum_sale_price` double DEFAULT NULL COMMENT '总优惠价',
  `comment` varchar(500) COLLATE utf8_bin DEFAULT NULL COMMENT '备注',
  `c_time` datetime DEFAULT NULL COMMENT '创建时间',
  `u_time` datetime DEFAULT NULL COMMENT '修改时间',
  `del_status` int(1) DEFAULT NULL COMMENT '删除状态：0删除，1为正常',
  PRIMARY KEY (`id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='订单表';

-- ----------------------------
-- Records of tb_order
-- ----------------------------

-- ----------------------------
-- Table structure for `tb_room_type`
-- ----------------------------
DROP TABLE IF EXISTS `tb_room_type`;
CREATE TABLE `tb_room_type` (
  `type_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '房型id',
  `type_name` varchar(100) COLLATE utf8_bin DEFAULT NULL COMMENT '房型名称',
  `num_rooms` int(5) DEFAULT NULL COMMENT '总房间数',
  `price_1` double DEFAULT NULL COMMENT '1人住房间单价',
  `price_2` double DEFAULT NULL COMMENT '2人住房间单价',
  `sale_price_1` double DEFAULT NULL COMMENT '1人住房间优惠单价',
  `sale_price_2` double DEFAULT NULL COMMENT '2人住房间优惠单价',
  `price_note` varchar(500) COLLATE utf8_bin DEFAULT NULL COMMENT '价格简介',
  `bad_type` varchar(100) COLLATE utf8_bin DEFAULT NULL COMMENT '床型',
  `breakfast` varchar(100) COLLATE utf8_bin DEFAULT NULL COMMENT '是否含早餐',
  `network` varchar(100) COLLATE utf8_bin DEFAULT NULL COMMENT '是否有网络',
  `floor` varchar(100) COLLATE utf8_bin DEFAULT NULL COMMENT '楼层',
  `type_note` varchar(500) COLLATE utf8_bin DEFAULT NULL COMMENT '房型简述',
  `comment` varchar(500) COLLATE utf8_bin DEFAULT NULL COMMENT '备注',
  `c_time` datetime DEFAULT NULL COMMENT '创建时间',
  `u_time` datetime DEFAULT NULL COMMENT '修改时间',
  `del_status` int(1) DEFAULT NULL COMMENT '删除状态：0删除，1为正常',
  PRIMARY KEY (`type_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='房型表';

-- ----------------------------
-- Records of tb_room_type
-- ----------------------------
INSERT INTO `tb_room_type` VALUES ('1', '豪华大床房', '56', null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `tb_room_type` VALUES ('2', '豪华双床房', '10', null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `tb_room_type` VALUES ('3', '商务套房', '6', null, null, null, null, null, null, null, null, null, null, null, null, null, null);
INSERT INTO `tb_room_type` VALUES ('4', '总统套房', '1', null, null, null, null, null, null, null, null, null, null, null, null, null, null);

-- ----------------------------
-- Table structure for `tb_room_type_init`
-- ----------------------------
DROP TABLE IF EXISTS `tb_room_type_init`;
CREATE TABLE `tb_room_type_init` (
  `init_id` int(11) NOT NULL AUTO_INCREMENT COMMENT '初始化id',
  `type_id` int(11) NOT NULL COMMENT '房型id',
  `type_name` varchar(100) COLLATE utf8_bin DEFAULT NULL COMMENT '房型名称',
  `num_rooms` int(5) DEFAULT NULL COMMENT '总房间数',
  `num_retain_rooms` int(11) DEFAULT NULL COMMENT '剩余的房间数',
  `price` double DEFAULT NULL COMMENT '房间单格',
  `sale_price` double DEFAULT NULL COMMENT '房间优惠单格',
  `room_date` datetime DEFAULT NULL COMMENT '房间日期',
  `comment` varchar(500) COLLATE utf8_bin DEFAULT NULL COMMENT '备注',
  `c_time` datetime DEFAULT NULL COMMENT '创建时间',
  `u_time` datetime DEFAULT NULL COMMENT '修改时间',
  `del_status` int(1) DEFAULT NULL COMMENT '删除状态：0删除，1为正常',
  PRIMARY KEY (`init_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_bin COMMENT='房间类型表';

-- ----------------------------
-- Records of tb_room_type_init
-- ----------------------------
INSERT INTO `tb_room_type_init` VALUES ('1', '1', '豪华大床房', '56', '56', null, null, '2018-01-07 20:52:48', null, null, null, null);
INSERT INTO `tb_room_type_init` VALUES ('2', '2', '豪华双床房', '10', null, null, null, null, null, null, null, null);
INSERT INTO `tb_room_type_init` VALUES ('3', '3', '商务套房', '6', null, null, null, null, null, null, null, null);
INSERT INTO `tb_room_type_init` VALUES ('4', '4', '总统套房', '1', null, null, null, null, null, null, null, null);
INSERT INTO `tb_room_type_init` VALUES ('5', '1', '豪华大床房', '56', '0', null, null, '2018-01-08 20:52:54', null, null, null, null);
INSERT INTO `tb_room_type_init` VALUES ('6', '1', '豪华大床房', '56', '43', null, null, '2018-01-09 20:53:11', null, null, null, null);
