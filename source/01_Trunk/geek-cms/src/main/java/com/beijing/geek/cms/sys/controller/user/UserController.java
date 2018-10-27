package com.beijing.geek.cms.sys.controller.user;

import com.alibaba.fastjson.JSONObject;
import com.beijing.geek.cms.sys.domain.common.AjaxJson;
import com.beijing.geek.cms.sys.domain.common.ListDataJson;
import com.beijing.geek.cms.sys.domain.user.*;
import com.beijing.geek.cms.sys.service.user.RoleService;
import com.beijing.geek.cms.sys.service.user.UserService;
import com.beijing.geek.cms.sys.utils.StringUtil;
import com.beijing.geek.cms.sys.utils.UUIDGenerator;
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
 * Created by mazeguo on 2017/5/30.
 */
@Controller
@RequestMapping("/cms/user/")
public class UserController {
    private static final Logger logger = Logger.getLogger(UserController.class);
    @Autowired
    private UserService userService;

    @Autowired
    private RoleService roleService;


    /**
     * 进入用户管理页面
     *
     * @param user
     * @param req
     * @return
     */
    @RequestMapping("index.html")
    public String listHtml(CmsUser user, HttpServletRequest req) {
        return "cms/sys/user/list";
    }

    /**
     * 用户查询列表页面
     *
     * @param user
     * @return
     */
    @ResponseBody
    @RequestMapping("list.ajax")
    public ListDataJson list(CmsUser user, UserQueryParam param) {
        ListDataJson userListData = new ListDataJson();
        try {
            userListData.setPage(param.getPage());
            userListData.setLimit(param.getLimit());
            if (StringUtil.isNotEmpty(param.getUserName())) {
                param.setUserName("%" + URLDecoder.decode(param.getUserName(), "utf-8").trim() + "%");
            }
            if (StringUtil.isNotEmpty(param.getRealName())) {
                param.setRealName("%" + URLDecoder.decode(param.getRealName().trim(), "utf-8") + "%");
            }
            //查询数据总量
            Integer totalCount = userService.queryUserCountByPage(param);
            if (totalCount > 0) {
                //查询数据
                List<CmsUser> cmsUserList = userService.queryUserListByPage(param);
                userListData.setList(cmsUserList);
            }
            userListData.setRecords(totalCount);

        } catch (Exception e) {
            logger.error("查询用户列表失败!", e);
        }
        return userListData;
    }

    /**
     * 进入编辑页面
     *
     * @param user
     * @param userId
     * @return
     */
    @RequestMapping("edit.html")
    public String editHtml(CmsUser user, Integer userId, Model model) {
        model.addAttribute("add", "edit");
        //根据用户Id查询用户信息
        try {
            SysUser editUser = userService.queryUserById(userId);

            if (editUser != null) {
                model.addAttribute("user", editUser);
            } else {//用户不存在
                logger.error("用户不存在!");
            }

            List<SysDepart> departList = userService.queryDepartList();
            model.addAttribute("departList", departList);

            //角色列表
            RoleQueryParam param = new RoleQueryParam();
            param.setStart(0);
            param.setLimit(1000);
            List<SysRole> sysRoles = roleService.queryRoleListByPage(param);
            model.addAttribute("roleList", sysRoles);

        } catch (Exception e) {
            logger.error("查询用户信息失败!", e);
        }
        return "cms/sys/user/add";
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
            List<SysDepart> departList = userService.queryDepartList();
            model.addAttribute("departList", departList);
            //角色列表
            RoleQueryParam param = new RoleQueryParam();
            param.setStart(0);
            param.setLimit(1000);
            List<SysRole> sysRoles = roleService.queryRoleListByPage(param);
            model.addAttribute("roleList", sysRoles);

        } catch (Exception e) {
            logger.error("初始化新增页面失败!", e);
        }
        return "cms/sys/user/add";
    }


    /**
     * 保存用户信息
     *
     * @param user
     * @return
     */
    @ResponseBody
    @RequestMapping("save.ajax")
    public AjaxJson saveUser(SysUser addUser, CmsUser user) {
        AjaxJson result = new AjaxJson();
        try {
            logger.info(JSONObject.toJSON(addUser).toString());
            if (addUser.getUserId() != null && addUser.getUserId() > 0) {
                //修改用户
                userService.editUser(addUser, user.getUserId());
            } else {
                userService.saveUser(addUser, user.getUserId());
            }
            result.setSuccess(true);
        } catch (Exception e) {
            logger.error("保存用户信息失败!", e);
            result.setSuccess(false);
            result.setMsg(e.getMessage());
        }
        return result;
    }

    /**
     * 进入编辑页面
     *
     * @param user
     * @param userId
     * @return
     */
    @RequestMapping("info.html")
    public String infoHtml(CmsUser user, Integer userId, Model model) {
        //根据用户Id查询用户信息
        try {
            SysUser editUser = userService.queryUserById(userId);
            if (editUser != null) {
                model.addAttribute("user", editUser);
            } else {//用户不存在
                logger.error("用户不存在!");
            }
        } catch (Exception e) {
            logger.error("查询用户信息失败!", e);
        }
        return "cms/sys/user/info";
    }


    /**
     * 用户查询列表页面
     *
     * @param userId
     * @return
     */
    @ResponseBody
    @RequestMapping("findById.ajax")
    public AjaxJson list4select(String userIds) {
        AjaxJson result = new AjaxJson();
        try {
            if (StringUtil.isEmpty(userIds)) {
                result.setSuccess(Boolean.FALSE);
                return result;
            }
            List<SysUser> userList = new ArrayList<>();
            for (String userId : userIds.split(",")) {
                SysUser user = userService.findUserById(Integer.parseInt(userId));
                userList.add(user);
            }
            //查询数据
            result.setSuccess(Boolean.TRUE);
            result.setObj(userList);

        } catch (Exception e) {
            logger.error("查询用户详情失败!", e);
            result.setSuccess(Boolean.TRUE);
        }
        return result;
    }


    /**
     * 校验用户账号是否存在
     *
     * @param addUser
     * @return
     */
    @ResponseBody
    @RequestMapping("isUserNameExist.ajax")
    public AjaxJson isUserNameExist(SysUser addUser) {
        AjaxJson result = new AjaxJson();
        try {
            boolean isExist = userService.userNameIsUsed(addUser.getUserName(), addUser.getUserId());
            JSONObject obj = new JSONObject();
            obj.put("isUsed", isExist);
            result.setObj(obj);
            result.setSuccess(true);
        } catch (Exception e) {
            logger.error("校验用户名是否已存在!", e);
            result.setSuccess(false);
            result.setMsg(e.getMessage());
        }
        return result;
    }

    /**
     * 用户查询列表页面
     *
     * @param userId
     * @return
     */
    @ResponseBody
    @RequestMapping("delete.ajax")
    public AjaxJson delete(Integer userId, CmsUser user) {
        AjaxJson result = new AjaxJson();
        try {
            //删除用户信息
            userService.deleteById(userId, user.getUserId());
            result.setSuccess(Boolean.TRUE);
        } catch (Exception e) {
            logger.error("删除用户信息失败!", e);
            result.setSuccess(Boolean.FALSE);
            result.setMsg(e.getMessage());
        }

        return result;
    }


    /**
     * 校验原密码是否正确
     *
     * @param password
     * @return
     */
    @ResponseBody
    @RequestMapping("validOldPwd.ajax")
    public AjaxJson validOldPwd(String password, CmsUser user) {
        AjaxJson result = new AjaxJson();
        try {
            //删除用户信息
            boolean isRight = userService.validOldPwdIsRight(password, user.getUserId());
            JSONObject obj = new JSONObject();
            obj.put("isRight", isRight);
            result.setSuccess(Boolean.TRUE);
            result.setObj(obj);
        } catch (Exception e) {
            logger.error("校验原始密码失败!", e);
            result.setSuccess(Boolean.FALSE);
            result.setMsg(e.getMessage());
        }

        return result;
    }

    /**
     * 校验原密码是否正确
     *
     * @param password
     * @return
     */
    @ResponseBody
    @RequestMapping("editPwd.ajax")
    public AjaxJson editPwd(String password, String oldPassword, CmsUser user) {
        AjaxJson result = new AjaxJson();
        try {
            //删除用户信息
            boolean isRight = userService.validOldPwdIsRight(oldPassword.trim(), user.getUserId());
            if (!isRight) {
                throw new RuntimeException("原密码不正确，请重新修改密码，并确认输入正确的原密码!");
            }

            //修改密码
            userService.editPwd(password.trim(), user.getUserId());
            result.setSuccess(Boolean.TRUE);
        } catch (Exception e) {
            logger.error("修改密码失败!", e);
            result.setSuccess(Boolean.FALSE);
            result.setMsg(e.getMessage());
        }
        return result;
    }


    /**
     * 初始化用户密码
     *
     * @param userId
     * @return
     */
    @ResponseBody
    @RequestMapping("initUserPwd.ajax")
    public AjaxJson initUserPwd(Integer userId, CmsUser user) {
        AjaxJson result = new AjaxJson();
        try {
            String initPwd = UUIDGenerator.generate().substring(0, 8);
            //修改密码
            userService.editPwd(initPwd, userId);
            result.setSuccess(Boolean.TRUE);
            JSONObject obj = new JSONObject();
            obj.put("pwd", initPwd);
            result.setObj(obj);
        } catch (Exception e) {
            logger.error("初始化用户密码失败!", e);
            result.setSuccess(Boolean.FALSE);
            result.setMsg(e.getMessage());
        }
        return result;
    }


    /**
     * 进入修改密码页面
     *
     * @param user
     * @return
     */
    @RequestMapping("editPwd.html")
    public String editPwdHtml(CmsUser user, Model model) {
        model.addAttribute("user", user);
        return "cms/sys/user/editPwd";
    }


}
