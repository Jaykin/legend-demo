package a_grammar.b_oop.reflect.dynamic_proxy;

/**
 * 被代理的实现类
 * */
public class TargetImpl implements Target {
    @Override
    public void sayHello(String name) {
        System.out.println("Hello " + name);
    }
}
