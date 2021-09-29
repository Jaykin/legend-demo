package a_grammar.b_oop.inner_class;

/**
 * @author jay.wang
 * @date 2021-08-24 10:30
 */
public class UseInnerClass implements ClassInInterface {
    public static void main(String[] args) {
        UseInnerClass uic = new UseInnerClass();

        // uic.useNormalInnerClass();

        // uic.useStaticInnerClass();

        uic.useInterfaceInnerClass();
    }

    /** 1、使用普通内部类 **/
    public void useNormalInnerClass() {
        // 1.1 获取外部类实例
        CreateInnerClass cic = new CreateInnerClass();

        // 1.2-1 通过 cic.new 实例化内部类
        CreateInnerClass.Contents cicCont = cic.new Contents();
        System.out.println(cicCont.value());

        // 1.2-2 通过外部类的方法获取内部类的实例
        CreateInnerClass.Contents cicCont2 = cic.getContentsInstance();
        System.out.println(cicCont2.value());
    }

    /** 2、使用静态内部类 **/
    public void useStaticInnerClass() {
        CreateInnerClass.Destination desc = new CreateInnerClass.Destination("ssfafa");
        System.out.println(desc.readLabel());
    }

    @Override
    public void howdy() {
        System.out.println("Howdy!");
    }

    /** 3、接口的内部类（public、static） **/
    public void useInterfaceInnerClass() {
        SayHi hi = new SayHi();
        hi.hello();
    }
}

interface ClassInInterface {
    void howdy();

    class SayHi implements ClassInInterface {
        @Override
        public void howdy() {
            System.out.println("Howdy!");
        }

        public void hello() {
            System.out.println("Hello!");
        }
    }
}