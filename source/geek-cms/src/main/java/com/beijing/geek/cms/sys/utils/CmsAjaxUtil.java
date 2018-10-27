package com.beijing.geek.cms.sys.utils;

import com.beijing.geek.cms.sys.domain.common.ApiAjaxJson;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

import net.sf.json.JsonConfig;
import net.sf.json.processors.DefaultValueProcessor;
import net.sf.json.util.PropertyFilter;
import org.apache.commons.lang.ArrayUtils;
import org.apache.commons.logging.Log;
import org.apache.commons.logging.LogFactory;

import java.util.Date;
import java.util.List;

/**
 * @author mazeguo (大数据部-大数据研发部-平台产品研发部)
 * @version V1.0.0
 * @description
 * @date 2016-10-26 15:53
 * @last-modified ：
 * @class com.jd.bdp.buffalo.web.util.BuffaloAjaxUtil
 * @copyright Copyright © 2016-2025  京东JD.com ALL Right Reserved
 * @see
 */
public class CmsAjaxUtil {

    private static Log logger = LogFactory.getLog(CmsAjaxUtil.class);


    /**
     * 将ApiResultDTO对象转换成JSON字符串
     *
     * @param resultDTO
     * @return
     */
    public static JSONObject apiToJSON(ApiAjaxJson resultDTO) {
        JSONObject json = new JSONObject();
        try {
            if (resultDTO == null) {
                resultDTO = new ApiAjaxJson();
                resultDTO.setCode(1);
                resultDTO.setSuccess(false);
                resultDTO.setTotalSize(0);
                resultDTO.setMessage("数据不存在");
            }

            JSONObject body = new JSONObject();


            List dataList = resultDTO.getList();
            if (dataList != null && dataList.size() > 0) {
                JSONArray jsonArray = new JSONArray();
                for (Object item : dataList) {
                    Class c = item.getClass();
                    if (c == int.class || c == Integer.class ||
                            c == long.class || c == Long.class ||
                            c == float.class || c == Float.class ||
                            c == double.class || c == Double.class ||
                            c == boolean.class || c == Boolean.class ||
                            c == byte.class || c == Byte.class ||
                            c == char.class || c == Byte.class ||
                            c == short.class || c == Short.class ||
                            c == String.class) {
                        jsonArray.add(item);
                    } else {
                        jsonArray.add(JSONObject.fromObject(item, WebJsonConfig.getInstance()));
                    }
                }
                body.put("list", jsonArray);
                body.put("totalSize", resultDTO.getTotalSize());
            }

            if (resultDTO.getObj() != null) {
                body = JSONObject.fromObject(resultDTO.getObj(), WebJsonConfig.getInstance());
            }

            json.put("success", resultDTO.isSuccess());
            json.put("code", resultDTO.getCode());
            json.put("body", body);
            json.put("message", resultDTO.getMessage());
        } catch (Throwable e) {
            logger.error("数据转换失败!", e);
        }
        return json;
    }

}
