package com.beijing.geek.cms.sys.interceptors;

import com.beijing.geek.cms.sys.dao.sys.Client;
import com.beijing.geek.cms.sys.domain.user.CmsUser;
import com.beijing.geek.cms.sys.manager.ClientManager;
import com.beijing.geek.cms.sys.service.user.SystemService;
import com.beijing.geek.cms.sys.utils.ContextHolderUtils;
import com.beijing.geek.cms.sys.utils.ResourceUtil;
import com.beijing.geek.cms.sys.utils.StringUtil;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;


/**
 * 权限拦截器
 * <p/>
 * Created by mazeguo on 2017/6/9.
 */
public class AuthInterceptor implements HandlerInterceptor {
    private static final Logger logger = Logger.getLogger(AuthInterceptor.class);
    @Autowired
    private SystemService systemService;
    private List<String> excludeUrls = new ArrayList<>();

    /**
     * 在controller后拦截
     */
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, Object object, Exception exception) throws Exception {
    }

    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object object, ModelAndView modelAndView) throws Exception {
    }

    /**
     * 在controller前拦截
     */
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object object) throws Exception {
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
            logger.info(requestPath+"                 " + requestPath.indexOf("html"));
            if (requestPath.indexOf(".html") >= 0) {
                logger.info("AuthInterceptor请求地址是html页面,请求路径：" + requestPath);
                //步骤二： 权限控制，优先重组请求URL(考虑online请求前缀一致问题)
                String clickFunctionId = request.getParameter("clickFunctionId");
                //获取用户登录信息
                Client client = ClientManager.getInstance().getClient(ContextHolderUtils.getSession().getId());
                CmsUser cmsUser = (CmsUser) request.getAttribute("cmsUser");
                //用户登录信息
                CmsUser currLoginUser = client != null ? client.getUser() : null;
                logger.info("AuthInterceptor用户登录信息:*************:" + currLoginUser.getUserName() + " ,请求地址：" + requestPath);
                //步骤三：  根据重组请求URL,进行权限授权判断
                //请求不是以ajax结尾的，则 需要校验是否具有权限
                if ((!hasMenuAuth(requestPath, clickFunctionId, currLoginUser)) && !currLoginUser.getUserName().equals("admin")) {
                    logger.info("AuthInterceptor跳转到用户没有权限页面：" + requestPath);
                    response.sendRedirect(contextPath + "/noAuth.html");
                    return false;
                } else {
                    logger.info("AuthInterceptor用户【" + currLoginUser.getUserName() + "】具有当前页面的访问权限：" + requestPath);
                    return true;
                }
            } else {
                logger.info("AuthInterceptor非html路径页面不需要校验权限：" + requestPath);
                return true;
            }
        }
    }

    /**
     * 判断用户是否有菜单访问权限
     *
     * @param requestPath
     * @param clickFunctionId
     * @param currLoginUser
     * @return
     */
    private boolean hasMenuAuth(String requestPath, String clickFunctionId, CmsUser currLoginUser) {
        Integer userid = currLoginUser.getUserId();
        try {
//            //step.1 先判断请求是否配置菜单，没有配置菜单默认不作权限控制
//            Long hasMenuCount = systemService.getMenuCount(requestPath);
//            if (hasMenuCount <= 0) {
//                return true;
//            }
            //step.2 判断菜单是否有角色权限
            boolean hasRight = this.systemService.userHasMenuAuth(requestPath, userid);
            if (!hasRight) {
                //step.3 判断菜单是否有组织机构角色权限
                //todo 目前仅支持用户权限，后续可以支持 部门权限
                return false;
            } else {
                return true;
            }
        } catch (Exception e) {
            logger.error("判断用户是否具有指定菜单权限失败，用户Id：【" + currLoginUser.getUserId() + "】,菜单：【" + requestPath + "】", e);
            return false;
        }
    }


    /**
     * 转发
     *
     * @param request
     * @return
     */
    @RequestMapping(params = "forword")
    public ModelAndView forword(HttpServletRequest request) {
        return new ModelAndView(new RedirectView("/login.html"));
    }

    private void forward(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {

        //超时，未登陆页面跳转
        //response.sendRedirect(request.getServletContext().getContextPath()+"/loginController.do?login");

        response.sendRedirect(request.getContextPath() + "/webpage/login/timeout.jsp");

        //request.getRequestDispatcher("loginController.do?login").forward(request, response);

    }

    public List<String> getExcludeUrls() {
        return excludeUrls;
    }

    public void setExcludeUrls(List<String> excludeUrls) {
        this.excludeUrls = excludeUrls;
    }
}
