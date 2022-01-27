package com.jay.mapper;

import com.jay.entity.MaleHealthForm;
import org.apache.ibatis.annotations.Param;

public interface MaleHealthFormMapper {
    MaleHealthForm getMaleHealthForm(@Param("empId") Long empId);
}
