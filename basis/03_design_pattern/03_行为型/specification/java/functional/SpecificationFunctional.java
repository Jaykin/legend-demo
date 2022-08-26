import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.function.Function;

/**
 * 函数式
 */
public class SpecificationFunctional {
    public static void main(String[] args) {
        List<Integer> items = new ArrayList<>(Arrays.asList(1, 2, 3, 4, 5));

        Function<Integer, Boolean> evenSpec = it -> it % 2 == 0;
        Function<Integer, Boolean> compositeSpec = getCompositeSpec(evenSpec);

        items.stream()
            .peek(item -> {
                System.out.println(item + ": " + compositeSpec.apply(item));
            });
    }

    public static <T> Function<T, Boolean> getCompositeSpec(Function<T, Boolean> spec) {
        return Specification.and(spec, it -> it > 0);
    }
}

class Specification {
    // 与条件
    public static <T> Function<T, Boolean> and(Function<T, Boolean> left, Function<T, Boolean> right) {
        return candidate -> left.apply(candidate) && right.apply(candidate);
    }

    // 或条件
    public static <T> Function<T, Boolean> or(Function<T, Boolean> left, Function<T, Boolean> right) {
        return candidate -> left.apply(candidate) || right.apply(candidate);
    }

    // 非条件
    public static <T> Function<T, Boolean> not(Function<T, Boolean> one) {
        return candidate -> !one.apply(candidate);
    }
}