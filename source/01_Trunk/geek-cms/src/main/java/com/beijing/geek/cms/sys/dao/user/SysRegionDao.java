package com.beijing.geek.cms.sys.dao.user;

import com.beijing.geek.cms.sys.domain.user.SysRegion;

public interface SysRegionDao {
    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table sys_region
     *
     * @mbggenerated
     */
    int deleteById(Integer regionId);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table sys_region
     *
     * @mbggenerated
     */
    int insert(SysRegion record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table sys_region
     *
     * @mbggenerated
     */
    int insertSelective(SysRegion record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table sys_region
     *
     * @mbggenerated
     */
    SysRegion selectById(Integer regionId);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table sys_region
     *
     * @mbggenerated
     */
    int updateByIdSelective(SysRegion record);

    /**
     * This method was generated by MyBatis Generator.
     * This method corresponds to the database table sys_region
     *
     * @mbggenerated
     */
    int updateById(SysRegion record);
}