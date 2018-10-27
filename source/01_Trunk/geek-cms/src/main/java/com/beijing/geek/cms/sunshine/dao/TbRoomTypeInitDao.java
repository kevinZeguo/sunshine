package com.beijing.geek.cms.sunshine.dao;

import com.beijing.geek.cms.sunshine.domain.RoomQueryParam;
import com.beijing.geek.cms.sunshine.domain.TbOrder;
import com.beijing.geek.cms.sunshine.domain.TbRoomType;
import com.beijing.geek.cms.sunshine.domain.TbRoomTypeInit;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface TbRoomTypeInitDao {
    int deleteById(Integer initId) throws Exception;

    int insert(TbRoomTypeInit record) throws Exception;

    TbRoomTypeInit selectById(Integer initId) throws Exception;

    int updateById(TbRoomTypeInit record) throws Exception;

    /**
     * 获取可以预订的房间列表
     *
     * @param startDate
     * @param endDate
     * @param typeId
     * @param env
     * @return
     * @throws Exception
     */
    List selectHotelRoomList(@Param("startDate") String startDate, @Param("endDate") String endDate, @Param("typeId") Integer typeId, @Param("env") String env) throws Exception;


    List<TbRoomTypeInit> getAllInitList(TbOrder order) throws Exception;

    void updateOrderNum(TbRoomTypeInit init) throws Exception;

    /**
     * 查找最后一条初始化的数据
     *
     * @param tbRoomType
     * @return
     * @throws Exception
     */
    TbRoomTypeInit getLastInit(TbRoomType tbRoomType) throws Exception;

    void batchInsert(TbRoomType TbRoomTypeInit) throws Exception;


    List<TbRoomTypeInit> selectRoomListByPage(RoomQueryParam param) throws Exception;

    Integer selectRoomCountByPage(RoomQueryParam param) throws Exception;

    void updatePerStatus(@Param("initIdList") List<Integer> initIdList, @Param("status") int status) throws Exception;
}