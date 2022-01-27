package com.jay.db;

import com.jay.db.entity.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Component;

import java.sql.ResultSet;
import java.util.List;

@Component
public class JdbcTemplateDemo {
    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<User> findUser(String nickname) {
        String sql = "select * from user where nickname like concat('%', ?, '%')";
        Object[] params = { nickname };

        List<User> list = jdbcTemplate.query(sql, params, (ResultSet rs, int rowNum) -> {
            User result = new User();
            result.setId(rs.getLong("id"));
            result.setNickname(rs.getString("nickname"));
            result.setAge(rs.getInt("age"));

            return result;
        });

        return list;
    }
}
