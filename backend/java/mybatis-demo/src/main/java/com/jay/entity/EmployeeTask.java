package com.jay.entity;

import lombok.Data;

@Data
public class EmployeeTask {
    private Long id;
    private Long empId;
    private String taskName;
    private String note;

    // 级联 - 任务(一对一)
    private Task task = null;
}
