package com.springdemo.jay;

//import org.aspectj.lang.JoinPoint;

public class Aop {
    public void beforeAdvice() {
        System.out.println("beforeAdvice");
    }

    public void afterReturningAdvice(Object result) {
        System.out.println("afterReturningAdvice");
    }

    public void afterThrowingAdvice(Throwable throwable) {
        System.out.println("afterThrowingAdvice");
    }

}
