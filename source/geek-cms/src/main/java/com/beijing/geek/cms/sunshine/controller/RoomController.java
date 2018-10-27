package com.beijing.geek.cms.sunshine.controller;

import com.beijing.geek.cms.sunshine.domain.RoomQueryParam;
import com.beijing.geek.cms.sunshine.domain.TbRoomType;
import com.beijing.geek.cms.sunshine.domain.TbRoomTypeInit;
import com.beijing.geek.cms.sunshine.service.HotelOrderService;
import com.beijing.geek.cms.sunshine.service.RoomTypeInitService;
import com.beijing.geek.cms.sys.domain.common.ListDataJson;
import com.beijing.geek.cms.sys.domain.user.CmsUser;
import com.beijing.geek.cms.sys.domain.user.UserQueryParam;
import com.beijing.geek.cms.sys.utils.StringUtil;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.net.URLDecoder;
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
}
