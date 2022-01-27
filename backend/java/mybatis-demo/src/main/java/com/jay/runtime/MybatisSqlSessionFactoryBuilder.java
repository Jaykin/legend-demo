package com.jay.runtime;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import java.io.InputStream;

public class MybatisSqlSessionFactoryBuilder {
    // 单例
    private static SqlSessionFactory sqlSessionFactory = null;

    private MybatisSqlSessionFactoryBuilder () {}

    /**
     * TODO: 需要加锁防止多线程重复实例化 factory
     * */
    public static SqlSessionFactory build() {
        if (sqlSessionFactory != null) {
            return sqlSessionFactory;
        }

        try {
            InputStream mybatisConfigInputStream = Resources.getResourceAsStream("mybatis-config.xml");
            sqlSessionFactory = new SqlSessionFactoryBuilder().build(mybatisConfigInputStream);
        } catch (Exception ex) {
            System.out.println(ex);
        }

        return sqlSessionFactory;
    }
}
