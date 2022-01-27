// import java.lang.reflect.InvocationHandler;
// import java.lang.reflect.Proxy;

public class ProxyTest {
    public static void main(String[] args) {
        // callByStaticProxy();

        callByDynamicProxy();
    }

    // 静态代理模式
    public static void callByStaticProxy() {
        AbstractSubject proxyStatic = new ProxyStatic();
        proxyStatic.request();
    }

    // 动态代理模式
    public static void callByDynamicProxy() {
        // // 1、生成 invocation handler，传入目标对象
        // InvocationHandler invokeHandler = new ProxyDynamicForInvokeArround(new RealSubject());

        // // 2、创建动态代理对象，每个代理对象都有一个相关联的 invocation handler（调用处理程序对象）
        // AbstractSubject proxy = (AbstractSubject) Proxy.newProxyInstance(AbstractSubject.class.getClassLoader(), new Class[]{AbstractSubject.class}, invokeHandler);
        // proxy.request();

        AbstractSubject proxy;
        try {
            proxy = (AbstractSubject) ProxyDynamicForInvokeArround.newProxyInstance(AbstractSubject.class, RealSubject.class, "JAY");
        } catch (Exception ex) {
            ex.printStackTrace();
            return;
        }

        proxy.request();
    }
}
