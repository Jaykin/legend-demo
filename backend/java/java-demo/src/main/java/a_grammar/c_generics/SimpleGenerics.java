package a_grammar.c_generics;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.List;

/**
 * 简单泛型
 */
public class SimpleGenerics {
    public static void main(String[] args) {
        // 泛型类
        GenericsHolder<Automobile> gh = new GenericsHolder<>(); // 钻石语法
        gh.setA(new Automobile());
        System.out.println("泛型类：" + gh.getA());

        // 元组
        Tuple2<Automobile, Vehicle> tuple2 = new Tuple2<>(new Automobile(), new Vehicle());
        System.out.println("元组：" + tuple2.a + "、" + tuple2.b);
    }
}

class Automobile {}
class Vehicle {}

/**
 * 泛型类
 * - 类名后面加泛型参数 T
 * */
class GenericsHolder<T> {
    private T a;
    public void setA(T a) { this.a = a; }
    public T getA() { return a; }
}

/**
 * 元组(Tuple)
 * - 用来存储不同类型(利用泛型)的对象
 * */
// 单个对象
class Tuple<A> {
    public final A a;
    public Tuple(A a) { this.a = a; }
}

// 两个对象
class Tuple2<A, B> extends Tuple<A> {
    public final B b;
    public Tuple2(A a, B b) {
        super(a);
        this.b = b;
    }
}
