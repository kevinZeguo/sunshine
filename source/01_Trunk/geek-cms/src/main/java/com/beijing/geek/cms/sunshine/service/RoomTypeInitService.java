package com.beijing.geek.cms.sunshine.service;

import com.beijing.geek.cms.sunshine.domain.RoomQueryParam;
import com.beijing.geek.cms.sunshine.domain.TbRoomTypeInit;

import java.util.List;

public interface RoomTypeInitService {
    /**
     * @param param
     * @return
     * @throws Exception
     */
    Integer queryRoomCountByPage(RoomQueryParam param) throws Exception;

    /**
     * 查询房间列表
     *
     * @param param
     * @return
     * @throws Exception
     */
    List<TbRoomTypeInit> queryRoomListByPage(RoomQueryParam param) throws Exception;

    /**
     * 开启预订
     *
     * @param initIdList
     * @throws Exception
     */
    void openRoom(List<Integer> initIdList) throws Exception;

    /**
     * 关闭预订
     *
     * @param initIdList
     * @throws Exception
     */
    void closeRoom(List<Integer> initIdList) throws Exception;

    /**
     * 获取订单信息
     *
     * @param initId
     * @return
     * @throws Exception
     */
    TbRoomTypeInit findById(Integer initId) throws Exception;

    /**
     * 修改房间价格
     *
     * @param tbRoomTypeInit
     * @throws Exception
     */
    void modifyRoomInit(TbRoomTypeInit tbRoomTypeInit) throws Exception;
}
