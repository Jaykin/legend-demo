package b_api.functional;

/**
 * @author jay.wang
 * @date 2021-08-26 11:56
 */
public class MethodReferencesDemo {
    public static void main(String[] args) {
        MethodReferencesDemo mrd = new MethodReferencesDemo();

        /** 1、实例引用 - 实例方法 **/
        A a1 = mrd::mrDetail;
        System.out.println(a1.detail("实例引用 - 实例方法"));

        /** 2、类引用 - 静态方法 **/
        A a2 = MethodReferencesDemo::mrDetailStatic;
        System.out.println(a2.detail("类引用 - 静态方法"));

        /** 3、类引用 - 构造方法(函数) **/
        B b1 = MethodReferencesDemo::new;
        System.out.println(b1.make().mrDetail("类引用 - 构造方法(函数)"));

        /** 4、类引用 - 实例方法 **/
        C c1 = MethodReferencesDemo::mrDetail;
        System.out.println(c1.detail(mrd, "类引用 - 实例方法"));
    }

    public String mrDetail(String head) {
        return head + " by call MethodReferencesDemo.mrDetail!";
    }

    public static String mrDetailStatic(String head) {
        return head + " by call MethodReferencesDemo.mrDetailStatic!";
    }
}

interface A {
    String detail(String head);
}

interface B {
    MethodReferencesDemo make();
}

interface C {
    String detail(MethodReferencesDemo mr, String head);
}