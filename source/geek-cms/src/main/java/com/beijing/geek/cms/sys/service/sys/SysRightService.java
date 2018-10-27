package com.beijing.geek.cms.sys.service.sys;

import java.util.List;

/**
 * Created by mazeguo on 2017/7/18.
 */
public interface SysRightService {

    /**
     * 校验用户是否具有权限
     *
     * @param userId
     * @param roleCode
     * @return
     * @throws Exception
     */
    boolean hasRightByRoleCode(Integer userId, String roleCode) throws Exception;

    /**
     * 获取能查看哪些用户数据的用户列表
     *
     * @param userId
     * @return
     * @throws Exception
     */
    List<Integer> getHasDataRightUserList(Integer userId) throws Exception;

}
