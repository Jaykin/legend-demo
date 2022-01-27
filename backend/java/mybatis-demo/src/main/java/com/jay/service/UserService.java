package com.jay.service;

import com.jay.entity.User;
import com.jay.mapper.UserMapper;
import com.jay.runtime.MybatisSqlSessionFactoryBuilder;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.log4j.Logger;

public class UserService {
    private static Logger logger = Logger.getLogger(UserService.class);

    public User getUserById(Long id) {
        SqlSessionFactory sqlSessionFactory = MybatisSqlSessionFactoryBuilder.build();
        SqlSession sqlSession = sqlSessionFactory.openSession();

        try {
            // 1、执行 SQL：直接使用 sqlSession
            User user1 = sqlSession.selectOne("com.jay.mapper.UserMapper.selectById", 1L);

            // 2、执行 SQL：使用 Mapper 接口（推荐）
            UserMapper userMapper = sqlSession.getMapper(UserMapper.class);
            User user2 = userMapper.selectById(1L);

            /** 提交事务 **/
            sqlSession.commit();
            return user2;
        } catch (Exception ex) {
            /** 回滚事务 **/
            sqlSession.rollback();
        } finally {
            if (sqlSession != null) {
                /** 关闭 session，释放资源 **/
                sqlSession.close();
            }
        }

        return null;
    }
}
