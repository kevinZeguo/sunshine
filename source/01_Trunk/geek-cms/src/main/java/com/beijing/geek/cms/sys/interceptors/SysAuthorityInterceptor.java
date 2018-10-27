package com.beijing.geek.cms.sys.interceptors;

import com.beijing.geek.cms.sys.utils.MD5Util;
import net.sf.json.JSONObject;
import org.apache.commons.lang.StringUtils;
import org.apache.log4j.Logger;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.PrintWriter;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;


/**
 * Created by mazeguo on 2017/8/6.
 */
public class SysAuthorityInterceptor implements HandlerInterceptor {
    private static final Logger log = Logger.getLogger(SysAuthorityInterceptor.class);

    private Integer maxMinute = 2;

    private String token = "!@#$QWER";

    //
    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object o) throws Exception {
        Date now = new Date();
        String url = request.getRequestURI();
        log.info("拦截器start：" + url + "-->进入系统权限验证.");
        try {
            if(url.equals("/api/file/download")){
                return result(true, now, request, response, 0, "成功.");
            }
            //第一步判断参数是否错误
            //获取传入参数
            String sign = request.getParameter("sign");
            String body = request.getParameter("body");
            String timeStr = request.getParameter("time");
            String tokenStr = token;
            if (StringUtils.isBlank(sign)) {
                return result(false, now, request, response, -1, "sign 参数为空.");
            }
            if (StringUtils.isBlank(body)) {
                return result(false, now, request, response, -1, "body 参数为空.");
            }
            if (StringUtils.isBlank(timeStr)) {
                return result(false, now, request, response, -1, "time 参数为空.");
            }
            log.info("请求参数:sign:" + sign + " body:" + body + " time: " + timeStr);

            //第二步时间验证
            try {
                Long time = Long.parseLong(timeStr);
                //当前时间-请求时间 / 毫秒数 /秒数 = 分钟数
                Long nowMinute = (now.getTime() - time) / 1000 / 60;
                if (Math.abs(nowMinute) > maxMinute) {
                    return result(false, now, request, response, -2, "请求时间差超过2分钟.");
                }
            } catch (NumberFormatException e) {
                log.error("Time毫秒数转换类型异常：", e);
                return result(false, now, request, response, -1, "time 参数类型不对.");
            }

            //第三部验证权限
            JSONObject bodyObj = null;
            try {
                bodyObj = JSONObject.fromObject(body);
                if (bodyObj.containsKey("userKey")) {
                    tokenStr = bodyObj.getString("userKey");
                }
            } catch (Exception e) {
                log.error("body数据不为JSON：" + body, e);
                return result(false, now, request, response, -1, "body 参数类型不对.");
            }
            boolean tmpFlag = false;
            String encryptedStr = encrypted(body, timeStr, tokenStr);
            log.info("tokenStr=" + tokenStr + " , encryptedStr:" + encryptedStr);
            if (StringUtils.equalsIgnoreCase(sign, encryptedStr)) {
                tmpFlag = true;
            }
            if (!tmpFlag) {
                log.error("数据校验失败，sign不正确,请求URL：" + url + "请求参数:sign:" + sign + " , body: " + body + " , token:" + tokenStr + " , time:" + timeStr);
                return result(false, now, request, response, -3, "数据校验失败，无效的sign.");
            }
        } catch (Exception e) {
            log.error("数据校验失败，sign不正确,请求URL：" + url, e);
        }
        return result(true, now, request, response, 0, "成功.");
    }


    private static String encrypted(String body, String timeStr, String token) {
        return MD5Util.MD5Encode(body + timeStr + token, "UTF-8");
    }

    /**
     * 处理结果
     *
     * @param request
     * @param response
     * @return
     */
    private boolean result(boolean flag, Date now, HttpServletRequest request, HttpServletResponse response, Integer code, String msg) throws Exception {
        String url = request.getRequestURI();
        String fullUrl = request.getRequestURL().toString();
        if (!flag) {
            PrintWriter printWriter = response.getWriter();
            try {
                //ajax请求返回对象
                response.setCharacterEncoding("UTF-8");
                response.setContentType("application/json;charset=utf-8");
                Map map = new HashMap();
                map.put("code", code);
                map.put("message", msg);
                map.put("obj", null);
                map.put("success", flag);
                JSONObject jsonObject = new JSONObject();
                jsonObject.putAll(map);
                printWriter.print(jsonObject);
                printWriter.flush();
            } finally {
                if (printWriter != null) {
                    printWriter.close();
                }
            }
        }
        Date end = new Date();
        log.info("拦截器end：" + url + "-->系统权限验证结束return " + flag + ",时间消耗：" + (end.getTime() - now.getTime()) + "毫秒");
        return flag;
    }


    @Override
    public void postHandle(HttpServletRequest request,
                           HttpServletResponse response, Object o,
                           ModelAndView modelAndView) throws Exception {

    }

    @Override
    public void afterCompletion(HttpServletRequest request,
                                HttpServletResponse response, Object o,
                                Exception e) throws Exception {


    }

    public String getToken() {
        return token;
    }

    public void setToken(String token) {
        this.token = token;
    }

    public static void main(String[] args) {
        String body = "{\"userName\":\"admin\",\"password\":\"123456\"}";
        String token = "!@#$QWER";
        String url = "http://localhost:8080/api/login.ajax";
        getUrl(body, url, token);
//        sign:dd275a5518a6f99c0d653e3e12d2d309 body:{"userName":"admin","password":"123456"} time: 1507564623287
//        token = "c44b01947c9e6e3f";
//        url = "http://localhost:8080/api/customer/list.ajax";
//        body = "{userKey:'c44b01947c9e6e3f',start:1,limit:10}";
//        getUrl(body, url, token);


    }


    private static void getUrl(String body, String url, String token) {
        long time = System.currentTimeMillis();
        time = 1507564623287l;
        System.out.println(time);
        System.out.println(body);
        String sign = encrypted(body, time + "", token);
        System.out.println(sign);
        System.out.println(url + "?body=" + body + "&sign=" + sign + "&time=" + time);

    }
}
