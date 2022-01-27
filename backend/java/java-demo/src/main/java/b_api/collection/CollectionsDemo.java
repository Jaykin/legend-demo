package b_api.collection;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collection;
import java.util.Collections;

public class CollectionsDemo {
    public static void main(String[] args) {
        Integer[] moreInt = { 2, 3, 4 };
        Collection<Integer> collection = new ArrayList<>(Arrays.asList(moreInt));

        Collections.addAll(collection, 5, 6, 7);

        System.out.println(collection);
    }
}
