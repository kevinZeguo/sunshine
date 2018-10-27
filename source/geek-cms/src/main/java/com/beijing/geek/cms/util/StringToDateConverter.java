package com.beijing.geek.cms.util;

import org.apache.commons.lang3.StringUtils;
import org.springframework.core.convert.converter.Converter;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

/**
 * Created by mazeguo on 2017/5/28.
 */
public class StringToDateConverter implements Converter<String, Date> {

    private SimpleDateFormat dateFormatPattern = new SimpleDateFormat("yyyy-MM-dd");
    private SimpleDateFormat dateTimeFormat = new SimpleDateFormat("yyyy-MM-dd hh:mm:ss");

    public void setDateFormatPattern(String dateFormatPattern) {
        this.dateFormatPattern = new SimpleDateFormat(dateFormatPattern);
    }

    @Override
    public Date convert(String source) {
        if (StringUtils.isEmpty(source)) {
            return null;
        }
        Date resultDate = null;

        // 先尝试解析 yyyy-MM-dd hh:mm:ss格式的日期
        try {
            resultDate = dateTimeFormat.parse(source);
        } catch (ParseException e) {
            // 日期不是那个格式的，则尝试yyyy-MM-dd
            try {
                resultDate = dateFormatPattern.parse(source);
            } catch (ParseException e1) {
                e1.printStackTrace();
            }
        }
        return resultDate;
    }
}