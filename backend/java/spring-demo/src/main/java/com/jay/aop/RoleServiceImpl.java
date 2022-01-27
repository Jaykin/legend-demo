package com.jay.aop;

import org.springframework.stereotype.Component;

@Component("aop_roleServiceImpl")
public class RoleServiceImpl implements RoleService {
    @Override
    public void printRole(Role role) {
        System.out.println("{id: " + role.getId() + ", "
            + "role_name: " + role.getRoleName() + ", "
            + "role_note: " + role.getNote());
    }
}
