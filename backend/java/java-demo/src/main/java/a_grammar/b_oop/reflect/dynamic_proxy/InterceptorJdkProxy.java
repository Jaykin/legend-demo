package a_grammar.b_oop.reflect.dynamic_proxy;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;
import java.util.Objects;

public class InterceptorJdkProxy implements InvocationHandler {
    private Object target = null; // 真实对象

    private String interceptorClassName = null; // 拦截器类的全限定名称

    public InterceptorJdkProxy(Object target, String interceptorClassName) {
        this.target = target;
        this.interceptorClassName = interceptorClassName;
    }

    public static Object getProxy(Object target, String interceptorClassName) {
        return Proxy.newProxyInstance(target.getClass().getClassLoader(),
                target.getClass().getInterfaces(),
                new InterceptorJdkProxy(target, interceptorClassName));
    }

    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        // 未设置拦截器
        if (Objects.isNull(this.interceptorClassName)) {
            return method.invoke(target, args);
        }

        // 生成拦截器对象
        Interceptor interceptor = (Interceptor) Class.forName(this.interceptorClassName)
                .getConstructor()
                .newInstance();

        // 执行拦截器的 before 方法
        boolean isInvokeTargetMethod = interceptor.before(proxy, target, method, args);

        if (isInvokeTargetMethod) {
            method.invoke(target, args);
        } else {
            interceptor.around(proxy, target, method, args);
        }

        // 执行拦截器的 before 方法
        interceptor.after(proxy, target, method, args);

        return null;
    }
}
