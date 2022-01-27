package com.jay.aop;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Data
@Component("aop_role")
public class Role {
    @Value("1")
    private Long id;
    @Value("Full Stack Developer")
    private String roleName;
    @Value("yyds")
    private String note;
}
