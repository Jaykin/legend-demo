package com.jay.db;

import com.jay.db.entity.User;
import org.mybatis.spring.SqlSessionTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;

@Component
public class MybatisSpringDemo {
    @Autowired
    private SqlSessionTemplate sqlSessionTemplate;

    public User selectUserById(Long id) {
        User user = sqlSessionTemplate.selectOne("com.jay.db.mapper.UserMapper.selectById", id);

        return user;
    }
}
