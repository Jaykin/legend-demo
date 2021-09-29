package a_grammar.c_generics;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;

/**
 * @author jay.wang
 * @date 2021-09-01 16:48
 */
public class GenericsDemo {
    public static void main(String[] args) {
//        System.out.println(makeList("this", "is", true));

        wildcard();
    }

    @SafeVarargs
    private static <T> List<T> makeList(T... args) {
        List<T> result = new ArrayList<>();

        for (T item : args) {
            result.add(item);
        }

        return result;
    }

    private static void wildcard() {
        List<Apple> alist = Arrays.asList(new Apple(), new Apple());

        List<Fruit> flist = new ArrayList<>();
        flist.add(new Fruit());
        flist.add(new Apple());
        // flist = alist // Error，泛型类型不一样，无法将派生类列表赋值给基类列表引用
        flist.forEach(System.out::print);


        List<? extends Fruit> flist2 = alist;
//        flist2.add(new Fruit());  // Error
//        flist2.add(new Apple());  // Error
    }
}

class Fruit {}

class Apple extends Fruit {}

class Orange extends Fruit {}

class Jonathan extends Apple {}


