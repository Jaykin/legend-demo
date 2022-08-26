package com.jay;

import com.jay.aop.Role;
import com.jay.aop.RoleServiceImpl;
import com.jay.config.AopConfig;
import com.jay.config.ApplicationConfig;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class Application {
    public static void main(String[] args) {
        ApplicationContext context = new AnnotationConfigApplicationContext(ApplicationConfig.class);

        RoleServiceImpl roleServiceImpl = (RoleServiceImpl) context.getBean("aop_roleServiceImpl");
        roleServiceImpl.printRole(new Role());

        /** 获取属性文件的属性 **/
        // String testProp = context.getEnvironment().getProperty("my.prop.test");
        // System.out.println("Application#main: " + testProp);
    }
}
