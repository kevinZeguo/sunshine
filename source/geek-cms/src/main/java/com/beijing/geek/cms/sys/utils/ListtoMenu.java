package com.beijing.geek.cms.sys.utils;

import com.beijing.geek.cms.sys.domain.user.SysFunction;
import org.apache.log4j.Logger;

import java.util.List;
import java.util.Map;


/**
 * 动态菜单栏生成
 *
 * @author 张代浩
 *         update-begin--Author:jg_longjb龙金波  Date:20150313 for：本文件中所有.getSysFunctions().size()替换为.getSubFunctionSize();
 *         update-begin--Author:jg_gudongli辜栋利  Date:20150516 for：本文件中所有.getSubFunctionSize()替换为hasSubFunction()
 *         获取是否有子节点不用查询数据库;
 */
public class ListtoMenu {
    private static final Logger logger = Logger.getLogger(ListtoMenu.class);


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
                menuString.append("<li class=\"hover\">");
                //菜单地址是否为空
                if (StringUtil.isNotEmpty(function.getFunctionUrl())) {
                    menuString.append("<a href='" + function.getFunctionUrl() + "?clickFunctionId=" + function.getFunctionId() + "' class=\"dropdown-toggle\">");
                } else {
                    menuString.append("<a href='#' class=\"dropdown-toggle\">");
                }

                menuString.append("<i class=\"icon-th-list\"></i>");
                menuString.append("<span class=\"menu-text\">");
                menuString.append(function.getFunctionName());//国际化
                menuString.append("</span>");
                if (!function.hasSubFunction()) {//没有子菜单
                    menuString.append("</a>");
                } else {//存在子菜单
                    menuString.append("<b class=\"arrow icon-angle-down\"></b></a><ul  class=\"submenu\" >");
                    menuString.append(getACESubMenu(function, 1, map));
                    menuString.append("</ul>");
                }
                menuString.append("</li>");
                curIndex++;

//            if (function.getFunctiontype() != null && !function.getFunctionIconStyle().trim().equals("")) {
//                menuString.append("<a href=\"#\" class=\"dropdown-toggle\" ><i class=\"" + function.getFunctionIconStyle() + "\"></i>");
//            } else {
//                menuString.append("<a href=\"#\" class=\"dropdown-toggle\" ><i class=\"" + SysACEIconEnum.toEnum(function.getIconclas()).getThemes() + "\"></i>");
//            }


//            menuString.append("<span class=\"menu-text\">");
//            menuString.append(getMutiLang(function.getFunctionName()));//国际化
//            menuString.append("</span>");
               /* int submenusize = function.getSubFunctionSize();
                if (submenusize == 0) {
                    menuString.append("</a></li>");
                }
                if (submenusize > 0) {
                    menuString.append("<b class=\"arrow\"></b><ul  class=\"submenu\" >");
                }
                menuString.append(getSubMenu(function,1,map));
                if (submenusize > 0) {
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
//                    menuString.append("<b class=\"arrow icon-angle-down\"></b></a><ul  class=\"submenu\" >");
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

        //addTabs({id:'home',title:'首页',close: false,url: 'loginController.do?home'});
        String name = function.getFunctionName();
        menuString.append("<li> <a href=\"javascript:addTabs({id:\'").append(function.getFunctionId());
        menuString.append("\',title:\'").append(name).append("\',close: true,url:\'");
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
//		menuString.append("\',\'");
//		menuString.append(icon);
        menuString.append("\'})\"  title=\"");
        menuString.append(name);
        menuString.append("\" url=\"");
        menuString.append(function.getFunctionUrl());
        menuString.append("\"  >");
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


}