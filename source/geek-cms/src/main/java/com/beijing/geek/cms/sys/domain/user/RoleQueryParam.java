package com.beijing.geek.cms.sys.domain.user;

import com.beijing.geek.cms.sys.domain.common.ListQueryPojo;

/**
 * Created by mazeguo on 2017/7/15.
 */
public class RoleQueryParam extends ListQueryPojo {
    private String roleName;

    public String getRoleName() {
        return roleName;
    }

    public void setRoleName(String roleName) {
        this.roleName = roleName;
    }
}
