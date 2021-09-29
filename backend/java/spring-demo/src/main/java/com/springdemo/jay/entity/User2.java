package com.springdemo.jay.entity;

import java.util.Date;

/**
 * @author jay.wang
 * @date 2020-08-28 13:54
 */
public class User2 {
    private Long id;

    private String name;

    private String avatar;

    private Date createTime;

    private Date updateTime;

    public Long getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public String getAvatar() {
        return avatar;
    }

    public Date getCreateTime() {
        return createTime;
    }

    public Date getUpdateTime() {
        return updateTime;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setAvatar(String avatar) {
        this.avatar = avatar;
    }

    public void setCreateTime(Date createTime) {
        this.createTime = createTime;
    }

    public void setUpdateTime(Date updateTime) {
        this.updateTime = updateTime;
    }

    @Override
    public String toString() {
        return "User2{" +
            "id=" + id +
            ", name='" + name + '\'' +
            ", avatar='" + avatar + '\'' +
            ", createTime=" + createTime +
            ", updateTime=" + updateTime +
            '}';
    }
}
