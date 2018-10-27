package com.beijing.geek.cms.sys.spring;

import org.springframework.beans.BeansException;
import org.springframework.context.ApplicationContext;
import org.springframework.context.ApplicationContextAware;

/**
 * Created by mazeguo on 2017/5/28.
 */
public class ApplicationContextHolder implements ApplicationContextAware {
    private static ApplicationContext a;

    public ApplicationContextHolder() {
    }

    public static ApplicationContext getApplicationContext() {
        return a;
    }

    public void setApplicationContext(ApplicationContext applicationContext) throws BeansException {
        a = applicationContext;
    }
}
