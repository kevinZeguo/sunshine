package com.beijing.geek.cms.sys.utils;

import net.sf.json.JsonConfig;
import net.sf.json.processors.JsonValueProcessor;

import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by mazeguo on 2017/8/8.
 */
public class MyDateJsonValueProcessor implements JsonValueProcessor {
    public MyDateJsonValueProcessor() {
    }

    public Object processArrayValue(Object value, JsonConfig jsonConfig) {
        if(null == value) {
            return "";
        } else if(!(value instanceof Date) && !(value instanceof java.sql.Date) && !(value instanceof Timestamp)) {
            return value.toString();
        } else {
            SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            return df.format(value);
        }
    }

    public Object processObjectValue(String s, Object object, JsonConfig jsonConfig) {
        if(null == object) {
            return "";
        } else if(!(object instanceof Date) && !(object instanceof java.sql.Date) && !(object instanceof Timestamp)) {
            return object.toString();
        } else {
            SimpleDateFormat df = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            return df.format(object);
        }
    }
}
