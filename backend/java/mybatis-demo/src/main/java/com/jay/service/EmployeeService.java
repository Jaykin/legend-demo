package com.jay.service;

import com.jay.entity.Employee;
import com.jay.mapper.EmployeeMapper;
import com.jay.runtime.MybatisSqlSessionFactoryBuilder;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.log4j.Logger;

public class EmployeeService {
    private static Logger logger = Logger.getLogger(EmployeeService.class);

    public Employee getEmployeeById(Long empId) {
        Employee employee = null;
        SqlSessionFactory sqlSessionFactory = MybatisSqlSessionFactoryBuilder.build();
        SqlSession sqlSession = sqlSessionFactory.openSession();
        SqlSession sqlSession2 = sqlSessionFactory.openSession();

        try {
            EmployeeMapper employeeMapper = sqlSession.getMapper(EmployeeMapper.class);
            employee = employeeMapper.getEmployee(empId);
            // Employee employee2 = employeeMapper.getEmployee(empId); // 读一级缓存
            sqlSession.commit();

            EmployeeMapper employeeMapper2 = sqlSession2.getMapper(EmployeeMapper.class);
            Employee employee2 = employeeMapper2.getEmployee(empId); // 不读一级缓存，可读二级级缓存
            sqlSession2.commit();

            // logger.info("getEmployeeById: " + employee.toString());
        } catch (Exception ex) {
            // sqlSession.rollback();
            logger.error(ex);
        } finally {
            if (sqlSession != null) {
                sqlSession.close();
            }

            if (sqlSession2 != null) {
                sqlSession2.close();
            }
        }

        return employee;
    }
}
