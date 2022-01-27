package b_api.collection;

import java.util.ArrayDeque;
import java.util.Arrays;
import java.util.LinkedList;

public class CollectionDemo {
    public static void main(String[] args) {
        listDemo();
    }

    public static void listDemo() {
        // 链表
        LinkedList<Integer> llist = new LinkedList<>(Arrays.asList(1, 2, 3, 4));

        System.out.println(llist);
    }
}
