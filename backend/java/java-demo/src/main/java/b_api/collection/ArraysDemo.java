package b_api.collection;

import java.util.Arrays;
import java.util.List;

public class ArraysDemo {
    public static void main(String[] args) {
        /** 1、创建 List **/
        // 1.1接收多参数
        List<Integer> list1 = Arrays.asList(1, 2, 3, 4, 5); // 1.1接收多参数
        // list1.add(11); // UnsupportedOperationException，因为 Arrays.asList 底层是数组，不是 ArrayList 类

        // 1.2接收数组
        Integer[] ints = { 6, 7, 8 };
        List<Integer> list2 = Arrays.asList(ints);

        System.out.println(list1);
        System.out.println(list2);
    }
}
