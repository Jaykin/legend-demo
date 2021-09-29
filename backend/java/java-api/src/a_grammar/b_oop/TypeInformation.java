package a_grammar.b_oop;

import java.util.*;

/**
 * 运行时类型信息 RTTI
 * */
public class TypeInformation {
    public static void showFields(Object params) {
        Arrays.stream(params.getClass().getDeclaredFields())
            .forEach(field -> {
                System.out.println(field.toString());
            });
    }
}

class A {
    private String a;
    private String b;
    private String c;
}

class B {
    private String d;
    private String e;
    private String f;
}

// ============================== Class 对象 ==============================
interface HasBatteries {}
interface Waterproof {}
interface Shoots {}

class Toy {
    Toy() {}
    Toy(int i) {}
}

class FancyToy extends Toy implements HasBatteries, Waterproof, Shoots {
    FancyToy() {
        super(1);
    }
}

class ToyTest {
    static void printInfo(Class cc) {
        System.out.println("完整类名：" + cc.getName());
        System.out.println("是否为接口：" + cc.isInterface());
        System.out.println("不带包名的类名：" + cc.getSimpleName());
        System.out.println("Canonical Name：" + cc.getCanonicalName());
    }

//    public static void main(String[] args) {
//        Class c = null;
//        try {
//            c = Class.forName("FancyToy");
//        } catch(ClassNotFoundException e) {
//            System.out.println("Can't find FancyToy");
//            System.exit(1); // 退出
//        }
//
//        // 打印 Class 相关信息
//        printInfo(c);
//        for(Class face : c.getInterfaces()) // 获取实现的接口的 Class 对象
//            printInfo(face);
//
//        Class up = c.getSuperclass(); // 获取父类的 Class 对象
//        Object obj = null;
//
//        try {
//            obj = up.newInstance(); // 实例化对象，只能得到 Object 对象，因为 up 仅是 Class 对象的引用
//        } catch(InstantiationException e) {
//            System.out.println("Cannot instantiate");
//            System.exit(1);
//        } catch(IllegalAccessException e) {
//            System.out.println("Cannot access");
//            System.exit(1);
//        }
//
//        printInfo(obj.getClass());
//    }
}


// ============================== 反射 ==============================
// 使用反射展示一个类的所有方法，包括基类中的方法
//class ShowMethods {
//    public static void main(String[] args) {
//        if (args.length < 1) {
//            System.out.println("传入参数有误！");
//            System.exit(0);
//        }
//
//        try {
//            Class<?> c = Class.forName(args[0]);
//            Method[] methods = c.getMethods();
//            Constructor[] ctors = c.getConstructors();
//
//            for (Method method : methods)
//                System.out.println(method.toString());
//            for (Constructor ctor : ctors)
//                System.out.println(ctor.toString());
//        } catch(ClassNotFoundException e) {
//            System.out.println("No such class: " + e);
//        }
//    }
//}