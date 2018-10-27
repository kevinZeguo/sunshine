package com.beijing.geek.cms.sunshine.domain;

import java.util.Date;

public class TbRoomTypeInit extends TbRoomType {
    private Integer initId;


    private Integer typeId;


    private String typeName;


    private Integer numRooms;

    private Integer numRetainRooms;
    private Integer perStatus;//预约状态

    private Double price;

    private Double salePrice;


    private Date roomDate;
    private String roomDateStr;

    private String comment;

    private Date cTime;


    private Date uTime;

    private Integer delStatus;

    public Integer getInitId() {
        return initId;
    }

    public void setInitId(Integer initId) {
        this.initId = initId;
    }

    public Integer getTypeId() {
        return typeId;
    }

    public void setTypeId(Integer typeId) {
        this.typeId = typeId;
    }

    public String getTypeName() {
        return typeName;
    }

    public void setTypeName(String typeName) {
        this.typeName = typeName;
    }

    public Integer getNumRooms() {
        return numRooms;
    }

    public void setNumRooms(Integer numRooms) {
        this.numRooms = numRooms;
    }

    public Integer getNumRetainRooms() {
        return numRetainRooms;
    }

    public void setNumRetainRooms(Integer numRetainRooms) {
        this.numRetainRooms = numRetainRooms;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public Double getSalePrice() {
        return salePrice;
    }

    public void setSalePrice(Double salePrice) {
        this.salePrice = salePrice;
    }

    public Date getRoomDate() {
        return roomDate;
    }

    public void setRoomDate(Date roomDate) {
        this.roomDate = roomDate;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public Date getcTime() {
        return cTime;
    }

    public void setcTime(Date cTime) {
        this.cTime = cTime;
    }

    public Date getuTime() {
        return uTime;
    }

    public void setuTime(Date uTime) {
        this.uTime = uTime;
    }

    public Integer getDelStatus() {
        return delStatus;
    }

    public void setDelStatus(Integer delStatus) {
        this.delStatus = delStatus;
    }

    public Integer getPerStatus() {
        return perStatus;
    }

    public void setPerStatus(Integer perStatus) {
        this.perStatus = perStatus;
    }

    public String getRoomDateStr() {
        return roomDateStr;
    }

    public void setRoomDateStr(String roomDateStr) {
        this.roomDateStr = roomDateStr;
    }
}