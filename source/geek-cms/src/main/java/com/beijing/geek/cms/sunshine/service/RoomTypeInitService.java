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
}
