package a_grammar.b_oop.reflect.dynamic_proxy;

import java.lang.reflect.Method;

public class MyInterceptor implements Interceptor{
    @Override
    public boolean before(Object proxy, Object target, Method method, Object[] args) {
        System.out.println("拦截器00-调用目标方法前执行");
        return true;
    }

    @Override
    public void around(Object proxy, Object target, Method method, Object[] args) {
        System.out.println("拦截器00-调用目标方法前/后都执行");
    }

    @Override
    public void after(Object proxy, Object target, Method method, Object[] args) {
        System.out.println("拦截器00-调用目标方法后执行");
    }
}
