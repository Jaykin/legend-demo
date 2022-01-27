import java.lang.reflect.Constructor;
import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.lang.reflect.Proxy;

/**
 * 动态代理类 - 调用 arround
 * - 每个代理实例均有一个相关联的 invocation handler
 * - 当调用代理实例的某个方法时，这个调用会被编译成 Method，并派发到 invocation handler 的 method
 */
public class ProxyDynamicForInvokeArround extends ProxyDynamic implements InvocationHandler {
    private Object target;

    private ProxyDynamicForInvokeArround(Object target) {
        this.target = target;
    }

    // 生成代理实例
    public static Object newProxyInstance(Class<?> interfaceClazz, Class<?> targetClazz, Object ... targetConstructorArgs) throws Exception {
        // 创建目标实例
        Constructor cons = targetClazz.getConstructor();
        Object target = cons.newInstance(targetConstructorArgs);

        // 创建 invocation handler 实例
        InvocationHandler invokeHandler = new ProxyDynamicForInvokeArround(target);

        // 创建代理实例
        Object proxy = Proxy.newProxyInstance(interfaceClazz.getClassLoader(), new Class[]{interfaceClazz}, invokeHandler);

        return proxy;
    }

    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        preInvoke();
        method.invoke(target, args);
        postInvoke();
        
        return null;
    }

    // invoke arround 的方法
    private void preInvoke() {
        System.out.println("访问真实主题之前的预处理 by Proxy ...");
    }
    private void postInvoke() {
        System.out.println("访问真实主题之后的后续处理  by Proxy ...");
    }
}