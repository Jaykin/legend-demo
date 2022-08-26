package helper;

import java.text.Collator;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

public class Helper {
    public static void main(String[] args) {
        System.out.println(geIntegerList(23));
    }

    public static List<Integer> geIntegerList(int num) {
        List<Integer> list = new ArrayList<>();

        IntStream.iterate(1, i -> i + 1)
			.limit(num)
            .forEach(list::add);

        return list;
    }
}
