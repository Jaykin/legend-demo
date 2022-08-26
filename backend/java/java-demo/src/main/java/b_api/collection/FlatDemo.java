package b_api.collection;

import java.util.Collection;
import java.util.Collections;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import com.google.common.collect.Lists;

import helper.Descartes;

public class FlatDemo {
    public static void main(String[] args) {
        // demo01();
        demo02();
    }

    public static void demo02() {
        List<Integer> list = Lists.newArrayList(1, 2, 3);

        List<String> list2 = list.stream()
            .flatMap(item -> {
                // System.out.println(item);
                List<Integer> tmp = Lists.newArrayList(4, 5, 6);
                return tmp.stream().map(tmp1 -> tmp1 + "_" + item);
            })
            .collect(Collectors.toList());

        System.out.println(list2);
    }

    public static void demo01() {
        List<List<Integer>> llist = Descartes.geList(4, 4);
        // System.out.println(llist);
        List<Integer> list = llist.stream()
            .flatMap(item -> {
                // System.out.println(item);
                return item.stream();
            })
            .collect(Collectors.toList());
        System.out.println(list);
    }
}
