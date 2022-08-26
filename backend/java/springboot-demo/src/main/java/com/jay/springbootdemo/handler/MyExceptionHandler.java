package com.jay.springbootdemo.handler;

import lombok.extern.slf4j.Slf4j;
import org.springframework.web.bind.MethodArgumentNotValidException;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

@Slf4j
// @ControllerAdvice
public class MyExceptionHandler {
    /**
     * 处理校验异常
     */
    @ExceptionHandler(value = MethodArgumentNotValidException.class)
    public String handleMethodArgumentNotValidException(MethodArgumentNotValidException ex) {
        log.error("req params error", ex);
        return "100001: 非法参数请求";
    }

    /**
     * 处理其余的异常
     */
    @ExceptionHandler(value = Exception.class)
    public String handleOthersException(Exception exception) {
        log.error("系统出现异常: ", exception);
        return "999999: 系统未知异常";
    }
}
