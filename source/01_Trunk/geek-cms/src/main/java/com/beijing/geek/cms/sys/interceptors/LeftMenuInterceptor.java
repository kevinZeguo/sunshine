package com.beijing.geek.cms.sys.interceptors;

import com.beijing.geek.cms.sys.constant.Globals;
import com.beijing.geek.cms.sys.dao.sys.Client;
import com.beijing.geek.cms.sys.domain.user.CmsUser;
import com.beijing.geek.cms.sys.domain.user.SysFunction;
import com.beijing.geek.cms.sys.manager.ClientManager;
import com.beijing.geek.cms.sys.service.user.SystemService;
import com.beijing.geek.cms.sys.utils.ContextHolderUtils;
import com.beijing.geek.cms.sys.utils.NumberComparator;
import com.beijing.geek.cms.sys.utils.StringUtil;
import org.apache.commons.lang.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;
import java.util.*;

/**
 * Created by mazeguo on 2017/7/6.
 */
public class LeftMenuInterceptor implements HandlerInterceptor {
    @Autowired
    private SystemService systemService;
    private static final Log logger = LogFactory.getLog(LeftMenuInterceptor.class);
    private List<String> excludeUrls = new ArrayList<>();

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object o) throws Exception {
        String contextPath = request.getContextPath();// 用户访问的资源地址
        String requestPath = request.getRequestURL().toString();

        logger.info("AuthInterceptor访问原地址信息contextPath:" + contextPath + " , 请求requestPath：" + requestPath + " , 请求参数:" + request.getQueryString() + "****");

        if (StringUtil.isNotEmpty(request.getQueryString())) {
            requestPath += "?" + request.getQueryString();
        }
        //logger.info("-----authInterceptor----requestPath------"+requestPath);
        //步骤一： 判断是否是排除拦截请求，直接返回TRUE

        if (requestPath.length() > 3 && "api/".equals(requestPath.substring(0, 4))) {
            logger.info("AuthInterceptor请求为API地址,不需要校验权限信息*******" + requestPath);
            return true;
        }

        if (excludeUrls.contains(requestPath)) {
            logger.info("AuthInterceptor请求地址不需要校验*************:" + requestPath);
            return true;
        } else {
            String url = request.getRequestURI().toString();
            if (url.indexOf(".html") > -1) {//html页面

                try {
                    //根据请求URL查询菜单信息
                    SysFunction curFunc = systemService.getMenuByUrl(url.trim());
                    //菜单没有配置 ，则不控制权限
                    if (curFunc == null) {//菜单不存在，则直接允许访问
                        return true;
                    }

                    //菜单存在
                    //获取用户信息
                    //获取用户登录信息
                    Client client = ClientManager.getInstance().getClient(ContextHolderUtils.getSession().getId());
                    //用户登录信息
                    CmsUser currLoginUser = client != null ? client.getUser() : null;
                    Map<Integer, List<SysFunction>> menuMap = getFunctionMap(currLoginUser);

                    if (menuMap == null || menuMap.size() == 0) {//未找到菜单数据
                        logger.warn("AuthInterceptor跳转到用户没有权限页面：" + requestPath);
                        response.sendRedirect(contextPath + "/noAuth.html");
                        return false;
                    }

                    //校验当前用户是否具有访问菜单的权限
                    boolean hasRight = validAuth(curFunc, menuMap);

                    Integer select_menu_id = null;
                    //没有权限
                    if (!hasRight && !curFunc.getFunctionUrl().equals("/index.html")) {
                        logger.warn("AuthInterceptor跳转到用户没有权限页面：" + requestPath);
                        response.sendRedirect(contextPath + "/noAuth.html");
                        return false;
                    } else if (!hasRight && curFunc.getFunctionUrl().equals("/index.html")) {//则默认选中有权限菜单第一个
                        if (menuMap.get(1).size() > 0) {
                            //默认跳转到有权限的第一个菜单页面
                            response.sendRedirect(contextPath + menuMap.get(1).get(0).getFunctionUrl());
                            return true;
                        } else {
                            response.sendRedirect(contextPath + "/noAuth.html");
                            return false;
                        }
                    }


                    //获取用户菜单
                    // Map<Integer, List<SysFunction>> menuMap = (Map<Integer, List<SysFunction>>) EhcacheUtil.get("user_menu", currLoginUser.getUserId());
                    //String menuData = getAceMenu(select_menu_id, level0FunMap.values());
                    //校验用户是否具有访问权限
                    //判断用户菜单选择
                    if (menuMap.size() > 1) {
                        if (StringUtil.isEmpty(curFunc.getChildMenuIds()) && curFunc.getFunctionLevel() == 0) {//1级菜单，并且没有子菜单
                            for (SysFunction firFunc : menuMap.get(0)) {
                                if (firFunc.getFunctionId().equals(curFunc.getParentFunctionId())) {//设置父菜单打开
                                    firFunc.setIsOpen(1);
                                } else {
                                    firFunc.setIsOpen(0);
                                }
                            }
                        } else {//二级菜单或是 1级菜单含有 子菜单
                            for (SysFunction secFunc : menuMap.get(1)) {
                                if (StringUtil.equals(secFunc.getFunctionMenuName(), curFunc.getFunctionMenuName())) {
                                    select_menu_id = secFunc.getFunctionId();//设置子菜单打开
                                    for (SysFunction firFunc : menuMap.get(0)) {
                                        if (firFunc.getFunctionId().equals(secFunc.getParentFunctionId())) {//设置父菜单打开
                                            firFunc.setIsOpen(1);
                                        } else {
                                            firFunc.setIsOpen(0);
                                        }
                                    }
                                }
                            }
                        }
                    }
                    request.setAttribute("select_menu_id", select_menu_id);
                    //被选中的菜单
                    //request.setAttribute("menuData", menuData);
                    request.setAttribute("leftMenuList", menuMap.get(0));
                } catch (Exception e) {
                    logger.error("拼装菜单数据失败!", e);
                }
            }
        }

        return true;
    }

    private boolean validAuth(SysFunction curFunc, Map<Integer, List<SysFunction>> menuMap) {
        if (menuMap == null || menuMap.size() == 0) {
            return false;
        }
        for (Integer menuId : menuMap.keySet()) {
            List<SysFunction> funcList = menuMap.get(menuId);
            for (SysFunction func : funcList) {
                if (func.getFunctionId().equals(curFunc.getFunctionId())) {
                    return true;
                }

                if (func.getChildMenuList() != null && func.getChildMenuList().size() > 0) {
                    for (SysFunction childFunc : func.getChildMenuList()) {
                        if (childFunc.getFunctionId().equals(curFunc.getFunctionId())) {
                            return true;
                        }
                    }
                }
            }
        }
        return false;
    }

    private String getAceMenu(Integer select_menu_id, Collection<SysFunction> functionList) {
        StringBuffer menuData = new StringBuffer();
        menuData.append("<ul class=\"nav nav-list menu-ul\" id=\"menu-ul\">");
        menuData.append("  <li class=\"\">");
        menuData.append("        <a href=\"/index.html\"> <i class=\"ace-icon fa fa-home home-icon\"></i><span class=\"menu-text\"> 首页 </span>");
        menuData.append("</a>");
        menuData.append("<b class=\"arrow\"></b>");
        menuData.append("</li>");
        //遍历菜单
        for (SysFunction func : functionList) {
            if (func.getIsOpen() == 1) {//打开
                menuData.append(" <li class=\"active open hsub\">");
            } else {
                menuData.append(" <li class=\"\">");
            }
            menuData.append(" <a href = \"#\" class=\"dropdown-toggle\">");
            menuData.append("  <i class=\"" + func.getIconclas() + "\"></i>");
            menuData.append("<span class=\"menu-text\"> " + func.getFunctionName() + " </span>");
            menuData.append("<b class=\"arrow fa fa-angle-down\"></b>");
            menuData.append("</a>");

            menuData.append(" <b class=\"arrow\"></b>");
            if (func.getChildMenuList().size() > 0) {
                menuData.append(" <ul class=\"submenu\">");
                List<SysFunction> childFunList = func.getChildMenuList();
                for (SysFunction cFunc : childFunList) {
                    if (cFunc.getFunctionId().equals(select_menu_id)) {
                        menuData.append("<li class=\" active on \">");
                    } else {
                        menuData.append("<li class=\" \">");
                    }
                    menuData.append(" <a href = \"" + cFunc.getFunctionUrl() + "\">");
                    menuData.append(" <i class=\"menu-icon fa fa-caret-right\"></i>");
                    menuData.append(cFunc.getFunctionName());
                    menuData.append(" </a>");
                    menuData.append(" <b class=\"arrow\"></b>");
                    menuData.append(" <b class=\"arrow\"></b>");


                }
                menuData.append("</ul>");

            }
            menuData.append("</li>");


        }
        menuData.append(" </ul>");
        return menuData.toString();
    }

    /**
     * 将List转换成Map
     *
     * @param functionList
     * @return
     */
    private Map<Integer, SysFunction> getFunctionMapFromList(List<SysFunction> functionList) {
        Map<Integer, SysFunction> sysFunctionMap = new LinkedHashMap<>();
        if (functionList != null && functionList.size() > 0) {
            for (SysFunction function : functionList) {
                sysFunctionMap.put(function.getFunctionId(), function);
            }
        }
        return sysFunctionMap;
    }

    private String getMenuParams(HttpServletRequest request) {
        Enumeration params = request.getParameterNames();
        String p = "";

        while (params.hasMoreElements()) {
            String key = params.nextElement().toString();
            String value = request.getParameter(key);
            if (StringUtils.equals(key, "bdp_menu_flag")) {
                p = p + key + "=" + value;
            }
        }
        return p;
    }

    public static String getAceMultistageTree(Map<Integer, List<SysFunction>> map) {
        if (map == null || map.size() == 0 || !map.containsKey(0)) {
            return "不具有任何权限,\n请找管理员分配权限";
        }
        StringBuffer menuString = new StringBuffer();
        List<SysFunction> list = map.get(0);
        int curIndex = 0;
        try {
            for (SysFunction function : list) {
                //<li class="hover"><a href="#" class="dropdown-toggle"><i class="icon-th-list"></i><span class="menu-text">testaaaa</span></a></li>
                menuString.append("<li class=\"\">");
                //菜单地址是否为空
                if (StringUtil.isNotEmpty(function.getFunctionUrl())) {
                    menuString.append("<a href=\"" + function.getFunctionUrl() + "?clickFunctionId=" + function.getFunctionId() + "\" class=\"dropdown-toggle\">");
                } else {
                    menuString.append("<a href=\"#\" class=\"dropdown-toggle\">");
                }

                menuString.append("<i class=\"menu-icon fa fa-list\"></i>");
                menuString.append("<span class=\"menu-text\">");
                menuString.append(function.getFunctionName());//国际化
                menuString.append("</span>");
                if (!function.hasSubFunction()) {//没有子菜单
                    menuString.append("</a>");
                } else {//存在子菜单
                    menuString.append("<b class=\"arrow icon-angle-down\"></b></a><ul  class=\"submenu\">");
                    menuString.append(getACESubMenu(function, 1, map));
                    menuString.append("</ul>");
                }
                menuString.append("</li>");
                curIndex++;

//            if (function.getFunctiontype() != null && !function.getFunctionIconStyle().trim().equals("")) {
//                menuString.append("<a href=\"#\" class=\"dropdown-toggle\"><i class=\"" + function.getFunctionIconStyle() + "\"></i>");
//            } else {
//                menuString.append("<a href=\"#\" class=\"dropdown-toggle\"><i class=\"" + SysACEIconEnum.toEnum(function.getIconclas()).getThemes() + "\"></i>");
//            }


//            menuString.append("<span class=\"menu-text\">");
//            menuString.append(getMutiLang(function.getFunctionName()));//国际化
//            menuString.append("</span>");
               /* int submenusize = function.getSubFunctionSize();
                if (submenusize == 0) {
                    menuString.append("</a></li>");
                }
                if (submenusize> 0) {
                    menuString.append("<b class=\"arrow\"></b><ul  class=\"submenu\">");
                }
                menuString.append(getSubMenu(function,1,map));
                if (submenusize> 0) {
                    menuString.append("</ul></li>");
                }*/


            }

        } catch (Exception e) {
            logger.error("动态拼接菜单失败！", e);
        }
        logger.debug("菜单内容: " + menuString.toString());
        return menuString.toString();
    }

    /**
     * 拼装子菜单
     *
     * @param parent
     * @param level
     * @param map
     * @return
     */
    private static String getACESubMenu(SysFunction parent, int level, Map<Integer, List<SysFunction>> map) throws Exception {
        StringBuffer menuString = new StringBuffer();
        List<SysFunction> list = map.get(level);
        for (SysFunction function : list) {
            //判断当前 菜单父Id是否与指定的父Id相同
            if (function.getParentFunctionId().equals(parent.getFunctionId())) {
                if (!function.hasSubFunction()) {
                    menuString.append(getLeafOfACETree(function, map));
//                } else {
                    //todo 现在仅支持两级菜单
//                    menuString.append("<li>");
//                    menuString.append("<span class=\"menu-text\">");
//                    menuString.append(function.getFunctionName());
////                    menuString.append(getMutiLang(function.getFunctionName()));
//                    menuString.append("</span>");
//                    menuString.append("<b class=\"arrow icon-angle-down\"></b></a><ul  class=\"submenu\">");
//                    menuString.append(getACESubMenu(function, 2, map));
//                    menuString.append("</ul></li>");
                }
            }
        }
        return menuString.toString();
    }

    /**
     * 拼装子菜单内容
     *
     * @param function
     * @param map
     * @return
     */
    private static String getLeafOfACETree(SysFunction function, Map<Integer, List<SysFunction>> map) throws Exception {
        StringBuffer menuString = new StringBuffer();
        String icon = "folder";
        if (function.getIconId() != null) { //判断是否存在图标
//            icon = ResourceUtil.allTSIcons.get(function.getIconId()).getIconclas();
        }

        //addTabs({id:\"home\",title:\"首页\",close: false,url: \"loginController.do?home\"});
        String name = function.getFunctionName();
        menuString.append("<li> <a href=\"javascript:addTabs({id:\"").append(function.getFunctionId());
        menuString.append("\",title:\"").append(name).append("\",close: true,url:\"");
        //添加URL跳转
        if (StringUtil.isNotEmpty(function.getFunctionUrl())) {
            menuString.append(function.getFunctionUrl());
            if (function.getFunctionUrl().indexOf("?") > -1) {
                menuString.append("&clickFunctionId=");
            } else {
                menuString.append("?clickFunctionId=");
            }
        } else {
            menuString.append("");
        }
        menuString.append(function.getFunctionId());
//		menuString.append("\\",\\"");
//		menuString.append(icon);
        menuString.append("\"})\"  title=\"");
        menuString.append(name);
        menuString.append("\" url=\"");
        menuString.append(function.getFunctionUrl());
        menuString.append("\">");
        /*ace首页风格，菜单不支持三级菜单，改造支持三级*/
        if (function.hasSubFunction()) {
            menuString.append("<i class=\"icon-double-angle-right\"></i>");
        }
        /* ace首页风格，菜单不支持三级菜单，改造支持三级*/
        menuString.append(name);
        menuString.append("</a></li>");

        logger.debug("子菜单内容: " + menuString.toString());
        return menuString.toString();
    }

    @Override
    public void postHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, ModelAndView modelAndView) throws Exception {

    }

    @Override
    public void afterCompletion(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, Exception e) throws Exception {

    }

    private Map<Integer, List<SysFunction>> getFunctionMap(CmsUser user) {
        Map<Integer, List<SysFunction>> functionMap = new HashMap<Integer, List<SysFunction>>();

        HttpSession session = ContextHolderUtils.getSession();
        Client client = ClientManager.getInstance().getClient(session.getId());
        if (client.getFunctionMap() == null || client.getFunctionMap().size() == 0) {
            //用户有权限菜单
            Map<Integer, SysFunction> loginActionlist = getUserMenus(user);
            if (loginActionlist.size() > 0) {

                Collection<SysFunction> allFunctions = loginActionlist.values();
                for (SysFunction function : allFunctions) {
                    //表单类型，不展示
                    if (function.getFunctiontype() == Globals.Function_TYPE_FROM.intValue()) {
                        if (!functionMap.containsKey(100)) {
                            functionMap.put(100, new ArrayList<SysFunction>());
                        }
                        functionMap.get(100).add(function);
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

                //一级菜单列表
                List<SysFunction> level0FunctionList = new ArrayList<>();
                //一级菜单map
                Map<Integer, SysFunction> level0FunMap = new LinkedHashMap<>();

                if (functionMap != null && functionMap.size() > 0) {
                    level0FunctionList = functionMap.get(0);
//                //level0菜单list 转换成Map
                    level0FunMap = getFunctionMapFromList(level0FunctionList);
                    if (functionMap.size() > 1) {//存在二级菜单,目前仅支持到 2级菜单
                        List<SysFunction> secFunList = functionMap.get(1);

                        for (SysFunction secFun : secFunList) {
//                            //如果当前请求地址的 标题和指定的标题一样，则选中此菜单
//                            if (StringUtil.equals(curFunc.getFunctionMenuName(), secFun.getFunctionMenuName())) {
//                                select_menu_id = secFun.getFunctionId();
////                            //父菜单是打开的
//                                level0FunMap.get(secFun.getParentFunctionId()).setIsOpen(1);
//                            }
                            SysFunction pFunc = level0FunMap.get(secFun.getParentFunctionId());
                            pFunc.getChildMenuList().add(secFun);
                        }
                    }

                }


            }
            client.setFunctionMap(functionMap);
            //清空变量，降低内存使用
            loginActionlist.clear();
            return functionMap;
        } else {
            functionMap.putAll(client.getFunctionMap());
            return functionMap;
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
                List<SysFunction> list1 = new ArrayList<>();
//                if (user.getUserName().equals("admin")) {
//                    list1 = systemService.getAllMenu(user.getUserId());
//                } else {
                list1 = systemService.getUserHasRightMenu(user.getUserId());
//                }
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

    public List<String> getExcludeUrls() {
        return excludeUrls;
    }

    public void setExcludeUrls(List<String> excludeUrls) {
        this.excludeUrls = excludeUrls;
    }
}
