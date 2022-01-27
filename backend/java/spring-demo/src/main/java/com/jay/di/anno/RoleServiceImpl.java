package com.jay.di.anno;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.stereotype.Component;

@Component
public class RoleServiceImpl {
    @Autowired
    @Qualifier("role_anno_01")
    private Role role;

    public void printRoleInfo() {
        System.out.println(role.getRoleName() + ";;" + role.getNote());
    }
}
