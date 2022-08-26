package a_grammar.b_oop.abstract_demo;

public abstract class AbstractDemo implements IDemo {
    @Override
    public void sayHello(String msg) {
        System.out.println("Hello " + msg);
    }

    @Override
    public void sayWelcome(String name) {
        IDemo.super.sayWelcome(name);
        System.out.println("from AbstractDemo...");
    }

    public abstract void sayLove(String name);

    public void sayBye(String name) {
        System.out.println("Bye " + name);
    }
}
