package com.jay.mapper;

import com.jay.entity.Task;
import org.apache.ibatis.annotations.Param;

public interface TaskMapper {
    Task getTask(@Param("id") Long id);
}
