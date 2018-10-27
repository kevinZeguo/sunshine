package com.beijing.geek.cms.sys.utils;

import com.alibaba.fastjson.JSONObject;

/**
 * Created by mazeguo on 2017/6/15.
 */
public class ObjectUtils {

    /**
     * 对象转换成字符串
     * @param obj
     * @return
     */
    public static String objToString(Object obj) {
        if (obj != null) {
            return JSONObject.toJSONString(obj).toString();
        }
        return "";
    }
}
