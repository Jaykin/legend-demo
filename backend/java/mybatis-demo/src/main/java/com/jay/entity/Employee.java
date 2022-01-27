package com.jay.entity;

import com.jay.constant.SexEnum;
import lombok.Data;

import java.io.Serializable;
import java.util.Date;
import java.util.List;

@Data
public class Employee implements Serializable {
    private Long id;
    private String realName ;
    private SexEnum sex = null;
    private Date birthday;
    private String mobile;
    private String email;
    private String position;
    private String note;

    // 级联 - 工牌信息(一对一)
    private WorkCard workCard;
    // 级联 - 雇员任务(一对多)
    private List<EmployeeTask> employeeTaskList = null;
}
