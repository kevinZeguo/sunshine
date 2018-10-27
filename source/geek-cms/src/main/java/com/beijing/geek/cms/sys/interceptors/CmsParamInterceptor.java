package com.beijing.geek.cms.sys.interceptors;

import com.beijing.geek.cms.sys.utils.IpUtil;
import org.apache.commons.lang.time.DateFormatUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.Date;

/**
 * Created by mazeguo on 2017/7/6.
 */
public class CmsParamInterceptor implements HandlerInterceptor {
    private static final Log logger = LogFactory.getLog(CmsParamInterceptor.class);
    private static final String VERSION = DateFormatUtils.format(new Date(System.currentTimeMillis()), "yyyyMMddHH");
    private String cmsDomain;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object o) throws Exception {
        String url = request.getRequestURL().toString();
        if (url.indexOf(".html") > -1) {
            logger.debug(" ------------------- CmsDomain=  " + this.cmsDomain + " " + url + " 进入BdpParamInterceptor拦截器 ------------------------");
            request.setAttribute("aceStaticVersion", VERSION);
            request.setAttribute("staticVersion", VERSION);

            request.setAttribute("domain", this.cmsDomain);

            try {
                request.setAttribute("tt_hostIp", IpUtil.getFirstNonLoopBackAddress(true, false));
            } catch (Exception var6) {
                logger.warn("获取本地ip失败！");
            }

            request.setAttribute("tt_now", DateFormatUtils.format(new Date(), "yyyyMMdd_HHmmss"));
        }

        return true;
    }

    @Override
    public void postHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, ModelAndView modelAndView) throws Exception {

    }

    @Override
    public void afterCompletion(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, Exception e) throws Exception {

    }

    public String getCmsDomain() {
        return cmsDomain;
    }

    public void setCmsDomain(String cmsDomain) {
        this.cmsDomain = cmsDomain;
    }
}
