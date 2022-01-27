package b_api.stream;

import java.util.Arrays;
import java.util.List;
import java.util.Random;
import java.util.stream.Stream;

/**
 * @author jay.wang
 * @date 2021-08-30 12:01
 * 流创建
 */
public class StreamCreateDemo {
    public static void main(String[] args) {
        createStream1();
        createStream2();
    }

    /** 1、Stream.of() **/
    static void createStream1() {
        Stream.of("It's ", "a ", "wonderful ", "day ", "for ", "pie!")
            .forEach(System.out::println);
    }

    /** 2、Collection.stream() **/
    static void createStream2() {
        List<String> list = Arrays.asList("It's ", "a ", "wonderful ", "day ", "for ", "pie!");

        list.stream()
            .forEach(System.out::println);
    }

    /** Stream.builder() **/

}
