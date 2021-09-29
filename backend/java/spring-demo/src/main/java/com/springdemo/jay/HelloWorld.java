package com.springdemo.jay;

import com.springdemo.jay.DAO.User1Repository;
import com.springdemo.jay.DAO.User2Repository;
import com.springdemo.jay.entity.User1;
import org.springframework.beans.factory.annotation.*;
import org.springframework.transaction.annotation.Transactional;

import java.util.Date;
import java.util.Objects;

public class HelloWorld implements Cloneable {
    @Autowired
    private SpellChecker spellChecker;

    @Autowired
    private User1Repository user1Repo;

    @Autowired
    private User2Repository user2Repo;

    public void spellCheck(){
        spellChecker.checkSpelling();
    }

    public void run() {}

    /**
     * 事务 demo
     * */
    @Transactional
    public void txDemo() {
        User1 user1 = user1Repo.selectByPrimaryKey(1L);

        if (user1 != null) {
            User1 newUser1 = new User1();
            newUser1.setAvatar("xxxx");
            newUser1.setName("Jay11");
            newUser1.setCreateTime(new Date());

            user1Repo.insertSelective(newUser1);
            throw new MyException();
        }

        System.out.println(Objects.toString(user1, "sss"));
    }

    /**
     * 克隆
     * */
    public HelloWorld clone() throws CloneNotSupportedException {
        return (HelloWorld) super.clone(); // Object.clone() 是 native 方法，java 提供的
    }
}
