package com.beijing.geek.cms.sunshine.service.impl;

import com.beijing.geek.cms.sunshine.dao.TbRoomTypeDao;
import com.beijing.geek.cms.sunshine.dao.TbRoomTypeInitDao;
import com.beijing.geek.cms.sunshine.domain.RoomQueryParam;
import com.beijing.geek.cms.sunshine.domain.TbRoomType;
import com.beijing.geek.cms.sunshine.domain.TbRoomTypeInit;
import com.beijing.geek.cms.sunshine.service.RoomTypeInitService;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

@Service
public class RoomTypeInitServiceImpl implements RoomTypeInitService {
    private static final Logger logger = Logger.getLogger(RoomTypeInitServiceImpl.class);
    @Autowired
    private TbRoomTypeDao tbRoomTypeDao;

    @Autowired
    private TbRoomTypeInitDao tbRoomTypeInitDao;

    public void init() {
        try {
            //先查询 房间信息
            List<TbRoomType> tbRoomTypeList = tbRoomTypeDao.selectAllList();
            if (tbRoomTypeList != null) {//存在房间定义信息
                //初始化的数据量 ，保证一年内的数据
                Calendar calendar = Calendar.getInstance();
                calendar.add(Calendar.DAY_OF_MONTH, 365);
                Date endDate = calendar.getTime();

                Date startDate;
                //获取最后一次初始化的日期
                TbRoomTypeInit init = tbRoomTypeInitDao.getLastInit(tbRoomTypeList.get(0));
                if (init == null) {//未初始化，则初始化前时间的数据
                    init = new TbRoomTypeInit();
                    Calendar startCalendar = Calendar.getInstance();
                    startCalendar.add(Calendar.DAY_OF_MONTH, -10);
                    startDate = startCalendar.getTime();
                } else {//初始化则从上次初始化开始数据
                    Calendar startCalendar = Calendar.getInstance();
                    startCalendar.setTime(init.getRoomDate());
                    startCalendar.add(Calendar.DAY_OF_MONTH, 1);
                    startDate = startCalendar.getTime();
                }
                logger.warn("开始初始化酒店房间数据.....");
                //只要开始时间小于结束时间，就继续初始化
                while (startDate.getTime() < endDate.getTime()) {
                    logger.warn(" [ " + startDate + " ] data  init  starting .....");
                    init.setRoomDate(startDate);
                    tbRoomTypeInitDao.batchInsert(init);
                    logger.warn(" [ " + startDate + " ] data  init  end.");
                    //开始时间加一天继续初始化其他日期的数据
                    Calendar startCalendar = Calendar.getInstance();
                    startCalendar.setTime(startDate);
                    startCalendar.add(Calendar.DAY_OF_MONTH, 1);
                    startDate = startCalendar.getTime();
                }

                logger.warn("初始化酒店房间数据结束");
            }


        } catch (Exception e) {
            logger.error("初始化日期信息失败!", e);
        }


    }


    @Override
    public Integer queryRoomCountByPage(RoomQueryParam param) throws Exception {
        return tbRoomTypeInitDao.selectRoomCountByPage(param);
    }

    @Override
    public List<TbRoomTypeInit> queryRoomListByPage(RoomQueryParam param) throws Exception {
        List<TbRoomTypeInit> list = tbRoomTypeInitDao.selectRoomListByPage(param);
        if (list != null) {
            DateFormat df = new SimpleDateFormat("yyyy-MM-dd");
            for (TbRoomTypeInit in : list) {
                in.setRoomDateStr(df.format(in.getRoomDate()));
            }
        }
        return list;
    }
}
