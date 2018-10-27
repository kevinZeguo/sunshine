package com.beijing.geek.cms.sys.service.sys.impl;

import com.beijing.geek.cms.sys.dao.user.SysPermissionDao;
import com.beijing.geek.cms.sys.dao.user.SysUserDataRightDao;
import com.beijing.geek.cms.sys.domain.user.SysPermission;
import com.beijing.geek.cms.sys.domain.user.SysUserDataRight;
import com.beijing.geek.cms.sys.service.sys.SysRightService;
import com.beijing.geek.cms.sys.utils.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by mazeguo on 2017/7/18.
 */
@Service
public class SysRightServiceImpl implements SysRightService {
    @Autowired
    private SysPermissionDao sysPermissionDao;
    @Autowired
    private SysUserDataRightDao sysUserDataRightDao;

    @Override
    public boolean hasRightByRoleCode(Integer userId, String roleCode) throws Exception {
        List<SysPermission> sysPermissionList = sysPermissionDao.selectByUserIdAndRoleCode(userId, roleCode);
        if (sysPermissionList == null || sysPermissionList.size() == 0) {
            return false;
        }
        return true;
    }

    @Override
    public List<Integer> getHasDataRightUserList(Integer userId) throws Exception {
        SysUserDataRight sysUserDataRight = sysUserDataRightDao.selectByUserId(userId);
        List<Integer> userList = new ArrayList<>();
        if (sysUserDataRight != null && sysUserDataRight.getDataType() == 1) {//全部数据权限
            return null;
        }
        if (sysUserDataRight != null && sysUserDataRight.getDataType() == 2) {//部分数据权限
            String userIds = sysUserDataRight.getDataUserIds();
            if (StringUtil.isNotEmpty(userIds)) {
                for (String id : userIds.split(",")) {
                    userList.add(Integer.parseInt(id));
                }
            }
            if (!userList.contains(userId)) {//包含自己的数据权限
                userList.add(userId);
            }
        }

        userList.add(userId);//当前用户的权限
        return userList;
    }
}
