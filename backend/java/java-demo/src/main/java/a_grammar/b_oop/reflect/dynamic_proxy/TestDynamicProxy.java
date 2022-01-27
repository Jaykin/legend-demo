package a_grammar.b_oop.reflect.dynamic_proxy;

public class TestDynamicProxy {
    public static void main(String[] args) {
        // test01();
        // test02();
        test03();
    }

    public static void test01() {
        JdkProxyExample jdkProxyExample = new JdkProxyExample();

        // 创建目标对象
        Target target = new TargetImpl();

        // 获取代理对象
        Target targetProxy = (Target) jdkProxyExample.getProxy(target);

        // 调用代理对象的方法，最后会调用目标对象的方法
        targetProxy.sayHello("Vivian");
    }

    public static void test02() {
        Target proxy = (Target) InterceptorJdkProxy.getProxy(new TargetImpl(), "a_grammar.b_oop.reflect.dynamic_proxy.MyInterceptor");

        proxy.sayHello("Jay");
    }

    /**
     * 责任链模式
     * */
    public static  void test03() {
        Target proxy00 = (Target) InterceptorJdkProxy.getProxy(new TargetImpl(), "a_grammar.b_oop.reflect.dynamic_proxy.MyInterceptor");
        Target proxy01 = (Target) InterceptorJdkProxy.getProxy(proxy00, "a_grammar.b_oop.reflect.dynamic_proxy.MyInterceptor01");
        Target proxy02 = (Target) InterceptorJdkProxy.getProxy(proxy01, "a_grammar.b_oop.reflect.dynamic_proxy.MyInterceptor02");

        proxy02.sayHello("Timi");
    }
}
