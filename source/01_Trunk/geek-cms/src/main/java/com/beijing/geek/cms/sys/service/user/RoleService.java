package com.beijing.geek.cms.sys.service.user;

import com.beijing.geek.cms.sys.domain.user.RoleQueryParam;
import com.beijing.geek.cms.sys.domain.user.SysRole;

import java.util.List;

/**
 * Created by mazeguo on 2017/7/15.
 */
public interface RoleService {
    /**
     * 查询角色列表数量
     *
     * @param param
     * @return
     * @throws Exception
     */
    Integer queryRoleCountByPage(RoleQueryParam param) throws Exception;

    /**
     * 查询角色列表
     *
     * @param param
     * @return
     * @throws Exception
     */
    List<SysRole> queryRoleListByPage(RoleQueryParam param) throws Exception;

    /**
     * 查询角色详情
     *
     * @param roleId
     * @return
     * @throws Exception
     */
    SysRole findRoleById(Integer roleId) throws Exception;

    /**
     * 编辑角色
     *
     * @param role
     * @param userId
     * @throws Exception
     */
    void editRole(SysRole role, Integer userId) throws Exception;

    /**
     * 保存角色
     *
     * @param role
     * @param userId
     * @throws Exception
     */
    void saveRole(SysRole role, Integer userId) throws Exception;

    /**
     * 删除角色
     * @param roleId
     * @param userId
     * @throws Exception
     */
    void deleteRole(Integer roleId, Integer userId) throws Exception;
}
