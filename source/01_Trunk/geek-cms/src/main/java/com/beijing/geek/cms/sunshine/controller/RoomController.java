package com.beijing.geek.cms.sunshine.controller;

import com.beijing.geek.cms.sunshine.domain.RoomQueryParam;
import com.beijing.geek.cms.sunshine.domain.TbRoomType;
import com.beijing.geek.cms.sunshine.domain.TbRoomTypeInit;
import com.beijing.geek.cms.sunshine.service.HotelOrderService;
import com.beijing.geek.cms.sunshine.service.RoomTypeInitService;
import com.beijing.geek.cms.sys.domain.common.AjaxJson;
import com.beijing.geek.cms.sys.domain.common.ListDataJson;
import com.beijing.geek.cms.sys.domain.user.*;
import com.beijing.geek.cms.sys.utils.StringUtil;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.net.URLDecoder;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

@Controller
@RequestMapping("/cms/room/")
public class RoomController {
    private static final Logger logger = Logger.getLogger(RoomController.class);
    @Autowired
    private RoomTypeInitService roomTypeInitService;
    @Autowired
    private HotelOrderService hotelOrderService;


    /**
     * 进入房间管理页面
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
        return "cms/hotel/room/list";
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
//            if (StringUtils.isNotEmpty(param.getOrderStartDate())) {
//                param.setOrderStartDate(param.getOutStartDate() + " 00:00:00");
//            }
//
//            if (StringUtils.isNotEmpty(param.getOrderEndDate())) {
//                param.setOrderEndDate(param.getOutEndDate() + " 23:59:59");
//            }

//            查询数据总量
            Integer totalCount = roomTypeInitService.queryRoomCountByPage(param);
            if (totalCount > 0) {
                //查询数据
                List<TbRoomTypeInit> orderList = roomTypeInitService.queryRoomListByPage(param);
                orderListData.setList(orderList);
            }
            orderListData.setRecords(totalCount);
        } catch (Exception e) {
            logger.error("查询房间列表失败!", e);
        }
        return orderListData;
    }


    /**
     * 用户查询列表页面
     *
     * @param initIds
     * @return
     */
    @ResponseBody
    @RequestMapping("openOrder.ajax")
    public AjaxJson openOrder(String initIds) {
        AjaxJson result = new AjaxJson();
        try {
            List<Integer> initIdList = getIdList(initIds);
            roomTypeInitService.openRoom(initIdList);

            result.setSuccess(Boolean.TRUE);
        } catch (Exception e) {
            logger.error("开启预约失败!", e);
            result.setSuccess(Boolean.FALSE);
            result.setMsg(e.getMessage());
        }

        return result;
    }


    /**
     * 用户查询列表页面
     *
     * @param initIds
     * @return
     */
    @ResponseBody
    @RequestMapping("closeOrder.ajax")
    public AjaxJson closeOrder(String initIds) {
        AjaxJson result = new AjaxJson();
        try {
            List<Integer> initIdList = getIdList(initIds);
            //删除用户信息
            roomTypeInitService.closeRoom(initIdList);
            result.setSuccess(Boolean.TRUE);
        } catch (Exception e) {
            logger.error("删除用户信息失败!", e);
            result.setSuccess(Boolean.FALSE);
            result.setMsg(e.getMessage());
        }

        return result;
    }

    private List<Integer> getIdList(String initIds) {
        List<Integer> idList = new ArrayList<>();
        if (StringUtil.isNotEmpty(initIds)) {
            String[] ids = initIds.split(",");
            for (String id : ids) {
                idList.add(Integer.parseInt(id));
            }
        }
        return idList;
    }

    /**
     * 进入编辑页面
     */
    @RequestMapping("edit.html")
    public String editHtml(Integer initId, Model model) {
        model.addAttribute("add", "edit");
        //根据用户Id查询用户信息
        try {
            TbRoomTypeInit init = roomTypeInitService.findById(initId);
            if (init != null) {
                DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
                init.setRoomDateStr(df.format(init.getRoomDate()));
                model.addAttribute("room", init);
            } else {//用户不存在
                logger.error("房间信息不存在!");
            }
        } catch (Exception e) {
            logger.error("查询订单信息失败!", e);
        }
        return "cms/hotel/room/add";
    }

    /**
     * 用户查询列表页面
     *
     * @param tbRoomTypeInit
     * @return
     */
    @ResponseBody
    @RequestMapping("save.ajax")
    public AjaxJson save(TbRoomTypeInit tbRoomTypeInit) {
        AjaxJson result = new AjaxJson();
        try {
            roomTypeInitService.modifyRoomInit(tbRoomTypeInit);
            result.setSuccess(Boolean.TRUE);
        } catch (Exception e) {
            logger.error("修改房间价格失败!", e);
            result.setSuccess(Boolean.FALSE);
            result.setMsg(e.getMessage());
        }

        return result;
    }


}
