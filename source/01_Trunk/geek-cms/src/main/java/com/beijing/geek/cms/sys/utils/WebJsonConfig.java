package com.beijing.geek.cms.sys.utils;

import net.sf.json.JsonConfig;

import java.sql.Timestamp;
import java.util.Date;

/**
 * Created by mazeguo on 2017/8/8.
 */
public class WebJsonConfig extends JsonConfig {
    private static WebJsonConfig instance = new WebJsonConfig();

    public static WebJsonConfig getInstance() {
        return instance;
    }

    private WebJsonConfig() {
        this.registerJsonValueProcessor(Date.class, new MyDateJsonValueProcessor());
        this.registerJsonValueProcessor(java.sql.Date.class, new MyDateJsonValueProcessor());
        this.registerJsonValueProcessor(Timestamp.class, new MyDateJsonValueProcessor());
        IgnoreFieldPropertyFilterImpl filter = new IgnoreFieldPropertyFilterImpl((String[])null);
        this.setJsonPropertyFilter(filter);
    }
}
