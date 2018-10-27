package com.beijing.geek.cms.sunshine.controller;

import com.beijing.geek.cms.sunshine.domain.RoomQueryParam;
import com.beijing.geek.cms.sunshine.domain.TbOrder;
import com.beijing.geek.cms.sunshine.domain.TbRoomType;
import com.beijing.geek.cms.sunshine.service.HotelOrderService;
import com.beijing.geek.cms.sys.domain.common.AjaxJson;
import com.beijing.geek.cms.sys.domain.common.ListDataJson;
import com.beijing.geek.cms.sys.domain.user.CmsUser;
import com.beijing.geek.cms.sys.domain.user.SysUser;
import com.beijing.geek.cms.sys.utils.StringUtil;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.net.URLDecoder;
import java.util.List;

@Controller
@RequestMapping("/cms/order/")
public class OrderController {
    private static final Logger logger = Logger.getLogger(OrderController.class);
    @Autowired
    private HotelOrderService hotelOrderService;

    /**
     * 列表页面
     *
     * @param model
     * @return
     */
    @RequestMapping("index.html")
    public String listHtml(Model model) {
        try {
            List<TbRoomType> tbRoomTypeList = hotelOrderService.getAllRoomType();
            model.addAttribute("roomList", tbRoomTypeList);
        } catch (Exception e) {
            logger.error("查询失败!", e);
        }
        return "cms/hotel/order/list";
    }

    /**
     * 用户查询列表页面
     *
     * @param user
     * @return
     */
    @ResponseBody
    @RequestMapping("list.ajax")
    public ListDataJson list(CmsUser user, RoomQueryParam param) {
        ListDataJson orderListData = new ListDataJson();
        try {
            orderListData.setPage(param.getPage());
            orderListData.setLimit(param.getLimit());
            if (StringUtil.isNotEmpty(param.getUserKey())) {
                param.setUserKey("%" + URLDecoder.decode(param.getUserKey(), "utf-8").trim() + "%");
            }
//            查询数据总量
            Integer totalCount = hotelOrderService.queryOrderCountByPage(param);
            if (totalCount > 0) {
                //查询数据
                List<TbOrder> orderList = hotelOrderService.queryOrderListByPage(param);
                orderListData.setList(orderList);
            }
            orderListData.setRecords(totalCount);
        } catch (Exception e) {
            logger.error("查询订单列表失败!", e);
        }
        return orderListData;
    }


    /**
     * 确认订单
     *
     * @param user
     * @return
     */
    @ResponseBody
    @RequestMapping("confirm.ajax")
    public AjaxJson saveUser(Integer orderId) {
        AjaxJson result = new AjaxJson();
        try {
            TbOrder order = hotelOrderService.confirmOrder(orderId, "cn");
            result.setSuccess(true);
        } catch (Exception e) {
            logger.error("确认订单失败!", e);
            result.setSuccess(false);
            result.setMsg(e.getMessage());
        }
        return result;
    }

    /**
     * 确认订单
     *
     * @param user
     * @return
     */
    @ResponseBody
    @RequestMapping("delete.ajax")
    public AjaxJson delete(Integer orderId) {
        AjaxJson result = new AjaxJson();
        try {
            hotelOrderService.deletedOrder(orderId, "cn");
            result.setSuccess(true);
        } catch (Exception e) {
            logger.error("确认订单失败!", e);
            result.setSuccess(false);
            result.setMsg(e.getMessage());
        }
        return result;
    }
}
