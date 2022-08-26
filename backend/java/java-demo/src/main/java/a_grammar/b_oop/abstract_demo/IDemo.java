package a_grammar.b_oop.abstract_demo;

public interface IDemo {
    void sayHello(String msg);

    default void sayWelcome(String name) {
        System.out.println("Welcome " + name);
    }
}
