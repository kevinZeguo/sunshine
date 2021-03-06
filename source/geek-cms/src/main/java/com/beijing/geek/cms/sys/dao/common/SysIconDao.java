package com.beijing.geek.cms.sys.dao.common;

import com.beijing.geek.cms.sys.domain.common.SysIcon;
import com.beijing.geek.cms.sys.domain.common.SysIconWithBLOBs;

public interface SysIconDao {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table sys_icon
     *
     * @mbggenerated
     */
    int deleteById(Integer iconId);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table sys_icon
     *
     * @mbggenerated
     */
    int insert(SysIconWithBLOBs record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table sys_icon
     *
     * @mbggenerated
     */
    int insertSelective(SysIconWithBLOBs record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table sys_icon
     *
     * @mbggenerated
     */
    SysIconWithBLOBs selectById(Integer iconId);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table sys_icon
     *
     * @mbggenerated
     */
    int updateByIdSelective(SysIconWithBLOBs record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table sys_icon
     *
     * @mbggenerated
     */
    int updateByIdWithBLOBs(SysIconWithBLOBs record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table sys_icon
     *
     * @mbggenerated
     */
    int updateById(SysIcon record);
}