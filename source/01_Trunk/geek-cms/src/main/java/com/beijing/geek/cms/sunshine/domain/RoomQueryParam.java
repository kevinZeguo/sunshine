package com.beijing.geek.cms.sunshine.domain;

import com.beijing.geek.cms.sys.domain.common.ListQueryPojo;

import java.util.Date;

public class RoomQueryParam extends ListQueryPojo {
    private Integer typeId;
    private String inStartDate;
    private String inEndDate;
    private String outStartDate;
    private String outEndDate;
    private Date orderStartDate;
    private Date orderEndDate;
    private String userKey;
    private Integer perStatus;

    public Integer getTypeId() {
        return typeId;
    }

    public void setTypeId(Integer typeId) {
        this.typeId = typeId;
    }

    public String getInStartDate() {
        return inStartDate;
    }

    public void setInStartDate(String inStartDate) {
        this.inStartDate = inStartDate;
    }

    public String getInEndDate() {
        return inEndDate;
    }

    public void setInEndDate(String inEndDate) {
        this.inEndDate = inEndDate;
    }

    public String getOutStartDate() {
        return outStartDate;
    }

    public void setOutStartDate(String outStartDate) {
        this.outStartDate = outStartDate;
    }

    public String getOutEndDate() {
        return outEndDate;
    }

    public void setOutEndDate(String outEndDate) {
        this.outEndDate = outEndDate;
    }

    public Date getOrderStartDate() {
        return orderStartDate;
    }

    public void setOrderStartDate(Date orderStartDate) {
        this.orderStartDate = orderStartDate;
    }

    public Date getOrderEndDate() {
        return orderEndDate;
    }

    public void setOrderEndDate(Date orderEndDate) {
        this.orderEndDate = orderEndDate;
    }

    @Override
    public String getUserKey() {
        return userKey;
    }

    @Override
    public void setUserKey(String userKey) {
        this.userKey = userKey;
    }

    public Integer getPerStatus() {
        return perStatus;
    }

    public void setPerStatus(Integer perStatus) {
        this.perStatus = perStatus;
    }
}
