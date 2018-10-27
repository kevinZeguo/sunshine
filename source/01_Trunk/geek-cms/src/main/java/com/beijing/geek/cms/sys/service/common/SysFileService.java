package com.beijing.geek.cms.sys.service.common;

import com.beijing.geek.cms.sys.domain.common.SysFile;

import java.util.List;

/**
 * Created by mazeguo on 2017/6/10.
 */
public interface SysFileService {
    /**
     * 保存文件信息
     *
     * @param sysFile
     * @throws Exception
     */
    void saveFile(SysFile sysFile) throws Exception;

    /**
     * 下载文件
     *
     * @param fileId
     * @return
     * @throws Exception
     */
    SysFile findFileById(Integer fileId) throws Exception;

    /**
     * 保存文件与应用关系
     *
     * @param appId
     * @param appType
     * @param fileIdList
     * @param userId
     * @throws Exception
     */
    void saveFileAndAppRlt(Integer appId, String appType, List<Integer> fileIdList, Integer userId) throws Exception;


    /**
     * 根据 使用类型和 Id查询文件列表
     *
     * @param appId
     * @param appType
     * @throws Exception
     */
    List<SysFile> findListByAppIdAndType(Integer appId, String appType) throws Exception;

    /**
     * 根据 使用类型和 Id查询文件列表
     *
     * @param appId
     * @param appType
     * @throws Exception
     */
    void deleteByAppIdAndType(Integer appId, String appType, Integer userId) throws Exception;


    /**
     * 根据Id删除文件关系
     *
     * @param fileId
     * @param userId
     * @throws Exception
     */
    void deleteById(Integer fileId, Integer userId) throws Exception;

    /**
     * 更新文件与APP关系
     *
     * @param appId
     * @param appType
     * @param fileIdList
     * @throws Exception
     */
    void updateFileAndAppRlt(Integer appId, String appType, List<Integer> fileIdList, Integer userId) throws Exception;

    /**
     * 查询文件列表
     *
     * @param fileIds
     * @return
     * @throws Exception
     */
    List<SysFile> listFiles(List<Integer> fileIds) throws Exception;

    /**
     * 根据文件Id列表查询文件信息
     *
     * @param fileIds
     * @return
     * @throws Exception
     */
    List<SysFile> findFilesByIds(String fileIds) throws Exception;
}
