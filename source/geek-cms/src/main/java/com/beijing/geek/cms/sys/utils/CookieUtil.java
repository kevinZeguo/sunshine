package com.beijing.geek.cms.sys.utils;

import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

/**
 * Created by mazeguo on 2017/5/30.
 */
public abstract class CookieUtil {
    private static Log logger = LogFactory.getLog(CookieUtil.class);
    public static final String U_KEY_ID = "_u_id_";
    public static final String U_KEY_PWD = "_u_p_";

    public CookieUtil() {
    }

    public static String getCookie(HttpServletRequest request, String key) {
        Cookie[] cookies = request.getCookies();
        if(cookies != null && cookies.length > 0) {
            Cookie[] arr$ = cookies;
            int len$ = cookies.length;

            for(int i$ = 0; i$ < len$; ++i$) {
                Cookie ck = arr$[i$];
                if(StringUtil.equals(key, ck.getName())) {
                    return ck.getValue();
                }
            }
        }

        return null;
    }

    public static Cookie get(HttpServletRequest request, String key) {
        Cookie[] cookies = request.getCookies();
        if(cookies != null && cookies.length > 0) {
            Cookie[] arr$ = cookies;
            int len$ = cookies.length;

            for(int i$ = 0; i$ < len$; ++i$) {
                Cookie ck = arr$[i$];
                if(StringUtil.equals(key, ck.getName())) {
                    return ck;
                }
            }
        }

        return null;
    }

    public static void setCookie(HttpServletResponse response, String domain, String key, String value, int maxAge) {
        Cookie cookie = new Cookie(key, value);
        cookie.setPath("/");
        cookie.setDomain(domain);
        if(maxAge > 0) {
            cookie.setMaxAge(maxAge);
        }

        response.addCookie(cookie);
    }

    public static void removeCookie(HttpServletRequest request, HttpServletResponse response, String domain, String key) {
        Cookie cookie = get(request, key);
        if(cookie != null) {
            cookie.setMaxAge(0);
            cookie.setPath("/");
            cookie.setDomain(domain);
            response.addCookie(cookie);
        }

    }}
