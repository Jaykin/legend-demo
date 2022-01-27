package com.jay;


import com.jay.config.AopConfig;
import com.jay.config.ApplicationConfig;
import com.jay.di.anno.RoleServiceImpl;
import org.springframework.context.ApplicationContext;
import org.springframework.context.annotation.AnnotationConfigApplicationContext;

public class Application {
    public static void main(String[] args) {
        ApplicationContext context = new AnnotationConfigApplicationContext(ApplicationConfig.class);

        // Role role = context.getBean(Role.class);
        // System.out.println(role.getRoleName());

        // RoleServiceImpl roleService = context.getBean(RoleServiceImpl.class);
        // roleService.printRoleInfo();

        /** 获取属性文件的属性 **/
        String testProp = context.getEnvironment().getProperty("my.prop.test");
        System.out.println("Application#main: " + testProp);
    }
}
