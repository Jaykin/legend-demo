package a_grammar.c_generics;

import java.awt.*;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Map;

/**
 * 泛型边界
 * - 边界允许我们对泛型使用的参数类型施加约束
 * - 支持通配符
 * */
public class GenericsBound {
    public static void main(String[] args) {
        // WithColorCoord<MyColor> withColorCoord = new WithColorCoord<>(new MyColor());
        // System.out.println("泛型边界: " + withColorCoord);

        // demo01();
        // demo02();
        demo03();
    }

    // <? extend Fruit>
    public static void demo01() {
        // 会进行向上转型，从而丢失往 List 传递任何对象的能力
        // 一个具有任何从 Fruit 继承的类型的列表
        java.util.List<? extends Fruit> flist = new ArrayList<>();
        flist.add(null);
        // flist.add(new Fruit()); // Error
        // flist.add(new Apple()); // Error
        // flist.add(new Object()); // Error
        Apple apple = (Apple) flist.get(0);
        System.out.println(apple);
    }

    // 超类型通配符 <? super Apple>
    public static void demo02() {
        java.util.List<? super Apple> apples = new ArrayList<>();
        apples.add(new Apple());
        apples.add(new Jonathan());
        System.out.println(apples);
    }

    // 无界通配符 <?>，意味着任何事物
    public static void demo03() {
        // 原生类型，等价 Map<Object, Object>
        Map map1 = new HashMap();
        map1.put("1", "2");
        System.out.println("demo03: " + map1);

        // 表示“具有某种特定类型的非原生 Map ，只是不知道类型是什么
        Map<?, ?> map2= new HashMap<>();
        // map2.put("1", "2"); // Error
        // map2.put("2", "3"); // Error

        Map<String, ?> map3 = new HashMap<>();
        // map3.put("1", "2"); // Error
    }
}


/**
 * 定义泛型边界
 * - <T extends Coord & HasColor> 边界：T 需要是 Coord 子类并实现 HasColor
 * */
class WithColorCoord<T extends Coord & HasColor> {
    T item;

    WithColorCoord(T item) { this.item = item; }

    T getItem() { return item; }

    Color color() {
        return item.getColor();
    }

    int getX() {
        return item.x;
    }

    int getY() {
        return item.y;
    }

    int getZ() {
        return item.z;
    }
}

/**
 * 通配符
 * - List<? extends Fruit>，读作“一个具有任何从 Fruit 继承的类型的列表”
 *      - 这实际上并不意味着这个 List 将持有任何类型的 Fruit
 * */

interface HasColor {
    Color getColor();
}

class Coord {
    public int x, y, z;
}

class Fruit {}

class Apple extends Fruit {}

class Jonathan extends Apple {}

class Orange extends Fruit {}

class MyColor extends Coord implements HasColor {
    @Override
    public Color getColor() {
        return null;
    }
}
