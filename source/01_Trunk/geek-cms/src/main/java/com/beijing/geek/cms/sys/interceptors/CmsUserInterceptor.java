package com.beijing.geek.cms.sys.interceptors;

import com.beijing.geek.cms.sys.domain.user.CmsUser;
import com.beijing.geek.cms.sys.domain.user.SysUser;
import com.beijing.geek.cms.sys.service.user.UserService;
import com.beijing.geek.cms.sys.utils.CookieUtil;
import org.apache.commons.lang3.StringUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by mazeguo on 2017/5/30.
 */
public class CmsUserInterceptor implements HandlerInterceptor {
    private static final Log logger = LogFactory.getLog(CmsUserInterceptor.class);
    @Autowired
    private UserService userService;
    private String cookieDomain = "beijing-sql.sys.fusheng";


    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        String url = request.getRequestURL().toString();
        logger.debug(" ------------------- cookieDomain=  " + this.cookieDomain + " " + url + " 进入ErpToBdpInterceptor拦截器 ------------------------");
        if (url.indexOf(".ajax") > -1 || url.indexOf(".html") > -1 || url.indexOf(".jsp") > -1) {
            String user_descd = CookieUtil.getCookie(request, "_c_k_u");
            String pwd_descd = CookieUtil.getCookie(request, "_c_v_p");
            String userId_descd = CookieUtil.getCookie(request, "_c_v_id");
            CmsUser user = (CmsUser) request.getAttribute("cmsUser");
            if (user == null) {
                user = new CmsUser();
            }
            Integer userId = null;
            if (StringUtils.isNoneBlank(userId_descd)) {
                userId = Integer.parseInt(userId_descd);
                //查询用户信息及菜单信息
            }

            if (StringUtils.isNotBlank(user_descd) && StringUtils.isNotBlank(pwd_descd)) {
                user.setLogin(true);
                user.setUserName(user_descd);
                user.setV(pwd_descd);
                user.setUserId(userId);
            }

            request.setAttribute("cmsUser", user);
        }

        return true;
    }

    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
    }

    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object handler, Exception ex) throws Exception {
    }


    private String getCookieValue(HttpServletRequest request, String cookieName) {
        Cookie[] c = request.getCookies();
        if (c == null) {
            return null;
        } else {
            Cookie[] var4 = c;
            int var5 = c.length;

            for (int var6 = 0; var6 < var5; ++var6) {
                Cookie cookie = var4[var6];
                if (cookieName.equals(cookie.getName())) {
                    return cookie.getValue();
                }
            }

            return null;
        }
    }
}
