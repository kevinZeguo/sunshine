package com.beijing.geek.cms.sunshine.dao;

import com.beijing.geek.cms.sunshine.domain.TbRoomType;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface TbRoomTypeDao {
    int deleteById(Integer typeId) throws Exception;

    int insert(TbRoomType record) throws Exception;

    TbRoomType selectById(@Param("typeId")Integer typeId, @Param("env") String env) throws Exception;

    int updateByIdSelective(TbRoomType record) throws Exception;

    int updateById(TbRoomType record) throws Exception;

    List<TbRoomType> selectAllList()throws Exception;

}