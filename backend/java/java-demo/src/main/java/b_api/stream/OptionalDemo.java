package b_api.stream;

import java.util.Optional;

/**
 * Optional 类是一个可能包含或不包含非空值的容器
 * 是用于缓解Java臭名昭著的空指针异常问题
 *
 * 注意
 *      - Optional 没有实现Serializable接口（不可序列化）
 *      - Optional 会降低可读性，请在必要时使用
 *          - 是为了清晰地表达返回值中没有结果的可能性
 *          - Optional 尽量只用来作为方法返回值类型
 * */
public class OptionalDemo {
    public static void main(String[] args) {
        /** 1、构造 Optional 对象 **/
        {
            /** 1.1、若传入的 value 是 null，则会报 NPE **/
            Optional<String> opt1 = Optional.of("requireNonNull");
            /** 1.2、支持传入 null 值，此时返回的是不包含值的Optional对象，即Optional.empty() **/
            Optional<Object> opt2 = Optional.ofNullable("nullable"); // 支持传入 null 值，此时返回的就是 Optional.empty()
            /** 1.3、构造一个空的Optional(不包含值的) **/
            Optional<Object> opt3 = Optional.empty();

            opt1.ifPresent(System.out::println);
            System.out.println(opt2.orElse("A"));
        }
    }
}
