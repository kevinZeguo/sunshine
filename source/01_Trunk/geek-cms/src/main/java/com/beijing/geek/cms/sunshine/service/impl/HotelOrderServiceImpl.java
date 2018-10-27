package com.beijing.geek.cms.sunshine.service.impl;

import com.beijing.geek.cms.sunshine.dao.TbOrderDao;
import com.beijing.geek.cms.sunshine.dao.TbRoomTypeDao;
import com.beijing.geek.cms.sunshine.dao.TbRoomTypeInitDao;
import com.beijing.geek.cms.sunshine.domain.RoomQueryParam;
import com.beijing.geek.cms.sunshine.domain.TbOrder;
import com.beijing.geek.cms.sunshine.domain.TbRoomType;
import com.beijing.geek.cms.sunshine.domain.TbRoomTypeInit;
import com.beijing.geek.cms.sunshine.service.HotelOrderService;
import com.beijing.geek.cms.sys.utils.SendMailUtil;
import com.beijing.geek.cms.sys.utils.StringUtil;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.apache.velocity.app.VelocityEngine;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.ui.velocity.VelocityEngineUtils;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class HotelOrderServiceImpl implements HotelOrderService {
    private static final Logger logger = Logger.getLogger(HotelOrderServiceImpl.class);
    @Autowired
    private TbOrderDao tbOrderDao;
    @Autowired
    private TbRoomTypeDao tbRoomTypeDao;
    @Autowired
    private TbRoomTypeInitDao tbRoomTypeInitDao;
    @Autowired
    private VelocityEngine velocityEngine;
    @Value("${sale_man_email}")
    private String salesman = "121615715@qq.com";

    @Override
    public List getHotelDataList(String startDate, String endDate, String env) throws Exception {
        if (StringUtils.equals(startDate, endDate)) {
            if (StringUtils.isNotBlank(startDate)) {
                startDate += " 00:00:00";
            }
            if (StringUtils.isNotBlank(endDate)) {
                endDate += " 23:59:59";
            }
        }

        return tbRoomTypeInitDao.selectHotelRoomList(startDate, endDate, null, env);
    }

    @Override
    public List<TbRoomTypeInit> getHotelDataList(String startDate, String endDate, Integer typeId, String env) throws Exception {
        if (StringUtils.equals(startDate, endDate)) {
            if (StringUtils.isNotBlank(startDate)) {
                startDate += " 00:00:00";
            }
            if (StringUtils.isNotBlank(endDate)) {
                endDate += " 23:59:59";
            }
        }
        return tbRoomTypeInitDao.selectHotelRoomList(startDate, endDate, typeId, env);
    }

    @Override
    public void saveOrder(final TbOrder order, final String env) throws Exception {
//        DateFormat df2 = new SimpleDateFormat("yyyy-MM-dd");
        //校验是否存在尚未处理完成的订单
//        List<TbOrder> orders = tbOrderDao.selectByEmail(order.getEmail());
//        //校验是否存在尚未处理完成的订单
//        if (orders != null && orders.size() > 0) {
//            for (TbOrder o : orders) {
//                //订单开始时间
//                if ((o.getStartDate().getTime() >= order.getStartDate().getTime() && o.getStartDate().getTime() <= order.getEndDate().getTime())
//                        || (o.getStartDate().getTime() <= order.getStartDate().getTime() && o.getEndDate().getTime() >= order.getStartDate().getTime())) {
//                    if (StringUtil.equals(env, "cn")) {
//                        throw new RuntimeException("在入住开始时间【" + df2.format(order.getStartDate()) + "】,离店时间【" + df2.format(order.getEndDate()) + "】,存在预约订单，请联系客服取消后，再提交！");
//                    } else if (StringUtil.equals(env, "fra")) {
//                        throw new RuntimeException("Dans leur commencé【" + df2.format(order.getStartDate()) + "】,Départ de temps【" + df2.format(order.getEndDate()) + "】,L’existence de bons de commande (，Prière de prendre contact avec KeFu！");
//                    } else {
//                        throw new RuntimeException("Start time at check-in.【" + df2.format(order.getStartDate()) + "】,Your departure time【" + df2.format(order.getEndDate()) + "】,There is an appointment booking, please contact customer service to cancel and submit again.！");
//
//                    }
//                }
//            }
//        }
        order.setEnv(env);
//        List<TbRoomTypeInit> list1 = tbRoomTypeInitDao.getAllInitList(order);
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        List<TbRoomTypeInit> initList = this.getHotelDataList(df.format(order.getStartDate()), df.format(order.getEndDate()), order.getTypeId(), order.getEnv());
        TbRoomTypeInit tbRoomType = initList.get(0);
        //计算总价
        String checkCount = order.getCheckCount();
        Double sumPrice = 0d;
        for (String c : checkCount.split(", ")) {
            if (c.equals("1")) {
                sumPrice += tbRoomType.getPrice1();
            } else {
                sumPrice += tbRoomType.getPrice2();
            }
        }
        sumPrice = sumPrice * getDay(order.getStartDate(), order.getEndDate());
        order.setSumPrice(sumPrice);
        //保存订单
        tbOrderDao.insert(order);
        //扣除房间数量
//        for (TbRoomTypeInit init : list) {
//            init.setNumRetainRooms(init.getNumRetainRooms() - order.getOrderNumRooms());
//            tbRoomTypeInitDao.updateOrderNum(init);
//        }

        final Map<String, Object> param = new HashMap<>();
        param.put("order", order);
        //查询房间信息
        param.put("room", tbRoomType);
        long salePrice1 = (long) Math.pow(tbRoomType.getSalePrice1(), 1);
        if (order.getOrderNumRooms() != null && order.getOrderNumRooms() == 1) {//订购的房间数为1
            //判断入住人数
            if (StringUtils.isNotBlank(order.getCheckCount()) && order.getCheckCount().split(",").length == 1 && Integer.parseInt(order.getCheckCount()) == 2) {
                salePrice1 = (long) Math.pow(tbRoomType.getSalePrice2(), 1);
            }
        }
        param.put("salePrice1", salePrice1);
        param.put("date", df.format(new Date()));
        param.put("startDate", df.format(order.getStartDate()));
        param.put("endDate", df.format(order.getEndDate()));
        param.put("sumPrice", (long) Math.pow(order.getSumSalePrice(), 1));

        List<String> numList = new ArrayList<String>();
        for (String num : order.getCheckCount().split(",")) {
            numList.add(num);
        }
        param.put("numList", numList);
        //发送订单邮件
        Thread t = new Thread() {
            public void run() {
                try {
                    if (StringUtil.equals("cn", env)) {
                        sendTemplateMail(order.getEmail(), "", "阳光尼亚美酒店预订提醒", "/order.vm", param);
                    } else if (StringUtil.equals("fra", env)) {
                        sendTemplateMail(order.getEmail(), "", "Soluxe Hotel Niamey offers reservations.", "/order_fra.vm", param);
                    } else {
                        sendTemplateMail(order.getEmail(), "", "Soluxe Hotel Niamey offers reservations.", "/order_en.vm", param);
                    }
                } catch (Exception e) {
                    logger.error("发送邮件失败!", e);
                }
            }
        };
        t.start();
        Thread t2 = new Thread() {
            public void run() {
                try {
                    if (StringUtil.equals("cn", env)) {
                        sendTemplateMail(salesman, "", "阳光尼亚美酒店提交预约", "/order_deal.vm", param);
                    } else if (StringUtil.equals("fra", env)) {
                        sendTemplateMail(salesman, "", "Soluxe Hotel Niamey offers reservations.", "/order_deal_fra.vm", param);
                    } else {
                        sendTemplateMail(salesman, "", "Soluxe Hotel Niamey offers reservations.", "/order_deal_en.vm", param);
                    }

                } catch (Exception e) {
                    logger.error("发送邮件失败!", e);
                }
            }
        };
        t2.start();
    }

    private long getDay(Date startTime, Date endTime) throws ParseException {
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        if (StringUtil.equals(df.format(startTime), df.format(endTime))) {
            return 1l;
        }
        return (endTime.getTime() - startTime.getTime()) / 1000 / 60 / 60 / 24;
    }


    /**
     * 发送模板邮件
     *
     * @param to
     * @param cc
     * @param subject
     * @param velocityPath
     * @param paramMap
     * @throws Exception
     */
    public void sendTemplateMail(String to, String cc, String subject, String velocityPath, Map<String, Object> paramMap) throws Exception {
        String content = VelocityEngineUtils.mergeTemplateIntoString(velocityEngine, velocityPath, "UTF-8", paramMap);
        SendMailUtil.sendMessage(to, subject, content, cc);
    }

    @Override
    public TbOrder getOrderById(Integer orderId) throws Exception {
        return tbOrderDao.selectById(orderId);
    }

    @Override
    public TbRoomType getRoomType(Integer typeId, String env) throws Exception {
        return tbRoomTypeDao.selectById(typeId, env);
    }

    @Override
    public TbOrder cancelOrder(Integer orderId) throws Exception {
        return null;
    }

    @Override
    public TbOrder confirmOrder(Integer orderId, String env) throws Exception {
        final TbOrder order = tbOrderDao.selectById(orderId);
        if (order == null) {
            throw new RuntimeException("订单不存在，请确认订单号是否正确！");
        }
        env = order.getEnv();
        if (order.getOrderStatus() > 1) {
            return order;
        }
        //验证通过，更新订单状态
        order.setOrderStatus(2);
        tbOrderDao.updateStatus(order);

        DateFormat df = new SimpleDateFormat("yyyy-MM-dd");

        //向客户发送预约成功邮件
        final Map<String, Object> param = new HashMap<>();
        param.put("order", order);
        //查询房间信息
        List<TbRoomTypeInit> initList = this.getHotelDataList(df.format(order.getStartDate()), df.format(order.getEndDate()), order.getTypeId(), order.getEnv());
        TbRoomTypeInit tbRoomType = initList.get(0);

        param.put("room", tbRoomType);
        List<String> numList = new ArrayList<String>();
        for (String num : order.getCheckCount().split(",")) {
            numList.add(num);
        }
        param.put("date", df.format(new Date()));
        param.put("startDate", df.format(order.getStartDate()));
        param.put("endDate", df.format(order.getEndDate()));
        param.put("numList", numList);

        long salePrice1 = (long) Math.pow(tbRoomType.getSalePrice1(), 1);
        if (order.getOrderNumRooms() != null && order.getOrderNumRooms() == 1) {//订购的房间数为1
            //判断入住人数
            if (StringUtils.isNotBlank(order.getCheckCount()) && order.getCheckCount().split(",").length == 1 && Integer.parseInt(order.getCheckCount()) == 2) {
                salePrice1 = (long) Math.pow(tbRoomType.getSalePrice2(), 1);
            }
        }
        param.put("salePrice1", salePrice1);

        //发送订单邮件
        Thread t = new Thread() {
            public void run() {//客户发送邮件
                try {
                    if (StringUtil.equals(order.getEnv(), "cn")) {
                        sendTemplateMail(order.getEmail(), salesman, "阳光尼亚美酒店确认预约单提醒", "/c_result.vm", param);
                    } else if (StringUtil.equals(order.getEnv(), "fra")) {
                        sendTemplateMail(order.getEmail(), salesman, "Soluxe Hotel Niamey offers reservations.", "/c_result_fra.vm", param);
                    } else {
                        sendTemplateMail(order.getEmail(), salesman, "Soluxe Hotel Niamey offers reservations.", "/c_result_en.vm", param);
                    }
                } catch (Exception e) {
                    logger.error("发送邮件失败!", e);
                }
            }
        };
        t.start();
//        tbRoomType = tbRoomTypeDao.selectById(order.getTypeId(), "cn");
//        param.put("room", tbRoomType);
//        Thread t2 = new Thread() {
//            public void run() {//销售人员发送邮件
//                try {
//                    sendTemplateMail(salesman, "", "阳光尼亚美酒店提交预约", "/u_result.vm", param);
//                } catch (Exception e) {
//                    logger.error("发送邮件失败!", e);
//                }
//            }
//        };
//        t2.start();

        return order;
    }

    @Override
    public List<TbRoomType> getAllRoomType() throws Exception {
        return tbRoomTypeDao.selectAllList();
    }

    @Override
    public Integer queryOrderCountByPage(RoomQueryParam param) throws Exception {
        return tbOrderDao.selectOrderCountByPage(param);
    }

    @Override
    public List<TbOrder> queryOrderListByPage(RoomQueryParam param) throws Exception {
        List<TbOrder> orders = tbOrderDao.selectOrderListByPage(param);
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        for (TbOrder order : orders) {
            order.setStartDateStr(df.format(order.getStartDate()));
            order.setEndDateStr(df.format(order.getEndDate()));
            if (order.getOrderDate() != null) {
                order.setOrderDateStr(df.format(order.getOrderDate()));
            }
            if (order.getConfirmDate() != null) {
                order.setConfirmDateStr(df.format(order.getConfirmDate()));
            }
        }
        return orders;
    }

    @Override
    public void deletedOrder(Integer orderId, String cn) throws Exception {
        tbOrderDao.deleteById(orderId);
    }
}

