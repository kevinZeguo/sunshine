package com.beijing.geek.cms.sunshine.dao;

import com.beijing.geek.cms.sunshine.domain.RoomQueryParam;
import com.beijing.geek.cms.sunshine.domain.TbOrder;

import java.util.List;

public interface TbOrderDao {

    int deleteById(Integer id) throws Exception;

    int insert(TbOrder record) throws Exception;

    TbOrder selectById(Integer id) throws Exception;

    int updateById(TbOrder record) throws Exception;

    /**
     * 根据邮件查询用户预订信息
     *
     * @param email
     * @return
     * @throws Exception
     */
    List<TbOrder> selectByEmail(String email) throws Exception;

    /**
     * 更新订单状态
     *
     * @param order
     * @throws Exception
     */
    void updateStatus(TbOrder order) throws Exception;

    /**
     * 查询订单数量
     *
     * @param param
     * @return
     * @throws Exception
     */
    Integer selectOrderCountByPage(RoomQueryParam param) throws Exception;

    List<TbOrder> selectOrderListByPage(RoomQueryParam param) throws Exception;
}
