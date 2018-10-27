package com.beijing.geek.cms.sunshine.service;

import com.beijing.geek.cms.sunshine.domain.RoomQueryParam;
import com.beijing.geek.cms.sunshine.domain.TbOrder;
import com.beijing.geek.cms.sunshine.domain.TbRoomType;
import com.beijing.geek.cms.sunshine.domain.TbRoomTypeInit;

import java.util.List;

public interface HotelOrderService {
    /**
     * 查询酒店信息
     *
     * @param startDate
     * @param endDate
     * @param env
     * @return
     * @throws Exception
     */
    List getHotelDataList(String startDate, String endDate, String env) throws Exception;

    /**
     * 查询某个房间剩余量
     *
     * @param startDate
     * @param endDate
     * @param typeId
     * @return
     * @throws Exception
     */
    List<TbRoomTypeInit> getHotelDataList(String startDate, String endDate, Integer typeId, String env) throws Exception;

    /**
     * 保存订单
     *
     * @param order
     * @throws Exception
     */
    void saveOrder(TbOrder order, String env) throws Exception;

    /**
     * @param orderId
     * @return
     * @throws Exception
     */
    TbOrder getOrderById(Integer orderId) throws Exception;

    /**
     * @param typeId
     * @return
     * @throws Exception
     */
    TbRoomType getRoomType(Integer typeId, String env) throws Exception;

    /**
     * 取消订单
     *
     * @param orderId
     * @return
     * @throws Exception
     */
    TbOrder cancelOrder(Integer orderId) throws Exception;

    /**
     * 确认订单
     *
     * @param orderId
     * @return
     * @throws Exception
     */
    TbOrder confirmOrder(Integer orderId, String env) throws Exception;

    /*
    * 房间类型
     */
    List<TbRoomType> getAllRoomType() throws Exception;

    /**
     * 查询订单数量
     *
     * @param param
     * @return
     * @throws Exception
     */
    Integer queryOrderCountByPage(RoomQueryParam param) throws Exception;

    /**
     * 查询订单
     *
     * @param param
     * @return
     * @throws Exception
     */
    List<TbOrder> queryOrderListByPage(RoomQueryParam param) throws Exception;

    /**
     * 删除订单
     *
     * @param orderId
     * @param cn
     * @return
     * @throws Exception
     */
    void deletedOrder(Integer orderId, String cn) throws Exception;
}
