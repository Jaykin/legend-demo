package com.jay.aop;

import org.aspectj.lang.annotation.*;

@Aspect
public class RoleAspect {
    @Before("execution(* com.jay.aop.RoleServiceImpl.printRole(..))")
    public void before() {
        System.out.println("before...");
    }

    @After("execution(* com.jay.aop.RoleServiceImpl.printRole(..))")
    public void after() {
        System.out.println("after...");
    }

    @AfterReturning("execution(* com.jay.aop.RoleServiceImpl.printRole(..))")
    public void afterReturning() {
        System.out.println("afterReturning...");
    }

    @AfterThrowing("execution(* com.jay.aop.RoleServiceImpl.printRole(..))")
    public void afterThrowing() {
        System.out.println("afterThrowing...");
    }
}
