package com.springdemo.jay;

import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

import java.util.stream.Stream;

public class MainApp {
    public static void main(String[] args) {
        ApplicationContext context = new ClassPathXmlApplicationContext("spring-demo.xml");

//        HelloWorld obj = (HelloWorld) context.getBean("helloWorld");
//        try {
//            obj.txDemo();
//        } catch (Throwable t) {
//            System.out.println("error: " + t.getMessage());
//        }

        Object[] a = Stream.of("path")
                .map(s -> MainApp::change).toArray();
        System.out.println(a[0].toString());
    }

    public static String change(String pp) {
        return pp + "2222";
    }
}
