package com.beijing.geek.cms.sys.dao.common;

import com.beijing.geek.cms.sys.domain.common.SysFile;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface SysFileDao {

    /**
     * 根据Id删除文件
     *
     * @param sysFile
     * @throws Exception
     */
    void deleteById(SysFile sysFile) throws Exception;

    /**
     * 保存文件
     *
     * @param sysFile
     * @throws Exception
     */
    void insert(SysFile sysFile) throws Exception;

    /**
     * 根据Id查询文件信息
     *
     * @param id
     * @return
     * @throws Exception
     */
    SysFile selectById(Integer id) throws Exception;

    /**
     * 更新文件与应用关系
     *
     * @param appId
     * @param appType
     * @param fileIdList
     * @param userId
     * @throws Exception
     */
    void updateFileAndAppRlt(@Param("appId") Integer appId, @Param("appType") String appType, @Param("fileIdList") List<Integer> fileIdList, @Param("userId") Integer userId) throws Exception;

    /**
     * 根据APPId列表查询文件列表
     *
     * @param appId
     * @param appType
     * @throws Exception
     */
    List<SysFile> selectListByAppId(@Param("appId") Integer appId, @Param("appType") String appType) throws Exception;

    /**
     * 根据appId删除文件
     *
     * @param appId
     * @param appType
     * @param userId
     * @throws Exception
     */
    void deleteByAppId(@Param("appId") Integer appId, @Param("appType") String appType, @Param("userId") Integer userId) throws Exception;

    /**
     * 查询文件列表
     * @param fileIds
     * @return
     * @throws Exception
     */
    List<SysFile> selectListByIds(@Param("fileIds")List<Integer> fileIds) throws Exception;
}