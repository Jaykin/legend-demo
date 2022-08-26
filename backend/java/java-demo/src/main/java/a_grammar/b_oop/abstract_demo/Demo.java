package a_grammar.b_oop.abstract_demo;

public class Demo extends AbstractDemo {
    @Override
    public void sayLove(String name) {
        System.out.println("I Love U, " + name);
    }

    public static void main(String[] args) {
        Demo demo = new Demo();
        demo.sayHello("My Friends!");
        demo.sayWelcome("Jay");
        demo.sayLove("vivian");
        demo.sayBye("An");
    }
}
