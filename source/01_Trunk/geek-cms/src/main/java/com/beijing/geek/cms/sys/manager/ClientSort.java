package com.beijing.geek.cms.sys.manager;


import com.beijing.geek.cms.sys.dao.sys.Client;

import java.util.Comparator;

public class ClientSort implements Comparator<Client> {


    public int compare(Client prev, Client now) {
        return (int) (now.getLoginTime().getTime() - prev.getLoginTime().getTime());
    }

}
