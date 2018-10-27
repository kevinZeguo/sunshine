package com.beijing.geek.cms.sys.controller.user;

import com.alibaba.fastjson.JSONObject;
import com.beijing.geek.cms.sys.domain.common.AjaxJson;
import com.beijing.geek.cms.sys.domain.common.ListDataJson;
import com.beijing.geek.cms.sys.domain.user.*;
import com.beijing.geek.cms.sys.service.user.RoleService;
import com.beijing.geek.cms.sys.service.user.SystemService;
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
import java.util.ArrayList;
import java.util.List;

/**
 * Created by mazeguo on 2017/7/15.
 */
@Controller
@RequestMapping("/cms/role/")
public class RoleController {
    private static final Logger logger = Logger.getLogger(UserController.class);
    @Autowired
    private RoleService roleService;
    @Autowired
    private SystemService systemService;

    /**
     * 权限列表
     *
     * @param user
     * @param req
     * @return
     */
    @RequestMapping("index.html")
    public String listHtml(CmsUser user, HttpServletRequest req) {
        return "cms/sys/role/list";
    }

    /**
     * 角色列表
     *
     * @param user
     * @return
     */
    @ResponseBody
    @RequestMapping("list.ajax")
    public ListDataJson list(CmsUser user, RoleQueryParam param) {
        ListDataJson roleListData = new ListDataJson();
        try {
            roleListData.setPage(param.getPage());
            roleListData.setLimit(param.getLimit());
            if (StringUtil.isNotEmpty(param.getRoleName())) {
                param.setRoleName("%" + URLDecoder.decode(param.getRoleName(), "utf-8").trim() + "%");
            }
            //查询数据总量
            Integer totalCount = roleService.queryRoleCountByPage(param);
            if (totalCount > 0) {
                //查询数据
                List<SysRole> cmsUserList = roleService.queryRoleListByPage(param);
                roleListData.setList(cmsUserList);
            }
            roleListData.setRecords(totalCount);

        } catch (Exception e) {
            logger.error("查询角色列表失败!", e);
        }
        return roleListData;
    }

    /**
     * 新增角色
     *
     * @param user
     * @param model
     * @return
     */
    @RequestMapping("add.html")
    public String addHtml(CmsUser user, Model model) {
        model.addAttribute("add", "add");
        return "cms/sys/role/add";
    }

    /**
     * 编辑角色
     *
     * @param user
     * @param model
     * @return
     */
    @RequestMapping("edit.html")
    public String editHtml(CmsUser user, Integer roleId, Model model) {
        model.addAttribute("add", "edit");
        try {
            SysRole role = roleService.findRoleById(roleId);
            model.addAttribute("role", role);
        } catch (Exception e) {
            logger.error("进入编辑角色页面失败", e);
        }
        return "cms/sys/role/add";
    }


    /**
     * 保存角色信息
     *
     * @param user
     * @return
     */
    @ResponseBody
    @RequestMapping("save.ajax")
    public AjaxJson saveUser(SysRole role, CmsUser user) {
        AjaxJson result = new AjaxJson();
        try {
            logger.info(JSONObject.toJSON(role).toString());
            if (role.getRoleId() != null && role.getRoleId() > 0) {
                //修改用户
                roleService.editRole(role, user.getUserId());
            } else {
                roleService.saveRole(role, user.getUserId());
            }
            result.setSuccess(true);
        } catch (Exception e) {
            logger.error("保存角色信息失败!", e);
            result.setSuccess(false);
            result.setMsg(e.getMessage());
        }
        return result;
    }


    /**
     * 保存角色信息
     *
     * @param user
     * @return
     */
    @ResponseBody
    @RequestMapping("delete.ajax")
    public AjaxJson deleteRole(Integer roleId, CmsUser user) {
        AjaxJson result = new AjaxJson();
        try {

            //删除角色
            roleService.deleteRole(roleId, user.getUserId());
            result.setSuccess(true);
        } catch (Exception e) {
            logger.error("删除角色失败!", e);
            result.setSuccess(false);
            result.setMsg(e.getMessage());
        }
        return result;
    }


    /**
     * 查询菜单列表角色信息
     *
     * @param user
     * @return
     */
    @ResponseBody
    @RequestMapping("menulist.ajax")
    public AjaxJson menulist(Integer roleId, CmsUser user) {
        AjaxJson result = new AjaxJson();
        try {
            List<SysFunction> sysFunctions = new ArrayList<>();
            if (roleId != null && roleId > 0) {
                //查询菜单和角色信息
                sysFunctions = systemService.queryRightMenuListByRoleId(roleId, user.getUserId());
                for (SysFunction function : sysFunctions) {
                    if (function.getRoleId() != null && function.getRoleId() > 0) {
                        function.setChecked(true);
                    }
                    if (function.getParentFunctionId() == -1) {
                        function.setIsParent(true);
                    }
                }
            }
            result.setObj(sysFunctions);
            result.setSuccess(true);
        } catch (Exception e) {
            logger.error("查询菜单和权限信息!", e);
            result.setSuccess(false);
            result.setMsg(e.getMessage());
        }
        return result;
    }

    /**
     * 保存角色下的菜单
     *
     * @param user
     * @return
     */
    @ResponseBody
    @RequestMapping("saveMenuRight.ajax")
    public AjaxJson saveMenuRight(Integer roleId, String functionIds, CmsUser user) {
        AjaxJson result = new AjaxJson();
        try {
            List<Integer> funIds = new ArrayList<>();
            if (StringUtils.isNotBlank(functionIds)) {
                for (String fId : functionIds.split(",")) {
                    funIds.add(Integer.parseInt(fId));
                }
            }
            systemService.saveMenuRight(roleId, funIds, user.getUserId());
            result.setSuccess(true);
        } catch (Exception e) {
            logger.error("保存菜单和权限信息!", e);
            result.setSuccess(false);
            result.setMsg(e.getMessage());
        }
        return result;
    }

    /**
     * 新增角色
     *
     * @param roleId
     * @param model
     * @return
     */
    @RequestMapping("addUser.html")
    public String addUserHtml(Integer roleId, Model model) {
        model.addAttribute("roleId", roleId);
        return "cms/sys/role/addUser";
    }

}
