ALTER TABLE `tb_room_type`
MODIFY COLUMN `type_id`  int(11) NULL AUTO_INCREMENT COMMENT '房型id' ,
ADD COLUMN `id`  int NOT NULL COMMENT '房间定义Id' FIRST ;

ALTER TABLE `tb_room_type`
MODIFY COLUMN `id`  int(11) NOT NULL AUTO_INCREMENT COMMENT '房间定义Id' FIRST ,
MODIFY COLUMN `type_id`  int(11) NULL COMMENT '房型id' AFTER `id`;