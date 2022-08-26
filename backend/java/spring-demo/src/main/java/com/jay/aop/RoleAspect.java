package com.jay.aop;

import com.google.protobuf.Method;

import org.aspectj.lang.ProceedingJoinPoint;
import org.aspectj.lang.annotation.*;

@Aspect
public class RoleAspect {
    @Pointcut("execution(* com.jay.aop.RoleServiceImpl.printRole(..))")
    public void pointcut() {
    };

    // @Before("execution(* com.jay.aop.RoleServiceImpl.printRole(..))")
    // public void before() {
    // System.out.println("before...");
    // }

    // @After("pointcut()")
    // public void after() {
    // System.out.println("after...");
    // }

    @Around(value = "pointcut()&&" + "this(roleService)", argNames = "joinPoint,roleService")
    public void around(ProceedingJoinPoint joinPoint, RoleService roleService) {
        Object[] args = joinPoint.getArgs();

        roleService.printRole((Role) args[0]);
    }

    // @AfterReturning("pointcut()")
    // public void afterReturning() {
    // System.out.println("afterReturning...");
    // }

    // @AfterThrowing("")
    // public void afterThrowing() {
    // System.out.println("afterThrowing...");
    // }
}
