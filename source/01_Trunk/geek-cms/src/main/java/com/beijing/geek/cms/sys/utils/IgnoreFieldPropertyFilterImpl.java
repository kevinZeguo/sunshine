package com.beijing.geek.cms.sys.utils;

import net.sf.json.util.PropertyFilter;

/**
 * Created by mazeguo on 2017/8/8.
 */
public class IgnoreFieldPropertyFilterImpl implements PropertyFilter {
    private String[] fields;

    public IgnoreFieldPropertyFilterImpl() {
    }

    public IgnoreFieldPropertyFilterImpl(String[] pars) {
        this.fields = pars;
    }

    public boolean apply(Object source, String name, Object value) {
        return value == null ? true : (this.fields == null ? false : (this.fields != null && this.fields.length > 0 ? this.juge(this.fields, name) : false));
    }

    public boolean juge(String[] s, String s2) {
        String[] var3 = s;
        int var4 = s.length;

        for (int var5 = 0; var5 < var4; ++var5) {
            String sl = var3[var5];
            if (s2.equals(sl)) {
                return false;
            }
        }

        return true;
    }
}
