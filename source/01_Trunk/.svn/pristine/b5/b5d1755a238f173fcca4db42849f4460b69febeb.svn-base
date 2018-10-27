package com.beijing.geek.cms.sys.easyui;

import com.beijing.geek.cms.sys.domain.user.SysFunction;
import com.beijing.geek.cms.sys.utils.ListtoMenu;
import org.apache.log4j.Logger;

import javax.servlet.jsp.JspTagException;
import javax.servlet.jsp.JspWriter;
import javax.servlet.jsp.tagext.TagSupport;
import java.io.IOException;
import java.util.List;
import java.util.Map;

/**
 * Created by mazeguo on 2017/5/30.
 */
public class MenuTag extends TagSupport {
    private static final Logger logger = Logger.getLogger(MenuTag.class);
    private static final long serialVersionUID = 1L;
    protected List<SysFunction> parentFun;//一级菜单
    protected List<SysFunction> childFun;//二级菜单
    protected Map<Integer, List<SysFunction>> menuFun;//菜单Map


    public List<SysFunction> getParentFun() {
        return parentFun;
    }

    public void setParentFun(List<SysFunction> parentFun) {
        this.parentFun = parentFun;
    }

    public List<SysFunction> getChildFun() {
        return childFun;
    }

    public void setChildFun(List<SysFunction> childFun) {
        this.childFun = childFun;
    }

    public Map<Integer, List<SysFunction>> getMenuFun() {
        return menuFun;
    }

    public void setMenuFun(Map<Integer, List<SysFunction>> menuFun) {
        this.menuFun = menuFun;
    }

    public int doStartTag() throws JspTagException {
        return EVAL_PAGE;
    }

    //封装菜单数据
    public int doEndTag() throws JspTagException {
        JspWriter out = null;
        try {
            out = this.pageContext.getOut();
            out.print(end().toString());
            out.flush();
        } catch (IOException e) {
            logger.error("封装菜单数据失败!", e);
        } finally {
            try {
                out.clearBuffer();
                end().setLength(0);
            } catch (Exception e2) {
                logger.error("封装菜单数据失败!", e2);
            }
        }
        return EVAL_PAGE;
    }

    public StringBuffer end() {
        StringBuffer sb = new StringBuffer();
        sb.append(ListtoMenu.getAceMultistageTree(menuFun));
        return sb;
    }

}
