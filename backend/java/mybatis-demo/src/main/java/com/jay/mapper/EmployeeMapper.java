package com.jay.mapper;

import com.jay.entity.Employee;
import org.apache.ibatis.annotations.Param;

public interface EmployeeMapper {
    Employee getEmployee(@Param("id") Long id);
}
