package com.jay.mapper;

import com.jay.entity.WorkCard;
import org.apache.ibatis.annotations.Param;

public interface WorkCardMapper {
    WorkCard getWorkCardByEmpid(@Param("empId") Long empId);
}
