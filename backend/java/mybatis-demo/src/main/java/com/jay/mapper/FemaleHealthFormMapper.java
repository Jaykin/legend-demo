package com.jay.mapper;

import com.jay.entity.FemaleHealthForm;
import com.jay.entity.MaleHealthForm;
import org.apache.ibatis.annotations.Param;

public interface FemaleHealthFormMapper {
    FemaleHealthForm getFemaleHealthForm(@Param("empId") Long empId);
}
