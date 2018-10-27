package com.beijing.geek.cms.sys.domain.common;

/**
 * Created by mazeguo on 2017/8/13.
 */
public class AttrQueryParam extends ListQueryPojo {
    private String key;
    private Integer attrGroupId;

    public String getKey() {
        return key;
    }

    public void setKey(String key) {
        this.key = key;
    }

    public Integer getAttrGroupId() {
        return attrGroupId;
    }

    public void setAttrGroupId(Integer attrGroupId) {
        this.attrGroupId = attrGroupId;
    }
}
