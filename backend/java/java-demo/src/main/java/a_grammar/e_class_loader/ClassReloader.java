package a_grammar.e_class_loader;

import java.util.ArrayList;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

/**
 * 实现类的热部署
 * */
public class ClassReloader extends ClassLoader {
    public static void main(String[] args) {
        List<Integer> ll = new ArrayList<>();
        Set<Integer> ss = new HashSet<>();

        ll.add(1);
        System.out.println(ll);

        ss.add(22);

        ll.clear();
        ll.addAll(ss);
        System.out.println(ll);
    }
}
