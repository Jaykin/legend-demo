package b_api.functional;

import java.util.function.Function;
import java.util.function.Predicate;
import java.util.stream.Stream;

/**
 * @author jay.wang
 * @date 2021-08-30 10:51
 */
public class FunctionCompositionDemo {
    /** 1、调用顺序的组合 **/
    static Function<String, String>
        f1 = s -> {
            System.out.println("f1: " + s);
            return s.replace('A', '_');
        },
        f2 = s -> {
            System.out.println("f2: " + s);
            return s.substring(3);
        },
        f3 = String::toLowerCase,
        f4 = f1.compose(f2).andThen(f3),
        f5 = f1.andThen(f2);

    /** 2、断言组合 **/
    static Predicate<String>
        p1 = s -> s.contains("bar"),
        p2 = s -> s.length() < 5,
        p3 = s -> s.contains("foo"),
        p4 = p1.negate().and(p2).or(p3); // 如果字符串中不包含 bar 且长度小于 5，或者它包含 foo ，则结果为 true

    public static void main(String[] args) {
        System.out.println("====== f4 ======");
        System.out.println("f4: " + f4.apply("GO AFTER ALL AMBULANCES"));
        System.out.println("====== f5 ======");
        System.out.println("f5: " + f5.apply("GO AFTER ALL AMBULANCES"));

        System.out.println("====== p4 ======");
        Stream.of("bar", "foobar", "foobaz", "fongopuckey")
            .filter(p4)
            .forEach(System.out::println);
    }
}
