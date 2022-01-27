package a_grammar.c_generics;

import java.util.function.Supplier;
import java.util.stream.Stream;

/**
 * 泛型接口
 * */
public class GenericsInterface {
    public static void main(String[] args) {
        Stream.generate(new Fibonacci())
            .limit(18)
            .map(n -> n + " ")
            .forEach(System.out::print);
    }
}

/**
 * - 定义类型参数 T
 * - 方法返回值使用 T
 * */
interface ITest<T> {
    T test(T arg);
}

/**
 * 实现泛型接口
 * */
class Fibonacci implements Supplier<Integer>, ITest<String> {
    private int count = 0;

    @Override
    public Integer get() {
        return fib(count++);
    }

    @Override
    public String test(String arg) {
        return null;
    }

    private int fib(int n) {
        if(n < 2) return 1;
        return fib(n-2) + fib(n-1);
    }
}

