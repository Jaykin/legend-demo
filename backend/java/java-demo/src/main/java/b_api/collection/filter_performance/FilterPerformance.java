package b_api.collection.filter_performance;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;
import java.util.stream.Collectors;

import helper.Helper;
import helper.Timer;

public class FilterPerformance {
    public static void main(String[] args) {
        int num = 1000000;
        filterByFor(Helper.geIntegerList(num));
        // filterByForI(Helper.geIntegerList(num));
        filterByStream(Helper.geIntegerList(num));
        // filterByIterator(Helper.geIntegerList(num));
    }

    /**
     * 1、for
     */
    public static void filterByFor(List<Integer> list) {
        Timer timer = new Timer();
        List<Integer> result = new ArrayList<>();
        for (Integer item : list) {
            if (item % 2 != 0) {
                // list.remove(item); // Throw java.util.ConcurrentModificationException
                result.add(item);
            }
        }
        System.out.println(result.size());
        timer.duration("filterByFor 耗时: ");
    }

     /**
     * 2、fori
     */
    public static void filterByForI(List<Integer> list) {
        Timer timer = new Timer();

        for (int i = 0; i < list.size(); i++) {
            if (list.get(i) % 2 == 0) {
                list.remove(i--);
            }
        }
        System.out.println(list.size());
        timer.duration("filterByForI 耗时: ");
    }

     /**
     * 3、stream
     */
    public static List<Integer> filterByStream(List<Integer> list) {
        Timer timer = new Timer();
        List<Integer> result = list.stream().filter(item -> item % 2 == 0).collect(Collectors.toList());
        System.out.println(result.size());
        timer.duration("filterByStream 耗时: ");
        return result;   
    }

     /**
     * 4、iterator
     */
    public static void filterByIterator(List<Integer> list) {
        Timer timer = new Timer();
        Iterator<Integer> iterator = list.iterator();

        while (iterator.hasNext()) {
            if (iterator.next() % 2 == 0) {
                iterator.remove();
            }
        }
        System.out.println(list.size());
        timer.duration("filterByIterator 耗时: ");
    }
}