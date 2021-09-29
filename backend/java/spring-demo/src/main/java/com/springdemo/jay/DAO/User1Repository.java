package com.springdemo.jay.DAO;

import com.springdemo.jay.entity.User1;
import org.springframework.stereotype.Repository;

/**
 * @author jay.wang
 * @date 2020-08-28 12:19
 */
@Repository
public interface User1Repository {
    User1 selectByPrimaryKey(Long id);

    int insertSelective(User1 user1);
}
