package com.beijing.geek.cms.sys.interceptors;

import com.beijing.geek.cms.sys.dao.sys.Client;
import com.beijing.geek.cms.sys.domain.user.CmsUser;
import com.beijing.geek.cms.sys.manager.ClientManager;
import com.beijing.geek.cms.sys.utils.ContextHolderUtils;
import org.apache.log4j.Logger;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;

/**
 * 登录拦截器
 * Created by mazeguo on 2017/6/9.
 */
public class LoginInterceptor implements HandlerInterceptor {
    private static final Logger logger = Logger.getLogger(LoginInterceptor.class);
    private List<String> excludeUrls = new ArrayList<>();

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object object) throws Exception {
        String contextPath = request.getContextPath();// 用户访问的资源地址
        String requestPath = request.getServletPath();
        logger.info("LoginInterceptor校验用户是否已经登录:" + contextPath + " requestPath : " + requestPath + " *********************");
        logger.debug("LoginInterceptor访问原地址信息:" + contextPath + " , 请求URL：" + requestPath + " , 请求参数:" + request.getQueryString() + "****");

        //logger.info("-----authInterceptor----requestPath------"+requestPath);
        //步骤一： 判断是否是排除拦截请求，直接返回TRUE

        if (requestPath.length() > 3 && "api/".equals(requestPath.substring(0, 4))) {
            logger.info("LoginInterceptor请求为API地址,不需要校验权限信息*******" + requestPath);
            return true;
        }

        if (excludeUrls.contains(requestPath)) {
            logger.info("LoginInterceptor请求地址不需要校验*************:" + requestPath);
            return true;
        } else {
            //步骤二： 权限控制，优先重组请求URL(考虑online请求前缀一致问题)
            //获取用户登录信息
            Client client = ClientManager.getInstance().getClient(ContextHolderUtils.getSession().getId());
            //用户登录信息
            CmsUser currLoginUser = client != null ? client.getUser() : null;
//            //仅测试阶段使用
//            client = new Client();
//            currLoginUser = new CmsUser();
//            currLoginUser.setUserId(1);
//            currLoginUser.setUserName("admin");
//            currLoginUser.setRealName("管理员");
//            client.setUser(currLoginUser);
//            ClientManager.getInstance().addClinet(ContextHolderUtils.getSession().getId(), client);

            //请求时增加用户带入
            request.setAttribute("cmsUser", currLoginUser);
            if (client != null && currLoginUser != null) {//用户具有权限
                logger.info("LoginInterceptor用户已经登录:" + contextPath + " requestPath : " + requestPath + " 用户信息:" + currLoginUser.getRealName() + " *********************");
                return true;
            } else {
                logger.info("LoginInterceptor用户未登录跳转到登录页面:" + contextPath + " requestPath : " + requestPath);
                //重定向到登录页面
                response.sendRedirect(contextPath + "/cms/login.html");
                return false;
            }

        }
    }

    @Override
    public void postHandle(HttpServletRequest httpServletRequest, HttpServletResponse httpServletResponse, Object o, ModelAndView modelAndView) throws Exception {

    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse httpServletResponse, Object o, Exception e) throws Exception {

    }

    public List<String> getExcludeUrls() {
        return excludeUrls;
    }

    public void setExcludeUrls(List<String> excludeUrls) {
        this.excludeUrls = excludeUrls;
    }
}
