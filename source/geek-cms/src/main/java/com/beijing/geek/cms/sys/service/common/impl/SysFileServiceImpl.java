package com.beijing.geek.cms.sys.service.common.impl;

import com.beijing.geek.cms.sys.dao.common.SysFileDao;
import com.beijing.geek.cms.sys.domain.common.SysFile;
import com.beijing.geek.cms.sys.service.common.SysFileService;
import com.beijing.geek.cms.sys.utils.StringUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by mazeguo on 2017/6/10.
 */
@Service
public class SysFileServiceImpl implements SysFileService {
    @Autowired
    private SysFileDao sysFileDao;

    @Override
    public void saveFile(SysFile sysFile) throws Exception {
        sysFileDao.insert(sysFile);
    }

    @Override
    public SysFile findFileById(Integer fileId) throws Exception {
        return sysFileDao.selectById(fileId);
    }

    @Override
    public void saveFileAndAppRlt(Integer appId, String appType, List<Integer> fileIdList, Integer userId) throws Exception {
        List<SysFile> fileList = sysFileDao.selectListByAppId(appId, appType);
        if (fileList != null && fileIdList.size() > 0) {
            for (SysFile file : fileList) {
                boolean isDel = true;
                for (Integer fileId : fileIdList) {
                    if (file.getId().intValue() == fileId) {
                        isDel = false;
                    }
                }
                if (isDel) {
                    file.setModifier(userId);
                    sysFileDao.deleteById(file);
                }
            }
        }
        //防止更新全表数据
        if (fileIdList != null && fileIdList.size() > 0 && appId != null && appId > 0) {//文件列表存在
            sysFileDao.updateFileAndAppRlt(appId, appType, fileIdList, userId);
        }
    }

    @Override
    public List<SysFile> findListByAppIdAndType(Integer appId, String appType) throws Exception {
        List<SysFile> sysFiles = sysFileDao.selectListByAppId(appId, appType);
        if (sysFiles != null && sysFiles.size() > 0) {
            for (SysFile file : sysFiles) {
                file.setUrl("/file/downLoad.html?fileId=" + file.getId());
            }
        }
        return sysFiles;
    }

    @Override
    public void deleteByAppIdAndType(Integer appId, String appType, Integer userId) throws Exception {
        sysFileDao.deleteByAppId(appId, appType, userId);
    }

    @Override
    public void deleteById(Integer fileId, Integer userId) throws Exception {
        SysFile sysFile = new SysFile();
        sysFile.setId(fileId);
        sysFile.setModifier(userId);
        sysFileDao.deleteById(sysFile);
    }

    @Override
    public void updateFileAndAppRlt(Integer appId, String appType, List<Integer> fileIdList, Integer userId) throws Exception {
        if (fileIdList == null || fileIdList.size() == 0) {//更新后文件为空，则删除之前的文件
            deleteByAppIdAndType(appId, appType, userId);
        }
        //查出原来的 文件列表
        List<SysFile> fileListTemp = sysFileDao.selectListByAppId(appId, appType);
        if (fileListTemp == null || fileListTemp.size() == 0) {//之前没有文件则直接保存
            this.saveFileAndAppRlt(appId, appType, fileIdList, userId);
            return;
        }
        //之前存在文件，比较原来的文件，哪些文件需要删除，哪些文件需要新增
        List<Integer> delList = new ArrayList<>();
        List<Integer> addList = new ArrayList<>();
        //判断是否需要删除
        for (SysFile file : fileListTemp) {
            boolean isDel = true;
            for (Integer fileId : fileIdList) {
                if (fileId.intValue() == file.getId().intValue()) {
                    isDel = false;
                }
            }
            if (isDel) {
                delList.add(file.getId());
            }
        }

        //判断是否需要新增
        for (Integer fileId : fileIdList) {
            boolean isAdd = true;
            for (SysFile file : fileListTemp) {
                if (fileId.intValue() == file.getId().intValue()) {
                    isAdd = false;
                }
            }
            if (isAdd) {
                addList.add(fileId);
            }
        }

        if (delList.size() > 0) {
            for (Integer fileId : delList) {
                this.deleteById(fileId, userId);
            }
        }

        if (addList.size() > 0) {
            this.saveFileAndAppRlt(appId, appType, addList, userId);
        }


    }

    @Override
    public List<SysFile> listFiles(List<Integer> fileIds) throws Exception {
        return sysFileDao.selectListByIds(fileIds);
    }

    @Override
    public List<SysFile> findFilesByIds(String fileIds) throws Exception {
        if (StringUtil.isNotEmpty(fileIds)) {
            List<Integer> fIds = new ArrayList<>();
            for (String id : fileIds.split(",")) {
                fIds.add(Integer.parseInt(id));
            }
            List<SysFile> fileList = sysFileDao.selectListByIds(fIds);
            if (fileList != null) {
                for (SysFile file : fileList) {
                    file.setUrl("/file/downLoad.html?fileId=" + file.getId());
                }
            }
            return fileList;
        }
        return null;
    }
}
