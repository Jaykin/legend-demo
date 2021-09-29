package com.springdemo.jay.DAO;

import com.springdemo.jay.entity.User2;
import org.springframework.stereotype.Repository;

/**
 * @author jay.wang
 * @date 2020-08-28 13:51
 */
@Repository
public interface User2Repository {
    User2 selectByPrimaryKey(Long id);

    int insertSelective(User2 user2);
}
