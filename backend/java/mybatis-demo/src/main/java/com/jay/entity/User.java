package com.jay.entity;

import lombok.Data;

import java.io.Serializable;
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
