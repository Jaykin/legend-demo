package com.jay.mapper;

import com.jay.entity.User;
import org.apache.ibatis.annotations.Select;

import java.util.List;

public interface UserMapper {
    User selectById(long id);

    @Select("SELECT * FROM user WHERE age = #{age}")
    List<User> selectListByAge(int age);
}
