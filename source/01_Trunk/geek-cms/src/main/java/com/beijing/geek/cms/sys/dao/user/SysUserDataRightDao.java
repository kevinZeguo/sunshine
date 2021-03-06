package com.beijing.geek.cms.sys.dao.user;

import com.beijing.geek.cms.sys.domain.user.SysUserDataRight;

public interface SysUserDataRightDao {
    /**
     * 新增数据权限
     *
     * @param dataRight
     * @throws Exception
     */
    void insert(SysUserDataRight dataRight) throws Exception;

    /**
     * 修改数据权限
     *
     * @param dataRight
     * @throws Exception
     */
    void updateById(SysUserDataRight dataRight) throws Exception;

    /**
     * 根据用户Id删除数据权限
     *
     * @param sysUserDataRight
     * @throws Exception
     */
    void deleteByUserId(SysUserDataRight sysUserDataRight) throws Exception;

    /**
     * 根据用户Id查询用户数据权限
     *
     * @param userId
     * @return
     * @throws Exception
     */
    SysUserDataRight selectByUserId(Integer userId) throws Exception;

}
