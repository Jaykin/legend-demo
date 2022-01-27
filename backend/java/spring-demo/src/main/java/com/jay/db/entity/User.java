package com.jay.db.entity;

import lombok.Data;

import java.util.Date;

@Data
public class User {
    private Long id;
    private Integer age;
    private String nickname;
    private String phone;
    private Date createTime;
    private Date updateTime;
}
