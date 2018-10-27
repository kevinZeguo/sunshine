package com.beijing.geek.cms.sys.controller.user;

import com.beijing.geek.cms.sys.constant.Globals;
import com.beijing.geek.cms.sys.constant.MessageConstant;
import com.beijing.geek.cms.sys.dao.sys.Client;
import com.beijing.geek.cms.sys.domain.common.AjaxJson;
import com.beijing.geek.cms.sys.domain.user.*;
import com.beijing.geek.cms.sys.manager.ClientManager;
import com.beijing.geek.cms.sys.service.user.SystemService;
import com.beijing.geek.cms.sys.service.user.UserService;
import com.beijing.geek.cms.sys.utils.*;
import org.apache.commons.lang3.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.*;


/**
 * Created by mazeguo on 2017/5/28.
 */
@Controller
@RequestMapping("/cms/")
public class LoginController {
    private static final Logger logger = Logger.getLogger(LoginController.class);
    @Autowired
    private UserService userService;
    @Autowired
    private SystemService systemService;


    /**
     * 检查用户名称
     *
     * @param userName
     * @param password
     * @param req
     * @return
     */
    @RequestMapping("checkuser.ajax")
    @ResponseBody
    public AjaxJson checkuser(String userName, String password, HttpServletRequest req) {
        HttpSession session = req.getSession();
        AjaxJson j = new AjaxJson();
        try {
            //验证码
            String randCode = req.getParameter("randCode");
            if (StringUtils.isEmpty(randCode)) {
                j.setMsg(MessageConstant.login_verifycode_Error);
                j.setSuccess(false);
            } else if (!randCode.equalsIgnoreCase(String.valueOf(session.getAttribute("randCode")))) {
                j.setMsg(MessageConstant.login_verifycode_Error);
                j.setSuccess(false);
            } else {
                CmsUser paramUser = new CmsUser();
                paramUser.setUserName(userName);
                paramUser.setPassword(password);

                //用户登录验证逻辑
                CmsUser u = userService.checkUserExits(paramUser);
                if (u == null) {
                    j.setMsg(MessageConstant.login_usernameOrPasswd_Error);
                    j.setSuccess(false);
                    return j;
                }
                if (u != null && Globals.user_status_normal.intValue() == u.getStatus()) {
                    saveLoginSuccessInfo(req, u);
                } else {
                    j.setMsg(MessageConstant.login_lock_user);
                    j.setSuccess(false);
                }
            }
        } catch (Exception e) {
            logger.error("登录失败!", e);
            j.setMsg(MessageConstant.login_login_Error);
            j.setSuccess(false);
        }

        return j;
    }


    /**
     * 保存用户登录的信息，并将当前登录用户的组织机构赋值到用户实体中；
     *
     * @param req  request
     * @param user 当前登录用户
     */
    private void saveLoginSuccessInfo(HttpServletRequest req, CmsUser user) {
        try {
            String message = null;
            List<SysDepart> departList = systemService.getUserDepartList(user.getUserId());
            user.setSysDepartList(departList);

            HttpSession session = ContextHolderUtils.getSession();

            session.setAttribute("cmsUser", user);
//            message = "用户: " + user.getUserName() + "[" + departList.get(0).getDepartName() + "]" + MessageConstant.login_login_success;

            //当前session为空 或者 当前session的用户信息与刚输入的用户信息一致时，则更新Client信息
            Client clientOld = ClientManager.getInstance().getClient(session.getId());
            if (clientOld == null || clientOld.getUser() == null || user.getUserName().equals(clientOld.getUser().getUserName())) {
                user.setLoginTime(new Date());
                user.setLogin(Boolean.TRUE);
                Client client = new Client();
                client.setIp(IpUtil.getIpAddr(req));
                client.setLoginTime(new Date());
                client.setUser(user);
                ClientManager.getInstance().addClinet(session.getId(), client);
            } else {//如果不一致，则注销session并通过session=req.getSession(true)初始化session
                ClientManager.getInstance().removeClinet(session.getId());
                user.setLogin(Boolean.FALSE);
                session.invalidate();
                session = req.getSession(true);//session初始化
                session.setAttribute("cmsUser", user);
                session.setAttribute("randCode", req.getParameter("randCode"));//保存验证码
                checkuser(user.getUserName(), user.getPassword(), req);
            }
        } catch (Exception e) {
            logger.error("封装用户session信息失败,用户:【" + user.getUserId() + "】", e);
        }

        // 添加登陆日志
//        systemService.addLog(message, Globals.Log_Type_LOGIN, Globals.Log_Leavel_INFO);
    }

    /**
     * 用户登录
     *
     * @param request
     * @return
     */
    @RequestMapping("login.html")
    public String login(ModelMap modelMap, HttpServletRequest request, HttpServletResponse response) {
        return "cms/login/login";
    }

    /**
     * 用户登录
     *
     * @param request
     * @return
     */
    @RequestMapping("index.html")
    public String home(ModelMap modelMap, HttpServletRequest request, HttpServletResponse response) {
        String roles = "";
        try {
            HttpSession session = request.getSession();
            CmsUser user = ClientManager.getInstance().getClient(session.getId()).getUser();
            if (user != null) {
//                List<SysPermission> permissionList = systemService.getUserPermission(user.getUserId());
//                for (SysPermission ru : permissionList) {
//                    roles += ru.getRoleName() + ",";
//                }
//                if (roles.length() > 0) {
//                    roles = roles.substring(0, roles.length() - 1);
//                }
//                modelMap.put("roleName", roles.length() > 3 ? roles.substring(0, 3) + "..." : roles);
//                modelMap.put("roleName", "系统管理员");
//                modelMap.put("userName", user.getUserName().length() > 5 ? user.getUserName().substring(0, 5) + "..." : user.getUserName());
//                modelMap.put("departName", "系统管理员");
//                modelMap.put("realName", user.getRealName());
//                modelMap.put("departName", ClientManager.getInstance().getClient().getUser().getSysDepartList().get(0).getDepartName());

                //获取用户的菜单
                Map<Integer, List<SysFunction>> menuMap = getFunctionMap(user);
                request.setAttribute("menuMap", menuMap);
                //将菜单数据放入缓存
                EhcacheUtil.put("user_menu", user.getUserId(), menuMap);

                Cookie cookie = new Cookie("GEEKCMSINDEXSTYLE", "FUXS");
                //设置cookie有效期为一个月
                cookie.setMaxAge(3600 * 24 * 30);
                response.addCookie(cookie);

                Cookie zIndexCookie = new Cookie("ZINDEXNUMBER", "1990");
                zIndexCookie.setMaxAge(3600 * 24);//一天
                response.addCookie(zIndexCookie);
                return "cms/home";
            } else {
                return "cms/login/login";
            }
        } catch (Exception e) {
            logger.error("登录失败,", e);
            return "cms/login/login";
        }

    }

    /**
     * 退出系统
     *
     * @param request
     * @return
     */
    @RequestMapping("logout.ajax")
    public ModelAndView logout(HttpServletRequest request) {
        HttpSession session = ContextHolderUtils.getSession();
        CmsUser user = ClientManager.getInstance().getClient(session.getId()).getUser();

        try {
            logger.info("用户" + user != null ? user.getUserName() : "" + "已退出" + Globals.Log_Type_EXIT + Globals.Log_Leavel_INFO);
//            systemService.addLog("用户" + user != null ? user.getUserName() : "" + "已退出", Globals.Log_Type_EXIT, Globals.Log_Leavel_INFO);
        } catch (Exception e) {
            logger.error(e.toString());
        }

        ClientManager.getInstance().removeClinet(session.getId());
        session.invalidate();
        //删除缓存中菜单数据
        EhcacheUtil.remove("user_menu", user.getUserId());
        ModelAndView modelAndView = new ModelAndView(new RedirectView("/cms/login.html"));
        return modelAndView;
    }

//    /**
//     * 菜单跳转
//     *
//     * @return
//     */
//    @RequestMapping(params = "left")
//    public ModelAndView left(HttpServletRequest request) {
//        HttpSession session = ContextHolderUtils.getSession();
//        CmsUser user = ClientManager.getInstance().getClient(session.getId()).getUser();
//        ModelAndView modelAndView = new ModelAndView();
//        // 登陆者的权限
//        if (user == null || user.getUserId() == null) {
//            session.removeAttribute(Globals.USER_SESSION);
//            modelAndView.setView(new RedirectView("login.html"));
//        } else {
//            modelAndView.setViewName("main/left");
//            request.setAttribute("menuMap", getFunctionMap(user));
//        }
//        return modelAndView;
//    }

    /**
     * 获取权限的map
     *
     * @param user
     * @return
     */
    private Map<Integer, List<SysFunction>> getFunctionMap(CmsUser user) {
        HttpSession session = ContextHolderUtils.getSession();
        Client client = ClientManager.getInstance().getClient(session.getId());
        if (client.getFunctionMap() == null || client.getFunctionMap().size() == 0) {

            Map<Integer, List<SysFunction>> functionMap = new HashMap<Integer, List<SysFunction>>();
            //用户有权限菜单
            Map<Integer, SysFunction> loginActionlist = getUserMenus(user);
            if (loginActionlist.size() > 0) {

                Collection<SysFunction> allFunctions = loginActionlist.values();
                for (SysFunction function : allFunctions) {
                    //表单类型，不展示
                    if (function.getFunctiontype() == Globals.Function_TYPE_FROM.intValue()) {
                        //如果为表单或者弹出 不显示在系统菜单里面
                        continue;
                    }
                    if (!functionMap.containsKey(function.getFunctionLevel() + 0)) {
                        functionMap.put(function.getFunctionLevel() + 0, new ArrayList<SysFunction>());
                    }
                    functionMap.get(function.getFunctionLevel() + 0).add(function);
                }
                // 菜单栏排序
                Collection<List<SysFunction>> c = functionMap.values();
                for (List<SysFunction> list : c) {
                    Collections.sort(list, new NumberComparator());
                }
            }
            client.setFunctionMap(functionMap);
            //清空变量，降低内存使用
            loginActionlist.clear();
            return functionMap;
        } else {
            return client.getFunctionMap();
        }
    }

    /**
     * 获取用户菜单列表
     *
     * @param user
     * @return
     */
    private Map<Integer, SysFunction> getUserMenus(CmsUser user) {
        try {
            HttpSession session = ContextHolderUtils.getSession();
            Client client = ClientManager.getInstance().getClient(session.getId());

            if (client.getFunctions() == null || client.getFunctions().size() == 0) {
                Map<Integer, SysFunction> loginActionlist = new HashMap<Integer, SysFunction>();
                //先根据用户角色查询用户有权限的菜单
                //todo 根据用户部门查询有权限的菜单后续实现
                List<SysFunction> list1 = systemService.getUserHasRightMenu(user.getUserId());
                for (SysFunction function : list1) {
                    loginActionlist.put(function.getFunctionId(), function);
                }
                client.setFunctions(loginActionlist);
                //清空变量，降低内存使用
                list1.clear();
            }
            return client.getFunctions();
        } catch (Exception e) {
            logger.error("查询用户有权限的菜单失败！", e);
        }
        return new HashMap<Integer, SysFunction>();
    }

    /**
     * 首页跳转
     *
     * @return
     */
//    @RequestMapping("home.html")
//    public String home(HttpServletRequest request, ModelMap modelMap, CmsUser cmsUser) {
//        modelMap.put("userName", cmsUser.getUserName());
//        modelMap.put("realName", cmsUser.getRealName());
//        modelMap.put("menuMap", cmsUser.get)
//        return "main/main";
//    }

//    /**
//     * @param request
//     * @return ModelAndView
//     * @throws
//     * @Title: top
//     * @Description: bootstrap头部菜单请求
//     */
//    @RequestMapping(params = "top")
//    public ModelAndView top(HttpServletRequest request) {
//        HttpSession session = ContextHolderUtils.getSession();
//        CmsUser user = ClientManager.getInstance().getClient(session.getId()).getUser();
//        // 登陆者的权限
//        if (user.getUserId() == null) {
//            session.removeAttribute(Globals.USER_SESSION);
//            return new ModelAndView(
//                    new RedirectView("login.html"));
//        }
//        request.setAttribute("menuMap", getFunctionMap(user));
//        return new ModelAndView("main/bootstrap_top");
//    }

    /**
     * 无权限页面提示跳转
     *
     * @return
     */
    @RequestMapping("noAuth.html")
    public String noAuth(HttpServletRequest request) {
        return "cms/common/noAuth";
    }

    @RequestMapping("goPwdInit.html")
    public String goPwdInit() {
        return "login/pwd_init";
    }


}
