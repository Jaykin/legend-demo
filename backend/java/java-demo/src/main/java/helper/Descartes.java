package helper;

import java.util.*;
import java.util.function.BiFunction;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

/**
 * [[1,2,3], [4,5], [7]]
 * ==>
 * [[1,4,7], [1,5,7], [2,4,7], [2,5,7], [3,4,7], [3,5,7]]
 */
public class Descartes {
    public static void main(String[] args) {
        List<List<String>> llist = geList(5, 20);
        // System.out.println("原始List: " + llist);

        // flatMap 实现
        Timer timer01 = new Timer();
        List<String> list01 = descartesFlatMap(llist, (o1, o2) -> {
            return o1 + "_" + o2;
        });
        // System.out.println("结果List(" + timer01.duration() + "ms): " + list01);
        System.out.println("结果List(" + timer01.duration() + "ms): " + list01.size());

        // 递归实现
        Timer timer02 = new Timer();
        List<List<String>> list02 = new ArrayList<>();
        List<String> cacheList = new ArrayList<>();
        descartesRecursive(llist, 0, list02, cacheList);
        // System.out.println("结果List(" + timer02.duration() +"ms): " + list02);
        System.out.println("结果List(" + timer02.duration() +"ms): " + list02.size());

        // for实现
        // List<List<String>> list03 = new ArrayList<>();
        // descartesFor(llist, list03);
    }

    public static List<List<String>> geList(int num, int size) {
        List<List<String>> list = new ArrayList<>();

		IntStream.iterate(1, i -> i + 1)
			.limit(num)
			.forEach((i) -> {
				List<String> l = new ArrayList<>();
				IntStream.iterate(i * 10, j -> j + 1)
					.limit(size)
					.forEach(item -> l.add(String.valueOf(item)));

                list.add(l);
			});

        return list;
	}

    // for实现
    public static <T> void descartesFor(List<List<T>> originalList, List<List<T>> returnList) {
        Integer total = originalList.stream().map(l -> l.size()).reduce((a, b) -> a * b).orElse(0);
        int[] idxs = new int[originalList.size()];
        
        for(int i = 0; i < total; i++) {
            
        }
    }

    // 递归实现
    public static <T> void descartesRecursive(List<List<T>> originalList, int position, List<List<T>> returnList, List<T> cacheList) {
        List<T> originalItemList = originalList.get(position);
        
        for (int i = 0; i < originalItemList.size(); i++) {
            //最后一个复用cacheList，节省内存
            List<T> childCacheList = (i == originalItemList.size() - 1) ? cacheList : new ArrayList<>(cacheList);
            childCacheList.add(originalItemList.get(i));

            if (position == originalList.size() - 1) {  // 遍历到最后退出递归
                returnList.add(childCacheList);
                continue;
            }

            descartesRecursive(originalList, position + 1, returnList, childCacheList);
        }
    }

    // flatMap 实现
    public static <T> List<T> descartesFlatMap(List<List<T>> originalList, BiFunction<T, T, T> func) {
        List<T> currList = originalList.get(0);
        int size = originalList.size();

        for (int i = 1; i < size; i++) {
            List<T> nextList = originalList.get(i);
            currList = currList.stream()
                .flatMap(item1 -> nextList.stream().map((item2) -> func.apply(item1, item2)))
                .collect(Collectors.toList());
        }

        return currList;
    }
}
