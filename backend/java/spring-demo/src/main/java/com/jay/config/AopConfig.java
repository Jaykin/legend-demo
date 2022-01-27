package com.jay.config;

import com.jay.aop.RoleAspect;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.EnableAspectJAutoProxy;

@Configuration
@EnableAspectJAutoProxy
public class AopConfig {
    @Bean
    public RoleAspect getRoleAspect() {
        return new RoleAspect();
    }
}
