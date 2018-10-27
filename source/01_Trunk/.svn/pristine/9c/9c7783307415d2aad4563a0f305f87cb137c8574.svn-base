package com.beijing.geek.cms.sys.spring;

import com.beijing.geek.cms.sys.domain.user.CmsUser;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;
import org.springframework.core.MethodParameter;
import org.springframework.web.bind.support.WebDataBinderFactory;
import org.springframework.web.context.request.NativeWebRequest;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.method.support.ModelAndViewContainer;

import javax.servlet.http.HttpServletRequest;

/**
 * Created by mazeguo on 2017/5/28.
 */
public class CmsUserArgumentResolver implements HandlerMethodArgumentResolver {
    private static final Log logger = LogFactory.getLog(CmsUserArgumentResolver.class);

    public CmsUserArgumentResolver() {
    }

    public boolean supportsParameter(MethodParameter parameter) {
        return parameter.getParameterType().equals(CmsUser.class);
    }

    public Object resolveArgument(MethodParameter parameter, ModelAndViewContainer mavContainer, NativeWebRequest webRequest, WebDataBinderFactory binderFactory) throws Exception {
        HttpServletRequest request = (HttpServletRequest)webRequest.getNativeRequest();
        return (CmsUser)request.getAttribute("cmsUser");
    }
}
