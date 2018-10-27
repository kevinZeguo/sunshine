package com.beijing.geek.cms.sys.controller.api;

import com.beijing.geek.cms.sys.constant.MessageConstant;
import com.beijing.geek.cms.sys.domain.common.ApiAjaxJson;
import com.beijing.geek.cms.sys.domain.user.*;
import com.beijing.geek.cms.sys.service.user.SystemService;
import com.beijing.geek.cms.sys.service.user.UserService;
import com.beijing.geek.cms.sys.utils.*;
import net.sf.json.JSONObject;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.*;

/**
 * Created by mazeguo on 2017/5/28.
 */
@Controller
@RequestMapping("/api/")
public class LoginApiController {
    private static final Logger logger = Logger.getLogger(LoginApiController.class);
    @Autowired
    private UserService userService;
    @Autowired
    private SystemService systemService;


    /**
     * 登录
     *
     * @param body
     * @return
     */
    @RequestMapping("login.ajax")
    @ResponseBody
    public JSONObject login(String body) {
        logger.info("用户登录,请求参数：" + body);
        ApiAjaxJson result = new ApiAjaxJson();
        try {
            JSONObject userObj = JSONObject.fromObject(body);
            String userName = "";
            String password = "";
            if (userObj.containsKey("userName")) {
                userName = userObj.getString("userName");
            }
            if (userObj.containsKey("password")) {
                password = userObj.getString("password");
            }
            CmsUser paramUser = new CmsUser();
            paramUser.setUserName(userName);
            paramUser.setPassword(password);

            //用户登录验证逻辑
            CmsUser u = userService.checkUserExits(paramUser);
            if (u != null) {
                //获取用户部门信息
                List<SysDepart> departs = systemService.getUserDepartList(u.getUserId());
                if (departs != null && departs.size() > 0) {
                    u.setDepartName(departs.get(0).getDepartName());
                }
                result.setMessage("登录成功");
                result.setSuccess(true);
                result.setCode(0);
                result.setObj(u);
            } else {
                result.setMessage("用户名或密码不正确");
                result.setSuccess(false);
                result.setCode(1);
            }
        } catch (Exception e) {
            logger.error("登录失败!", e);
            result.setMessage(MessageConstant.login_login_Error);
            result.setSuccess(false);
            result.setCode(1);
        }
        return CmsAjaxUtil.apiToJSON(result);
    }


}
