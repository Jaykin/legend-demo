package a_grammar.b_oop.reflect.dynamic_proxy;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

/**
 * 用于创建代理对象、绑定目标对象
 * */
public class JdkProxyExample implements InvocationHandler {
    Object target = null;

    /**
     * 获取代理对象(动态创建的)
     * @param target 被代理的对象
     * @return Proxy
     * */
    public Object getProxy(Object target) {
        this.target = target;

        // 创建代理对象，并将被代理对象与this绑定
        return Proxy.newProxyInstance(
                target.getClass().getClassLoader(),
                target.getClass().getInterfaces(),
                this);
    }

    // 自定义的代理方法逻辑
    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        System.out.println("自定义代理逻辑 start");

        Object result = method.invoke(target, args);

        System.out.println("自定义代理逻辑 end");
        return result;
    }
}
