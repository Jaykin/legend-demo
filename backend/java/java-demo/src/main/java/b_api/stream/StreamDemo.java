package b_api.stream;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

import org.apache.commons.lang3.tuple.Pair;

/**
 * @author jay.wang
 * @date 2021-08-30 11:41
 */
public class StreamDemo {
    public static void main(String[] args) {
        System.out.println(3 / 2);
    }

    public static List<Integer> getPrevYears(Integer currYear, int num) {
        List<Integer> result = new ArrayList<>();

        for (int i = num - 1; i >= 0; i--) {
            result.add(currYear - i);
        }

        return result;
    }
}
