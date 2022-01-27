import java.util.Collection;
import java.util.Collections;
import java.util.HashMap;
import java.util.Map;

public class Test {
    public static void main(String[] args) {
        Map<String, String> map = new HashMap<>();
        map.put("1", "a");
        map.put("2", "b");
        Collection<String> ll = map.values();

        ll.forEach(s -> {
            System.out.println(s);
        });
    }
}
