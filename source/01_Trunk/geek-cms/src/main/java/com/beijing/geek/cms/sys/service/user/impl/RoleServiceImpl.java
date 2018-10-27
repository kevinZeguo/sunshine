package com.beijing.geek.cms.sys.service.user.impl;

import com.beijing.geek.cms.sys.dao.user.SysPermissionDao;
import com.beijing.geek.cms.sys.dao.user.SysRoleDao;
import com.beijing.geek.cms.sys.dao.user.SysRoleFunctionDao;
import com.beijing.geek.cms.sys.domain.user.RoleQueryParam;
import com.beijing.geek.cms.sys.domain.user.SysPermission;
import com.beijing.geek.cms.sys.domain.user.SysRole;
import com.beijing.geek.cms.sys.service.user.RoleService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by mazeguo on 2017/7/15.
 */
@Service
public class RoleServiceImpl implements RoleService {
    @Autowired
    private SysRoleDao sysRoleDao;
    @Autowired
    private SysPermissionDao sysPermissionDao;
    @Autowired
    private SysRoleFunctionDao sysRoleFunctionDao;

    @Override
    public Integer queryRoleCountByPage(RoleQueryParam param) throws Exception {
        return sysRoleDao.selectRoleCountByPage(param);
    }

    @Override
    public List<SysRole> queryRoleListByPage(RoleQueryParam param) throws Exception {
        return sysRoleDao.selectRoleListByPage(param);
    }

    @Override
    public SysRole findRoleById(Integer roleId) throws Exception {
        return sysRoleDao.selectById(roleId);
    }

    @Override
    public void editRole(SysRole role, Integer userId) throws Exception {
        role.setModifier(userId);
        sysRoleDao.updateById(role);
    }

    @Override
    public void saveRole(SysRole role, Integer userId) throws Exception {
        role.setCreator(userId);
        role.setModifier(userId);
        sysRoleDao.insert(role);
    }

    @Override
    public void deleteRole(Integer roleId, Integer userId) throws Exception {
        //查询用户
        List<SysPermission> sysPermissionList = sysPermissionDao.selectByRoleId(roleId);
        if (sysPermissionList != null && sysPermissionList.size() > 0) {
            throw new RuntimeException("当前角色下还有授权的用户，请先删除授权用户后，再删除角色!");
        }
        SysRole sysRole = new SysRole();
        sysRole.setRoleId(roleId);
        sysRole.setModifier(userId);
        sysRoleDao.deleteById(sysRole);
    }
}
