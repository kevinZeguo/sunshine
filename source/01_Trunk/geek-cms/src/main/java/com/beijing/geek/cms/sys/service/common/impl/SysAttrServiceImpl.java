package com.beijing.geek.cms.sys.service.common.impl;

import com.beijing.geek.cms.sys.dao.common.SysAttrGroupDao;
import com.beijing.geek.cms.sys.dao.common.SysAttrValueDao;
import com.beijing.geek.cms.sys.domain.common.AttrQueryParam;
import com.beijing.geek.cms.sys.domain.common.SysAttrGroup;
import com.beijing.geek.cms.sys.domain.common.SysAttrQueryParam;
import com.beijing.geek.cms.sys.domain.common.SysAttrValue;
import com.beijing.geek.cms.sys.service.common.SysAttrService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by mazeguo on 2017/7/27.
 */
@Service
public class SysAttrServiceImpl implements SysAttrService {
    @Autowired
    private SysAttrGroupDao sysAttrGroupDao;
    @Autowired
    private SysAttrValueDao sysAttrValueDao;

    @Override
    public List<SysAttrValue> findByAttrGroupCode(String groupCode) throws Exception {
        return sysAttrValueDao.selectByAttrGroupCode(groupCode);
    }

    @Override
    public SysAttrValue findById(Integer attrValueId) throws Exception {
        return sysAttrValueDao.selectById(attrValueId);
    }

    @Override
    public Integer queryAttrCountByPage(AttrQueryParam param) throws Exception {
        return sysAttrValueDao.selectAttrCountByPage(param);
    }

    @Override
    public List<SysAttrValue> queryAttrListByPage(AttrQueryParam param) throws Exception {
        return sysAttrValueDao.selectAttrListByPage(param);
    }

    @Override
    public List<SysAttrGroup> queryAllAttrGroupList() throws Exception {
        return sysAttrGroupDao.selectAllList();
    }

    @Override
    public void editAttr(SysAttrValue attrValue, Integer userId) throws Exception {
        attrValue.setModifier(userId);
        sysAttrValueDao.updateById(attrValue);
    }

    @Override
    public void saveAttr(SysAttrValue attrValue, Integer userId) throws Exception {
        attrValue.setModifier(userId);
        attrValue.setCreator(userId);
        sysAttrValueDao.insert(attrValue);
    }

    @Override
    public void deleteById(Integer attrId, Integer userId) throws Exception {
        SysAttrValue attrValue = new SysAttrValue();
        attrValue.setModifier(userId);
        attrValue.setAttrId(attrId);
        sysAttrValueDao.deleteById(attrValue);

    }
}
