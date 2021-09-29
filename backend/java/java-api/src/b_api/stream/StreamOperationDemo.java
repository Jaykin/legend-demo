package b_api.stream;

import java.util.Comparator;
import java.util.stream.Stream;

/**
 * @author jay.wang
 * @date 2021-08-31 16:13
 */
public class StreamOperationDemo {
    public static void main(String[] args) {
        peeking();
        sorted();
    }

    private static Stream<String> buildStream() {
        return Stream.of("It's", "a", "wonderful", "day", "for", "pie!");
    }

    /**
     * 1、跟踪和调试
     * */
    private static void peeking() {
        System.out.println("========== 1、跟踪和调试 ==========");

        buildStream()
            .skip(2)
            .limit(3)
            .map(w -> w + " ")
            .peek(System.out::print)
//            .map(String::toUpperCase)
//            .peek(System.out::print)
//            .map(String::toLowerCase)
            .forEach(System.out::print);
    }

    /**
     * 2、排序
     * */
    private static void sorted() {
        System.out.println("========== 2、排序 ==========");

        buildStream()
            .skip(1)
            .limit(4)
            .sorted(Comparator.reverseOrder())
            .map(w -> w + " ")
            .forEach(System.out::print);
    }
}
