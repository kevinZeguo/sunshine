package com.beijing.geek.cms.sys.controller.api;

import com.beijing.geek.cms.sys.domain.common.*;
import com.beijing.geek.cms.sys.domain.user.SysUser;
import com.beijing.geek.cms.sys.service.common.SysAttrService;
import com.beijing.geek.cms.sys.service.common.SysFileService;
import com.beijing.geek.cms.sys.service.user.UserService;
import com.beijing.geek.cms.sys.utils.CmsAjaxUtil;
import com.beijing.geek.cms.sys.utils.StringUtil;
import net.sf.json.JSONObject;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.commons.CommonsMultipartFile;

import javax.servlet.http.HttpServletRequest;
import java.io.*;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

@Controller
@RequestMapping("/api/common/")
public class CommonApiController {
    private static final Logger logger = Logger.getLogger(CommonApiController.class);
    @Autowired
    private SysAttrService sysAttrService;

    /**
     * 查询字典列表
     *
     * @param body
     * @return
     */
    @ResponseBody
    @RequestMapping("attrList.ajax")
    public JSONObject list(String body) {
        ApiAjaxJson resultJson = new ApiAjaxJson();
        try {
            //封装查询参数
            AttrQueryParam param = (AttrQueryParam) JSONObject.toBean(JSONObject.fromObject(body), AttrQueryParam.class);
            if (StringUtil.isEmpty(param.getUserKey())) {
                throw new Exception("用户Key为空，不能保存文件信息");
            }

            List<SysAttrValue> list = sysAttrService.findByAttrGroupCode(param.getKey());
            resultJson.setList(list);
            if (list != null && list.size() > 0) {
                resultJson.setTotalSize(list.size());
            } else {
                resultJson.setTotalSize(0);
            }
            resultJson.setCode(0);
            resultJson.setSuccess(Boolean.TRUE);
            resultJson.setMessage("查询字典列表成功");
        } catch (Exception e) {
            logger.error("查询字典列表失败!", e);
            resultJson.setSuccess(Boolean.FALSE);
            resultJson.setObj("查询字典列表失败");
            resultJson.setCode(-1);
        }
        return CmsAjaxUtil.apiToJSON(resultJson);
    }


}
