package b_api.concurrent;

import java.io.IOException;
import java.util.List;
import java.util.function.LongSupplier;
import java.util.stream.Collectors;
import java.util.stream.IntStream;
import java.util.stream.LongStream;
import java.util.stream.Stream;
import helper.*;

/**
 * 并行流
 * */
public class ParallelStreamDemo {
    public static void main(String[] args) throws IOException {
        demo01();
        // demo02();
        // demo03();
    }

    public static boolean isPrime(long n) {
        return LongStream.rangeClosed(2, (long)Math.sqrt(n))
                    .noneMatch(i -> n % i == 0);
    }

    public static void timeTest(String id, long checkValue, LongSupplier operation) {
        System.out.print(id + ": ");
        Timer timer = new Timer();
        long result = operation.getAsLong();

        if(result == checkValue) {
            System.out.println(timer.duration() + "ms");
        } else {
            System.out.format("result: %d%ncheckValue: %d%n", result, checkValue);
        }
    }

    public static void demo01() throws IOException {
        Timer timer = new Timer();
        // 素数
        List<String> primes = Stream.iterate(2, i -> i + 1)
                .parallel()
                .peek(e -> System.out.println(e+ ": " + Thread.currentThread()))
                .filter(ParallelStreamDemo::isPrime)
                .limit(100_000)
                .map(Long::toString)
                .collect(Collectors.toList());

        System.out.println(timer.duration());
    }

    public static void demo02() {
        long sz = 100_000_000L;
        long check = sz * (sz + 1) / 2;

        // 简单流求和
        timeTest("Jay Stream", check, () -> LongStream.rangeClosed(0, sz).sum());

        // 并行流求和
        timeTest("Jay Parallel Stream", check, () -> LongStream.rangeClosed(0, sz).parallel().sum());

        // 无限流求和
        timeTest("Jay Iterated", check, () -> LongStream.iterate(0, i -> i + 1).limit(sz + 1).sum());
    }

    public static void demo03() {
        List<Integer> x = IntStream.range(0, 30)
                .peek(e -> System.out.println(e + ": " +Thread.currentThread().getName()))
                .limit(10)
                .parallel()
                .boxed()
                .collect(Collectors.toList());
        System.out.println(x);
    }
}
