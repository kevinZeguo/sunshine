package com.beijing.geek.cms.util;

import net.sf.ezmorph.object.DateMorpher;
import net.sf.json.JSONArray;
import net.sf.json.JSONObject;
import net.sf.json.JsonConfig;
import net.sf.json.util.JSONUtils;
import net.sf.json.util.PropertyFilter;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.sql.Timestamp;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Map;

/**
 * Created by IntelliJ IDEA.
 * User: liuyanwei@360buy.com
 * Date: 11-5-9
 * Time: 下午3:58
 * json工具类
 */
public class JsonUtil {

    private final static Log log = LogFactory.getLog(JsonUtil.class);

    /**
     * 将json字符串转换为对象
     *
     * @param jsonStr
     * @param clazz
     * @return
     */
    public static Object toBean(String jsonStr, Class clazz) {
        JSONObject jsonPerson = JSONObject.fromObject(jsonStr);
        String[] dateFormats = new String[]{"yyyyMMdd"};       //处理Date类型字段
        JSONUtils.getMorpherRegistry().registerMorpher(new DateMorpher(dateFormats));
        Object obj = JSONObject.toBean(jsonPerson, clazz);
        return obj;
    }

    /**
     * 将json字符串转换为对象
     *
     * @param jsonStr
     * @param clazz
     * @return
     */
    public static Object toBean(String jsonStr, Class clazz, Map m) {
        JSONObject jsonPerson = JSONObject.fromObject(jsonStr);
        String[] dateFormats = new String[]{"yyyyMMdd"};       //处理Date类型字段
        JSONUtils.getMorpherRegistry().registerMorpher(new DateMorpher(dateFormats));
        Object obj = JSONObject.toBean(jsonPerson, clazz, m);
        return obj;
    }

    /**
     * 将json字符串转换为对象
     *
     * @param jsonStr
     * @param clazz
     * @return
     */
    public static Object toBean(String jsonStr, Class clazz, String[] properties, Map m) {
        String[] dateFormats = new String[]{"yyyyMMdd"};       //处理Date类型字段
        JSONUtils.getMorpherRegistry().registerMorpher(new DateMorpher(dateFormats));

        JsonConfig jsonConfig = new JsonConfig();
        IgnoreFieldPropertyFilterImpl f = new IgnoreFieldPropertyFilterImpl(properties);
        jsonConfig.setClassMap(m);
        jsonConfig.setJsonPropertyFilter(f);

        JSONObject jsonPerson = JSONObject.fromObject(jsonStr, jsonConfig);
        Object obj = JSONObject.toBean(jsonPerson, clazz, m);
        return obj;
    }

    /**
     * 将json字符串转换为对象
     *
     * @param jsonStr
     * @param clazz
     * @return
     */
    public static Object toArray(String jsonStr, Class clazz) {
        JSONArray jsonArray = JSONArray.fromObject(jsonStr);
        String[] dateFormats = new String[]{"yyyyMMdd"};       //处理Date类型字段
        JSONUtils.getMorpherRegistry().registerMorpher(new DateMorpher(dateFormats));
        Object obj = JSONArray.toArray(jsonArray, clazz);
        return obj;
    }

    public static String toJsonArray(Object array, String[] pors) {
        JsonConfig jsonConfig = new JsonConfig();
        jsonConfig.registerJsonValueProcessor(Date.class, new MyDateJsonValueProcessor());
        jsonConfig.registerJsonValueProcessor(java.sql.Date.class, new MyDateJsonValueProcessor());
        jsonConfig.registerJsonValueProcessor(Timestamp.class, new MyDateJsonValueProcessor());
        IgnoreFieldPropertyFilterImpl f = new IgnoreFieldPropertyFilterImpl(pors);
        jsonConfig.setJsonPropertyFilter(f);
        return JSONArray.fromObject(array, jsonConfig).toString();
    }

    public static List toJsonArray(List list, String[] pors) {
        JsonConfig jsonConfig = new JsonConfig();
        jsonConfig.registerJsonValueProcessor(Date.class, new MyDateJsonValueProcessor());
        jsonConfig.registerJsonValueProcessor(java.sql.Date.class, new MyDateJsonValueProcessor());
        jsonConfig.registerJsonValueProcessor(Timestamp.class, new MyDateJsonValueProcessor());
        IgnoreFieldPropertyFilterImpl f = new IgnoreFieldPropertyFilterImpl(pors);
        jsonConfig.setJsonPropertyFilter(f);
        if (list == null || list.size() == 0) {
            return new ArrayList();
        }
        return JSONArray.fromObject(list, jsonConfig);
    }

    public static String toJsonArray2(Object array, String[] pors) {
        JsonConfig jsonConfig = new JsonConfig();
        jsonConfig.registerJsonValueProcessor(Date.class, new MyDateJsonValueProcessor());
        jsonConfig.registerJsonValueProcessor(java.sql.Date.class, new MyDateJsonValueProcessor());
        jsonConfig.registerJsonValueProcessor(Timestamp.class, new MyDateJsonValueProcessor());
        NotIgnoreFieldPropertyFilterImpl f = new NotIgnoreFieldPropertyFilterImpl(pors);
        jsonConfig.setJsonPropertyFilter(f);
        return JSONArray.fromObject(array, jsonConfig).toString();
    }

    public static List toJsonArray2(List array, String[] pors) {
        JsonConfig jsonConfig = new JsonConfig();
        jsonConfig.registerJsonValueProcessor(Date.class, new MyDate2FmtJsonValueProcessor());
        jsonConfig.registerJsonValueProcessor(java.sql.Date.class, new MyDate2FmtJsonValueProcessor());
        jsonConfig.registerJsonValueProcessor(Timestamp.class, new MyDate2FmtJsonValueProcessor());
        NotIgnoreFieldPropertyFilterImpl f = new NotIgnoreFieldPropertyFilterImpl(pors);
        jsonConfig.setJsonPropertyFilter(f);
        return JSONArray.fromObject(array, jsonConfig);
    }


    public static String toJsonArray(Object array) {
        return toJsonArray(array, null);
    }

    /**
     * 将某一个对象中的 一部分属性 转换为json格式的字符串
     *
     * @param obj
     * @param pros 需要转换为json的属性
     */
    public static String toJson(Object obj, String[] pros) {
        JsonConfig jsonConfig = new JsonConfig();
        jsonConfig.registerJsonValueProcessor(Date.class, new MyDate2FmtJsonValueProcessor());
        jsonConfig.registerJsonValueProcessor(java.sql.Date.class, new MyDate2FmtJsonValueProcessor());
        jsonConfig.registerJsonValueProcessor(Timestamp.class, new MyDate2FmtJsonValueProcessor());
        IgnoreFieldPropertyFilterImpl f = new IgnoreFieldPropertyFilterImpl(pros);
        jsonConfig.setJsonPropertyFilter(f);
        String jsonStr = JSONObject.fromObject(obj, jsonConfig).toString();
        log.debug("json2: " + jsonStr);
        return jsonStr;
    }

    /**
     * 将某一个对象中的 一部分属性 转换为json格式的字符串
     *
     * @param obj
     * @param pros 不需要转换为json的属性
     */
    public static String toJson2(Object obj, String[] pros) {
        JsonConfig jsonConfig = new JsonConfig();
        jsonConfig.registerJsonValueProcessor(Date.class, new MyDateJsonValueProcessor());
        jsonConfig.registerJsonValueProcessor(java.sql.Date.class, new MyDateJsonValueProcessor());
        jsonConfig.registerJsonValueProcessor(Timestamp.class, new MyDateJsonValueProcessor());
        NotIgnoreFieldPropertyFilterImpl f = new NotIgnoreFieldPropertyFilterImpl(pros);
        jsonConfig.setJsonPropertyFilter(f);
        String jsonStr = JSONObject.fromObject(obj, jsonConfig).toString();
        log.debug("json2: " + jsonStr);
        return jsonStr;
    }

    /**
     * 将对象的全部属性都转换为json格式的字符串
     *
     * @param obj
     */
    public static String toJson(Object obj) {
        return toJson(obj, null);
    }

    public static String toJsonWithOutNull(Object obj) {
        return toJson(obj);
    }

    /**
     * 将对象转换为json字符串并out
     *
     * @param response
     * @param object
     */
    public static void toJsonAndOut(HttpServletResponse response, Object object) {
        outJson(response, toJson(object));
    }

    /**
     * 将对象转换为json字符串并out
     *
     * @param response
     * @param object
     * @param pros     需要输出的属性的集合
     */
    public static void toJsonAndOut(HttpServletResponse response, Object object, String[] pros) {
        outJson(response, toJson(object, pros));
    }

    /**
     * 将对象转换为json字符串并out
     *
     * @param response
     * @param object
     * @param pros     不需要输出的属性的集合
     */
    public static void toJsonAndOut2(HttpServletResponse response, Object object, String[] pros) {
        outJson(response, toJson2(object, pros));
    }

    /**
     * action输出json格式字符串
     *
     * @param response
     * @param jsonStr
     */
    public static void outJson(HttpServletResponse response, String jsonStr) {
        response.setContentType("text/javascript;charset=UTF-8");
        try {
            PrintWriter out = response.getWriter();
            out.write(jsonStr);
        } catch (IOException e) {
            log.error(e);
        }
    }

    /**
     * 将对象转换为json字符串并out
     * 在某些情况下，setContentType必须为text/html。如上传文件时，file uploads must use iframes
     *
     * @param response
     * @param object
     */
    public static void toJsonAndOutHtml(HttpServletResponse response, Object object) {
        outJsonHtml(response, toJson(object));
    }

    /**
     * action输出json格式字符串 (在某些情况下，setContentType必须为text/html。如上传文件时，file uploads must use iframes
     * 参考http://www.sencha.com/forum/showthread.php?120201-Submitting-a-form-seems-to-be-mis-interpreting-the-response-type&)
     *
     * @param response
     * @param jsonStr
     */
    public static void outJsonHtml(HttpServletResponse response, String jsonStr) {
        response.setContentType("text/html;charset=UTF-8");
        try {
            PrintWriter out = response.getWriter();
            out.write(jsonStr);
        } catch (IOException e) {
        }
    }

    /**
     * 将json字符串转换为List
     *
     * @param jsonStr
     * @param clazz
     * @return
     */
    public static List toList(String jsonStr, Class clazz) {
        JSONArray jsonArray = JSONArray.fromObject(jsonStr);
        String[] dateFormats = new String[]{"yyyyMMdd"};       //处理Date类型字段
        JSONUtils.getMorpherRegistry().registerMorpher(new DateMorpher(dateFormats));
        List obj = (List) JSONArray.toCollection(jsonArray, clazz);
        return obj;
    }

}

//处理json中日期对象   将日期输出为毫秒数
class MyDateJsonValueProcessor implements net.sf.json.processors.JsonValueProcessor {

    public Object processArrayValue(Object value, JsonConfig jsonConfig) {
        if (null == value) {
            return "";
        } else {
            if (value instanceof Date || value instanceof java.sql.Date || value instanceof Timestamp) {
                return String.valueOf(((Date) value).getTime());
            }
        }
        return value.toString();
    }

    public Object processObjectValue(String s, Object object, JsonConfig jsonConfig) {
        if (null == object) {
            return "";
        } else {

            if (object instanceof Date || object instanceof java.sql.Date || object instanceof Timestamp) {
                return String.valueOf(((Date) object).getTime());
            }
        }
        return object.toString();
    }
}


//处理json中日期对象   将日期输出为毫秒数
class MyDate2FmtJsonValueProcessor implements net.sf.json.processors.JsonValueProcessor {
    private static final String fmt = "yyyy-MM-dd HH:mm:ss";

    public Object processArrayValue(Object value, JsonConfig jsonConfig) {
        if (null == value) {
            return "";
        } else {
            if (value instanceof Date || value instanceof java.sql.Date || value instanceof Timestamp) {
                return String.valueOf(((Date) value).getTime());
            }
        }
        return value.toString();
    }

    public Object processObjectValue(String s, Object object, JsonConfig jsonConfig) {
        if (null == object) {
            return "";
        } else {

            if (object instanceof Date || object instanceof java.sql.Date || object instanceof Timestamp) {
                DateFormat df = new SimpleDateFormat(fmt);
                return df.format(object);
            }
        }
        return object.toString();
    }
}

//json属性过滤类
class IgnoreFieldPropertyFilterImpl implements PropertyFilter {

    /**
     * 不需要过滤的属性名称
     */
    private String[] fields;

    public IgnoreFieldPropertyFilterImpl() {
    }

    public IgnoreFieldPropertyFilterImpl(String[] pars) {
        this.fields = pars;
    }

    public boolean apply(Object source, String name, Object value) {

        if (value == null) {     //值为空的属性 不转换为json
            return true;
        }

        if (fields == null) {     // fields为空 代表所有的非空属性都转换为json
            return false;
        }

        if (fields != null && fields.length > 0) {
            if (juge(fields, name)) {
                return true;
            } else {
                return false;
            }
        }
        return false;
    }

    /**
     * 不需要过滤的属性
     *
     * @param s
     * @param s2
     * @return
     */
    public boolean juge(String[] s, String s2) {
        for (String sl : s) {
            if (s2.equals(sl)) {
                return false;
            }
        }
        return true;
    }
}


//json属性过滤类
class NotIgnoreFieldPropertyFilterImpl implements PropertyFilter {

    /**
     * 不需要过滤的属性名称
     */
    private String[] fields;

    public NotIgnoreFieldPropertyFilterImpl() {
    }

    public NotIgnoreFieldPropertyFilterImpl(String[] pars) {
        this.fields = pars;
    }

    public boolean apply(Object source, String name, Object value) {

        if (value == null) {     //值为空的属性 不转换为json
            return true;
        }

        if (fields == null) {     // fields为空 代表所有的非空属性都转换为json
            return false;
        }

        if (fields != null && fields.length > 0) {
            return !juge(fields, name);
        }

        return false;
    }

    /**
     * 不需要过滤的属性
     *
     * @param s
     * @param s2
     * @return
     */
    public boolean juge(String[] s, String s2) {
        for (String sl : s) {
            if (s2.equals(sl)) {
                return false;
            }
        }
        return true;
    }
}
