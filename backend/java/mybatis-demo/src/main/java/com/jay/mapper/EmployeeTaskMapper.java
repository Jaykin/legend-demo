package com.jay.mapper;

import com.jay.entity.EmployeeTask;
import org.apache.ibatis.annotations.Param;

import java.util.List;

public interface EmployeeTaskMapper {
    List<EmployeeTask> getEmployeeTaskByEmpid(@Param("empId") Long empId);
}
