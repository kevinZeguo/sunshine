package com.beijing.geek.cms.sys.domain.common;

import java.util.ArrayList;
import java.util.List;

/**
 * Created by mazeguo on 2017/5/30.
 */
public class ListDataJson {
    private Integer page;//当前页
    private Integer totalPage = 0;//总共页码
    private Integer limit = 10;//每页数据量
    private Integer records = 0;//数据总量
    private List list = new ArrayList();

    public Integer getPage() {
        return page;
    }

    public void setPage(Integer page) {
        this.page = page;
    }

    public Integer getTotalPage() {
//        if (records != null && records > 0 && limit != null && limit > 0) {
//            if (records / limit > 0) {
//                return records / limit + 1;
//            } else {
//                return records / limit;
//            }
//        }
//        return totalPage;
      if (records != null && records > 0 && limit != null && limit > 0) {
        if (records / limit < 0) {
            return 1;///records / limit + 1;
        } else {
          if(records % limit==0)
            return records / limit;
          else
            return records / limit+1;
        }
      }
      return totalPage;
    }

    public Integer getRecords() {
        return records;
    }

    public void setRecords(Integer records) {
        this.records = records;
    }

    public List getList() {
        return list;
    }

    public void setList(List list) {
        this.list = list;
    }

    public Integer getLimit() {
        return limit;
    }

    public void setLimit(Integer limit) {
        this.limit = limit;
    }
}
