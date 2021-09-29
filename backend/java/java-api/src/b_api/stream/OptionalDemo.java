package b_api.stream;

import java.util.stream.IntStream;
import java.util.stream.Stream;

/**
 * @author jay.wang
 * @date 2021-08-31 16:49
 */
public class OptionalDemo {
    public static void main(String[] args) {
        System.out.println(Stream.<String>empty()
            .findFirst());
        System.out.println(Stream.of(1, 2, 3)
            .findAny());
        System.out.println(Stream.<String>empty()
            .max(String.CASE_INSENSITIVE_ORDER));
        System.out.println(Stream.<String>empty()
            .min(String.CASE_INSENSITIVE_ORDER));
        System.out.println(Stream.<String>empty()
            .reduce((s1, s2) -> s1 + s2));
        System.out.println(IntStream.empty()
            .average());
    }
}
