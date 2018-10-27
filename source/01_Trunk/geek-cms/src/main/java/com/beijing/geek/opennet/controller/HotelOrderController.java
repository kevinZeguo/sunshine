package com.beijing.geek.opennet.controller;

import com.beijing.geek.cms.sunshine.domain.TbOrder;
import com.beijing.geek.cms.sunshine.domain.TbRoomType;
import com.beijing.geek.cms.sunshine.domain.TbRoomTypeInit;
import com.beijing.geek.cms.sunshine.service.HotelOrderService;
import com.beijing.geek.cms.sys.domain.common.AjaxJson;
import com.beijing.geek.cms.sys.domain.common.ListDataJson;
import com.beijing.geek.cms.sys.utils.StringUtil;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Controller
@RequestMapping("/")
public class HotelOrderController {
    private static final Logger logger = Logger.getLogger(HotelOrderController.class);
    @Autowired
    private HotelOrderService hotelOrderService;

    /**
     * 查询订单页面
     *
     * @param request
     * @return
     */
    @RequestMapping("room.html")
    public String room(Model model, HttpServletRequest request, HttpServletResponse response, String checkindate, String checkoutdate) {
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        if (StringUtil.isEmpty(checkindate)) {
            checkindate = df.format(new Date());
        }
        if (StringUtil.isEmpty(checkoutdate)) {
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(new Date());
            calendar.add(Calendar.DAY_OF_MONTH, 3);
            checkoutdate = df.format(calendar.getTime());
        }
        model.addAttribute("env", "cn");
        model.addAttribute("startDate", checkindate);
        model.addAttribute("endDate", checkoutdate);
        return "sunshine/room";
    }

    /**
     * 查询订单页面
     *
     * @param request
     * @return
     */
    @RequestMapping("cn.html")
    public String cnRoom(Model model, HttpServletRequest request, HttpServletResponse response, String checkindate, String checkoutdate) {
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        if (StringUtil.isEmpty(checkindate)) {
            checkindate = df.format(new Date());
        }
        if (StringUtil.isEmpty(checkoutdate)) {
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(new Date());
            calendar.add(Calendar.DAY_OF_MONTH, 3);
            checkoutdate = df.format(calendar.getTime());
        }
        model.addAttribute("env", "cn");
        model.addAttribute("startDate", checkindate);
        model.addAttribute("endDate", checkoutdate);
        return "sunshine/room_cn";
    }


    /**
     * 查询订单页面
     *
     * @param request
     * @return
     */
    @RequestMapping("en.html")
    public String enRoom(Model model, HttpServletRequest request, HttpServletResponse response, String checkindate, String checkoutdate) {
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        if (StringUtil.isEmpty(checkindate)) {
            checkindate = df.format(new Date());
        }
        if (StringUtil.isEmpty(checkoutdate)) {
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(new Date());
            calendar.add(Calendar.DAY_OF_MONTH, 3);
            checkoutdate = df.format(calendar.getTime());
        }
        model.addAttribute("env", "en");
        model.addAttribute("startDate", checkindate);
        model.addAttribute("endDate", checkoutdate);
        return "sunshine/room_en";
    }


    /**
     * 查询订单页面
     *
     * @param request
     * @return
     */
    @RequestMapping("fra.html")
    public String fraRoom(Model model, HttpServletRequest request, HttpServletResponse response, String checkindate, String checkoutdate) {
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
        if (StringUtil.isEmpty(checkindate)) {
            checkindate = df.format(new Date());
        }
        if (StringUtil.isEmpty(checkoutdate)) {
            Calendar calendar = Calendar.getInstance();
            calendar.setTime(new Date());
            calendar.add(Calendar.DAY_OF_MONTH, 3);
            checkoutdate = df.format(calendar.getTime());
        }
        model.addAttribute("env", "fra");
        model.addAttribute("startDate", checkindate);
        model.addAttribute("endDate", checkoutdate);
        return "sunshine/room_fra";
    }


    /**
     * 下订单页面
     *
     * @return
     */
    @RequestMapping("order.html")
    public String order(Model model, String orderStartDate, String orderEndDate, Integer typeId) {
        //查询此类型 房间在指定时间内，剩余房间数
        model.addAttribute("startDate", orderStartDate);
        model.addAttribute("endDate", orderEndDate);
        //计算预订时长
        try {
            long day = getDay(orderStartDate, orderEndDate);
            model.addAttribute("day", day);
            List<TbRoomTypeInit> list = hotelOrderService.getHotelDataList(orderStartDate, orderEndDate, typeId, "cn");
            if (list.size() > 0) {//取第一条就是指定的数据
                TbRoomTypeInit tbRoomTypeInit = list.get(0);
                model.addAttribute("salePrice1", (long) Math.pow(tbRoomTypeInit.getSalePrice1() * day, 1));
                model.addAttribute("salePrice2", (long) Math.pow(tbRoomTypeInit.getSalePrice2() * day, 1));

                model.addAttribute("room", tbRoomTypeInit);
                List<Integer> countList = new ArrayList<>();
                for (int i = 0; i < list.get(0).getNumRetainRooms(); i++) {
                    if (i < 5) {
                        countList.add(i + 1);
                    }

                }
                model.addAttribute("countList", countList);
            } else {
                return "redirect:room.html";
            }
            DateFormat df1 = new SimpleDateFormat("yyyy-MM-dd");
            DateFormat df2 = new SimpleDateFormat("yyyy-MM-dd");
            model.addAttribute("env", "cn");
            model.addAttribute("fmtStartDate", df2.format(df1.parse(orderStartDate)));
            model.addAttribute("fmtEndDate", df2.format(df1.parse(orderEndDate)));
        } catch (Exception e) {
            logger.error("查询房间信息失败,", e);
        }
        return "sunshine/order";
    }


    private long getDay(String startDate, String endDate) throws ParseException {
        if (StringUtil.equals(startDate, endDate)) {
            return 1l;
        }
        DateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        Date startTime = null;
        startTime = df.parse(startDate + " 00:00:00");
        Date endTime = df.parse(endDate + " 00:00:00");
        return (endTime.getTime() - startTime.getTime()) / 1000 / 60 / 60 / 24;
    }

    /**
     * 下订单页面
     *
     * @return
     */
    @RequestMapping("ocn.html")
    public String cnOrder(Model model, String orderStartDate, String orderEndDate, Integer typeId) {
        //查询此类型 房间在指定时间内，剩余房间数
        model.addAttribute("startDate", orderStartDate);
        model.addAttribute("endDate", orderEndDate);
        try {
            long day = getDay(orderStartDate, orderEndDate);
            model.addAttribute("day", day);
            List<TbRoomTypeInit> list = hotelOrderService.getHotelDataList(orderStartDate, orderEndDate, typeId, "cn");
            if (list.size() > 0) {//取第一条就是指定的数据
                TbRoomTypeInit tbRoomTypeInit = list.get(0);
                model.addAttribute("salePrice1", (long) Math.pow(tbRoomTypeInit.getSalePrice1() * day, 1));
                model.addAttribute("salePrice2", (long) Math.pow(tbRoomTypeInit.getSalePrice2() * day, 1));


                model.addAttribute("room", tbRoomTypeInit);
                List<Integer> countList = new ArrayList<>();
                for (int i = 0; i < list.get(0).getNumRetainRooms(); i++) {
                    if (i < 5) {
                        countList.add(i + 1);
                    }

                }
                model.addAttribute("countList", countList);
            } else {
                return "redirect:room.html";
            }
            model.addAttribute("env", "cn");
            DateFormat df1 = new SimpleDateFormat("yyyy-MM-dd");
            DateFormat df2 = new SimpleDateFormat("yyyy-MM-dd");
            model.addAttribute("fmtStartDate", df2.format(df1.parse(orderStartDate)));
            model.addAttribute("fmtEndDate", df2.format(df1.parse(orderEndDate)));
        } catch (Exception e) {
            logger.error("查询房间信息失败,", e);
        }
        return "sunshine/order_cn";
    }


    /**
     * 下订单页面
     *
     * @return
     */
    @RequestMapping("oen.html")
    public String enOrder(Model model, String orderStartDate, String orderEndDate, Integer typeId) {
        //查询此类型 房间在指定时间内，剩余房间数
        model.addAttribute("startDate", orderStartDate);
        model.addAttribute("env", "en");
        model.addAttribute("endDate", orderEndDate);
        try {
            long day = getDay(orderStartDate, orderEndDate);
            model.addAttribute("day", day);
            List<TbRoomTypeInit> list = hotelOrderService.getHotelDataList(orderStartDate, orderEndDate, typeId, "en");
            if (list.size() > 0) {//取第一条就是指定的数据
                TbRoomTypeInit tbRoomTypeInit = list.get(0);
                model.addAttribute("salePrice1", (long) Math.pow(tbRoomTypeInit.getSalePrice1() * day, 1));
                model.addAttribute("salePrice2", (long) Math.pow(tbRoomTypeInit.getSalePrice2() * day, 1));

                model.addAttribute("room", tbRoomTypeInit);
                List<Integer> countList = new ArrayList<>();
                for (int i = 0; i < list.get(0).getNumRetainRooms(); i++) {
                    if (i < 5) {
                        countList.add(i + 1);
                    }

                }
                model.addAttribute("countList", countList);
            } else {
                return "redirect:room.html";
            }
            DateFormat df1 = new SimpleDateFormat("yyyy-MM-dd");
            DateFormat df2 = new SimpleDateFormat("yyyy-MM-dd");
            model.addAttribute("fmtStartDate", df2.format(df1.parse(orderStartDate)));
            model.addAttribute("fmtEndDate", df2.format(df1.parse(orderEndDate)));
        } catch (Exception e) {
            logger.error("查询房间信息失败,", e);
        }
        return "sunshine/order_en";
    }


    /**
     * 下订单页面
     *
     * @return
     */
    @RequestMapping("ofra.html")
    public String fraOrder(Model model, String orderStartDate, String orderEndDate, Integer typeId) {
        //查询此类型 房间在指定时间内，剩余房间数
        model.addAttribute("startDate", orderStartDate);
        model.addAttribute("endDate", orderEndDate);
        model.addAttribute("env", "fra");
        try {
            long day = getDay(orderStartDate, orderEndDate);
            model.addAttribute("day", day);

            List<TbRoomTypeInit> list = hotelOrderService.getHotelDataList(orderStartDate, orderEndDate, typeId, "fra");
            if (list.size() > 0) {//取第一条就是指定的数据
                TbRoomTypeInit tbRoomTypeInit = list.get(0);
                model.addAttribute("salePrice1", (long) Math.pow(tbRoomTypeInit.getSalePrice1() * day, 1));
                model.addAttribute("salePrice2", (long) Math.pow(tbRoomTypeInit.getSalePrice2() * day, 1));

                model.addAttribute("room", tbRoomTypeInit);
                List<Integer> countList = new ArrayList<>();
                for (int i = 0; i < list.get(0).getNumRetainRooms(); i++) {
                    if (i < 5) {
                        countList.add(i + 1);
                    }

                }
                model.addAttribute("countList", countList);
            } else {
                return "redirect:room.html";
            }
            DateFormat df1 = new SimpleDateFormat("yyyy-MM-dd");
            DateFormat df2 = new SimpleDateFormat("yyyy-MM-dd");
            model.addAttribute("fmtStartDate", df2.format(df1.parse(orderStartDate)));
            model.addAttribute("fmtEndDate", df2.format(df1.parse(orderEndDate)));
        } catch (Exception e) {
            logger.error("查询房间信息失败,", e);
        }
        return "sunshine/order_fra";
    }


    /**
     * 下订单页面
     *
     * @return
     */
    @ResponseBody
    @RequestMapping("getHData.ajax")
    public ListDataJson getHData(String startDate, String endDate, String env) {
        ListDataJson userListData = new ListDataJson();
        try {
            if (StringUtil.isEmpty(env)) {
                env = "en";
            }
            //查询数据总量
            List<TbRoomTypeInit> hDataList = hotelOrderService.getHotelDataList(startDate, endDate, env);
            if (hDataList != null && hDataList.size() > 0) {
                for (TbRoomTypeInit init : hDataList) {
                    if ("cn".equalsIgnoreCase(env)) {//中文
                        init.setPriceNote(((long) Math.pow(init.getSalePrice1(), 1) - 500) + "（房费）+500（人头税） " + (long) Math.pow(init.getSalePrice1(), 1) + "xof");
                    } else if ("fra".equalsIgnoreCase(env)) {//法文
                        init.setPriceNote(((long) Math.pow(init.getSalePrice1(), 1) - 500) + " (prix de chambre) + 500 (taxe hoteliere)" + (long) Math.pow(init.getSalePrice1(), 1) + "xof");
                    } else {
                        init.setPriceNote(((long) Math.pow(init.getSalePrice1(), 1) - 500) + " (room charge) +500 (city tax) " + (long) Math.pow(init.getSalePrice1(), 1) + "xof");
                    }
                }
            }
            userListData.setLimit(10000);
            userListData.setList(hDataList);
            userListData.setPage(1);
            userListData.setRecords(1000);
        } catch (Exception e) {
            logger.error("查询订单列表失败!", e);
        }
        return userListData;
    }


    /**
     * 下订单页面
     *
     * @return
     */
    @RequestMapping("result.html")
    public String result(Model model, Integer orderId, String env) {
        try {
            TbOrder order = hotelOrderService.getOrderById(orderId);
            if (order != null) {
                model.addAttribute("order", order);
                TbRoomType type = hotelOrderService.getRoomType(order.getTypeId(), "cn");
                model.addAttribute("type", type);
                DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
                model.addAttribute("startDate", df.format(order.getStartDate()));
                model.addAttribute("endDate", df.format(order.getEndDate()));
                model.addAttribute("sumPrice", (long) Math.pow(order.getSumSalePrice(), 1));

            }
        } catch (Exception e) {
            logger.error("查询订单信息失败！", e);
        }
        return "sunshine/result";
    }


    /**
     * 下订单页面
     *
     * @return
     */
    @RequestMapping("rcn.html")
    public String cnresult(Model model, Integer orderId, String env) {
        try {
            TbOrder order = hotelOrderService.getOrderById(orderId);
            if (order != null) {
                model.addAttribute("order", order);
                TbRoomType type = hotelOrderService.getRoomType(order.getTypeId(), "cn");
                model.addAttribute("type", type);
                DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
                model.addAttribute("startDate", df.format(order.getStartDate()));
                model.addAttribute("endDate", df.format(order.getEndDate()));
                model.addAttribute("sumPrice", (long) Math.pow(order.getSumSalePrice(), 1));
            }
        } catch (Exception e) {
            logger.error("查询订单信息失败！", e);
        }
        return "sunshine/result_cn";
    }


    /**
     * 下订单页面
     *
     * @return
     */
    @RequestMapping("ren.html")
    public String enresult(Model model, Integer orderId, String env) {
        try {
            TbOrder order = hotelOrderService.getOrderById(orderId);
            if (order != null) {
                model.addAttribute("order", order);
                TbRoomType type = hotelOrderService.getRoomType(order.getTypeId(), "en");
                model.addAttribute("type", type);
                DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
                model.addAttribute("startDate", df.format(order.getStartDate()));
                model.addAttribute("endDate", df.format(order.getEndDate()));
                model.addAttribute("sumPrice", (long) Math.pow(order.getSumSalePrice(), 1));
            }
        } catch (Exception e) {
            logger.error("查询订单信息失败！", e);
        }
        return "sunshine/result_en";
    }


    /**
     * 下订单页面
     *
     * @return
     */
    @RequestMapping("rfra.html")
    public String fraresult(Model model, Integer orderId, String env) {
        try {
            TbOrder order = hotelOrderService.getOrderById(orderId);
            if (order != null) {
                model.addAttribute("order", order);
                TbRoomType type = hotelOrderService.getRoomType(order.getTypeId(), "fra");
                model.addAttribute("type", type);
                DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
                model.addAttribute("startDate", df.format(order.getStartDate()));
                model.addAttribute("endDate", df.format(order.getEndDate()));
                model.addAttribute("sumPrice", (long) Math.pow(order.getSumSalePrice(), 1));
            }
        } catch (Exception e) {
            logger.error("查询订单信息失败！", e);
        }
        return "sunshine/result_fra";
    }

    /**
     * 确认订单
     *
     * @return
     */
    @RequestMapping("confirm.html")
    public String confirm(Model model, Integer orderId, String env) {
        try {
            TbOrder order = hotelOrderService.confirmOrder(orderId, env);
            if (order != null) {
                model.addAttribute("order", order);
                TbRoomType type = hotelOrderService.getRoomType(order.getTypeId(), env);
                model.addAttribute("room", type);
                DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
                model.addAttribute("startDate", df.format(order.getStartDate()));
                model.addAttribute("endDate", df.format(order.getEndDate()));
                List<String> numList = new ArrayList<String>();
                for (String num : order.getCheckCount().split(",")) {
                    numList.add(num);
                }
                model.addAttribute("numList", numList);
            }
        } catch (Exception e) {
            logger.error("查询订单信息失败！", e);
        }
        return "sunshine/confirm";
    }

    /**
     * 取消订单
     *
     * @return
     */
    @RequestMapping("cancel.html")
    public String cancel(Model model, Integer orderId, String env) {
        try {
            TbOrder order = hotelOrderService.cancelOrder(orderId);
            if (order != null) {
                model.addAttribute("order", order);
                TbRoomType type = hotelOrderService.getRoomType(order.getTypeId(), env);
                model.addAttribute("room", type);
                DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
                model.addAttribute("startDate", df.format(order.getStartDate()));
                model.addAttribute("endDate", df.format(order.getEndDate()));
                List<String> numList = new ArrayList<String>();
                for (String num : order.getCheckCount().split(",")) {
                    numList.add(num);
                }
                model.addAttribute("numList", numList);
            }
        } catch (Exception e) {
            logger.error("查询订单信息失败！", e);
        }
        return "sunshine/result";
    }

    /**
     * 保存用户信息
     *
     * @param user
     * @return
     */
    @ResponseBody
    @RequestMapping("saveOrder.ajax")
    public AjaxJson saveUser(TbOrder order, String env) {
        AjaxJson result = new AjaxJson();
        try {
            hotelOrderService.saveOrder(order, env);
            result.setSuccess(true);
            result.setObj(order);
        } catch (Exception e) {
            logger.error("保存订单信息失败!", e);
            result.setSuccess(false);
            result.setMsg(e.getMessage());
        }
        return result;
    }


}
