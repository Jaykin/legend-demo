package b_api.stream;

import java.util.stream.LongStream;

public class LongStreamDemo {
    public static void main(String[] args) {
        // System.out.println(LongStream.rangeClosed(2, (long) Math.sqrt(40))
        //         .noneMatch(i -> i > 3));

        // 无限流
        LongStream.iterate(0, i -> i + 1)
                .limit(20)
                .forEach(System.out::println);
    }
}
