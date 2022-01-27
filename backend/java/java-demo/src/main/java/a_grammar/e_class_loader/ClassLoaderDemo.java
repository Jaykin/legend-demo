package a_grammar.e_class_loader;

import java.net.URLClassLoader;

/**
 * 类加载器
 * 1、将 class 文件加载到 JVM 中
 *      - 隐式加载
 *      - 显示加载
 * 2、审查每个类应该由谁加载，它是一种父优先的等级加载机制
 * 3、将字节码解析成 JVM 统一要求的对象格式
 *
 * 内置加载器
 * 1、Bootstrap ClassLoader: 用于加载 JVM 自身工作需要的类，由 JVM 控制
 * 2、Ext ClassLoader: 用于加载 System.getProperty("java.ext.dirs") 下的类
 * 3、APP ClassLoader: 用于加载 System.getProperty("java.class.path") 下的类，即应用的类
 *
 * 自定义加载器
 *      实现 CLassLoader 或者 继承 URLClassLoader，其父加载器总是 AppClassLoader
 * */
public class ClassLoaderDemo {
    public static void main(String[] args) {
        System.out.println(System.getProperty("java.ext.dirs")); // 获取指定键指示的系统属性(key-value)
        System.out.println(System.getProperty("java.class.path"));
    }
}
