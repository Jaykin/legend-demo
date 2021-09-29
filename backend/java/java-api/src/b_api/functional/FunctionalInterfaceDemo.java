package b_api.functional;

import java.util.concurrent.Callable;
import java.util.function.Function;
import java.util.function.Supplier;

/**
 * @author jay.wang
 * @date 2021-08-26 12:21
 */
public class FunctionalInterfaceDemo {
    public static void main(String[] args) {
        testSupplier();
        testCallable();
        testFunction();
    }

    public static void testSupplier() {
        Supplier<String> supplierFunc = () -> "Supplier<String>";

        System.out.println(supplierFunc.get());
    }

    public static void testCallable() {
        Callable<String> callableFunc = () -> "Callable<String>";

        try {
            System.out.println(callableFunc.call());
        } catch (Throwable t) {
            System.out.println(t.getMessage());
        }
    }

    public static void testFunction() {
        Function<String, String> func = (String inp) -> inp + " Function<String, String>";

        System.out.println(func.apply("Jay"));
    }
}

/**
 * 三参数，返回类型不同的 Function
 * */
@FunctionalInterface
interface TriFunction<T, U, V, R> {
    R apply(T t, U u, V v);
}