package com.jay.di.xml;

import lombok.Data;

@Data
public class Role {
    private Long id;
    private String roleName;
    private String note;

    public Role() {}

    public Role(String roleName , String note) {
        this.roleName = roleName;
        this.note = note;
    }
}
