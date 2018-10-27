package com.beijing.geek.cms.sys.controller.api;

import com.beijing.geek.cms.sys.domain.common.ApiAjaxJson;
import com.beijing.geek.cms.sys.domain.user.SysUser;
import com.beijing.geek.cms.sys.service.user.UserService;
import com.beijing.geek.cms.sys.utils.CmsAjaxUtil;
import com.beijing.geek.cms.util.JsonUtil;
import net.sf.json.JSONObject;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

@Controller
@RequestMapping("/api/user/")
public class UserApiController {
    private static final Logger logger = Logger.getLogger(UserApiController.class);
    @Autowired
    private UserService userService;

    /**
     * /**
     * 查询
     *
     * @param body
     * @return
     */
    @ResponseBody
    @RequestMapping("eList.ajax")
    public JSONObject list(String body) {
        ApiAjaxJson listData = new ApiAjaxJson();
        try {
            List<SysUser> users = userService.findUserListByRoleCode("engineer");
            if (users != null && users.size() > 0) {
                String[] NotIgnoreFields = new String[2];
                NotIgnoreFields[0]="password" ;
                NotIgnoreFields[1]= "userKey";
                listData.setTotalSize(users.size());
                listData.setList( JsonUtil.toJsonArray2(users, NotIgnoreFields));
            } else {
                listData.setTotalSize(0);
            }
            listData.setSuccess(Boolean.TRUE);
            listData.setCode(0);
            listData.setMessage("查询成功");
        } catch (Exception e) {
            logger.error("查询用户列表失败!", e);
            listData.setSuccess(Boolean.FALSE);
            listData.setCode(2);
            listData.setMessage("查询失败!");
        }
        return CmsAjaxUtil.apiToJSON(listData);
    }


}
