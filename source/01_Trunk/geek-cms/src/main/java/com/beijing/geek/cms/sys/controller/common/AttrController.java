package com.beijing.geek.cms.sys.controller.common;

import com.alibaba.fastjson.JSONObject;
import com.beijing.geek.cms.sys.domain.common.*;
import com.beijing.geek.cms.sys.domain.user.CmsUser;
import com.beijing.geek.cms.sys.domain.user.UserQueryParam;
import com.beijing.geek.cms.sys.service.common.SysAttrService;
import com.beijing.geek.cms.sys.utils.StringUtil;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.net.URLDecoder;
import java.util.List;

/**
 * Created by mazeguo on 2017/7/27.
 */
@Controller
@RequestMapping("/attr/")
public class AttrController {
    private static final Logger logger = Logger.getLogger(AttrController.class);

    @Autowired
    private SysAttrService sysAttrService;

    /**
     * 根据属性Code查询属性列表
     *
     * @param groupCode
     * @return
     */
    @ResponseBody
    @RequestMapping("findValueListByGroupCode.ajax")
    public AjaxJson findValueListByGroupCode(String groupCode) {
        AjaxJson ajaxJson = new AjaxJson();
        try {
            if (StringUtil.isEmpty(groupCode)) {
                throw new RuntimeException("参数不正确!");
            }
            List<SysAttrValue> valueList = sysAttrService.findByAttrGroupCode(groupCode);
            //处理成功
            ajaxJson.setSuccess(Boolean.TRUE);
            ajaxJson.setObj(valueList);
            ajaxJson.setMsg("查询属性列表成功");
        } catch (Exception e) {
            logger.error("查询属性列表失败!", e);
            ajaxJson.setSuccess(Boolean.FALSE);
            ajaxJson.setObj("查询属性列表失败");
        }

        return ajaxJson;
    }


    /**
     * 进入属性管理页面
     *
     * @param user
     * @return
     */
    @RequestMapping("index.html")
    public String listHtml(CmsUser user ,Model model) {
        try{
            List<SysAttrGroup> groupList = sysAttrService.queryAllAttrGroupList();
            model.addAttribute("groupList", groupList);
        }catch (Exception e){
            logger.error("查询属性失败!",e);
        }

        return "cms/sys/attr/list";
    }

    /**
     * 用户查询列表页面
     *
     * @param user
     * @return
     */
    @ResponseBody
    @RequestMapping("list.ajax")
    public ListDataJson list(CmsUser user, AttrQueryParam param) {
        ListDataJson attrListData = new ListDataJson();
        try {
            attrListData.setPage(param.getPage());
            attrListData.setLimit(param.getLimit());
            if (StringUtil.isNotEmpty(param.getKey())) {
                param.setKey("%" + URLDecoder.decode(param.getKey(), "utf-8").trim() + "%");
            }

            //查询数据总量
            Integer totalCount = sysAttrService.queryAttrCountByPage(param);
            if (totalCount > 0) {
                //查询数据
                List<SysAttrValue> attrValueList = sysAttrService.queryAttrListByPage(param);
                attrListData.setList(attrValueList);
            }
            attrListData.setRecords(totalCount);

        } catch (Exception e) {
            logger.error("查询属性列表失败!", e);
        }
        return attrListData;
    }

    /**
     * 进入编辑页面
     *
     * @param user
     * @param attrId
     * @return
     */
    @RequestMapping("edit.html")
    public String editHtml(CmsUser user, Integer attrId, Model model) {
        model.addAttribute("add", "edit");
        //根据用户Id查询用户信息
        try {
            SysAttrValue editAttr = sysAttrService.findById(attrId);
            List<SysAttrGroup> groupList = sysAttrService.queryAllAttrGroupList();
            model.addAttribute("groupList", groupList);

            if (editAttr != null) {
                model.addAttribute("attr", editAttr);
            } else {//用户不存在
                logger.error("属性为空!");
            }
        } catch (Exception e) {
            logger.error("查询属性详情失败!", e);
        }
        return "cms/sys/attr/add";
    }

    /**
     * 进入新增页面
     *
     * @param user
     * @return
     */
    @RequestMapping("add.html")
    public String addHtml(CmsUser user, Model model) {
        model.addAttribute("add", "add");
        //查询组织机构列表
        try {
            List<SysAttrGroup> groupList = sysAttrService.queryAllAttrGroupList();
            model.addAttribute("groupList", groupList);
        } catch (Exception e) {
            logger.error("进入新增属性页面失败!", e);
        }
        return "cms/sys/attr/add";
    }


    /**
     * 保存用户信息
     *
     * @param user
     * @return
     */
    @ResponseBody
    @RequestMapping("save.ajax")
    public AjaxJson saveUser(SysAttrValue attrValue, CmsUser user) {
        AjaxJson result = new AjaxJson();
        try {
            logger.info(JSONObject.toJSON(attrValue).toString());
            if (attrValue.getAttrId() != null && attrValue.getAttrId() > 0) {
                //修改用户
                sysAttrService.editAttr(attrValue, user.getUserId());
            } else {
                sysAttrService.saveAttr(attrValue, user.getUserId());
            }
            result.setSuccess(true);
        } catch (Exception e) {
            logger.error("保存属性信息失败!", e);
            result.setSuccess(false);
            result.setMsg(e.getMessage());
        }
        return result;
    }

    /**
     * 进入编辑页面
     *
     * @param user
     * @param attrId
     * @return
     */
    @RequestMapping("info.html")
    public String infoHtml(CmsUser user, Integer attrId, Model model) {
        //根据用户Id查询用户信息
        try {
            SysAttrValue attrValue = sysAttrService.findById(attrId);
            if (attrValue != null) {
                model.addAttribute("attr", attrValue);
            } else {//用户不存在
                logger.error("属性不存在!");
            }
        } catch (Exception e) {
            logger.error("查询属性详情失败!", e);
        }
        return "cms/sys/attr/info";
    }


    /**
     * 删除属性
     *
     * @param attrId
     * @return
     */
    @ResponseBody
    @RequestMapping("delete.ajax")
    public AjaxJson delete(Integer attrId, CmsUser user) {
        AjaxJson result = new AjaxJson();
        try {
            //删除用户信息
            sysAttrService.deleteById(attrId, user.getUserId());
            result.setSuccess(Boolean.TRUE);
        } catch (Exception e) {
            logger.error("删除属性失败!", e);
            result.setSuccess(Boolean.FALSE);
            result.setMsg(e.getMessage());
        }

        return result;
    }


}
