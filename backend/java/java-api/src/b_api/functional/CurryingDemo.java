package b_api.functional;

import java.util.function.Function;

/**
 * @author jay.wang
 * @date 2021-08-30 11:20
 */
public class CurryingDemo {
    // 未柯里化
    static String uncurried(String a, String b) {
        return a + b;
    }

    // 柯里化
    static Function<String, Function<String, String>> sum = a -> b -> a + b;

    public static void main(String[] args) {
        System.out.println(sum.apply("Hi ").apply("Jay!"));

        // 部分求值
        Function<String, String> sumHi = sum.apply("Hi ");
        System.out.println(sumHi.apply("Jay!"));
        System.out.println(sumHi.apply("Vivian!"));
    }
}
