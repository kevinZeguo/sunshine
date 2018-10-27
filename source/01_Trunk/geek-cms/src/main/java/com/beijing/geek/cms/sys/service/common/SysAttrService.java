package com.beijing.geek.cms.sys.service.common;

import com.beijing.geek.cms.sys.domain.common.AttrQueryParam;
import com.beijing.geek.cms.sys.domain.common.SysAttrGroup;
import com.beijing.geek.cms.sys.domain.common.SysAttrQueryParam;
import com.beijing.geek.cms.sys.domain.common.SysAttrValue;

import java.util.List;

/**
 * Created by mazeguo on 2017/7/27.
 */
public interface SysAttrService {

    /**
     * 根据组Code查询属性列表
     *
     * @param groupCode
     * @return
     * @throws Exception
     */
    List<SysAttrValue> findByAttrGroupCode(String groupCode) throws Exception;

    /**
     * 查询属性信息
     *
     * @param attrValueId
     * @throws Exception
     */
    SysAttrValue findById(Integer attrValueId) throws Exception;


    /**
     * 查询属性列表
     *
     * @param param
     * @return
     * @throws Exception
     */
    Integer queryAttrCountByPage(AttrQueryParam param) throws Exception;

    /**
     * 查询属性列表
     *
     * @param param
     * @return
     * @throws Exception
     */
    List<SysAttrValue> queryAttrListByPage(AttrQueryParam param) throws Exception;

    /**
     * 查询属性组列表   ;dd
     *
     * @return
     * @throws Exception
     */
    List<SysAttrGroup> queryAllAttrGroupList() throws Exception;

    /**
     * 编辑属性
     *
     * @param attrValue
     * @param userId
     * @throws Exception
     */
    void editAttr(SysAttrValue attrValue, Integer userId) throws Exception;

    /**
     * 新增属性
     *
     * @param attrValue
     * @param userId
     * @throws Exception
     */
    void saveAttr(SysAttrValue attrValue, Integer userId) throws Exception;

    /**
     * 删除属性
     *
     * @param attrId
     * @param userId
     * @throws Exception
     */
    void deleteById(Integer attrId, Integer userId) throws Exception;
}
