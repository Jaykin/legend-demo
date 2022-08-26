package b_api.stream;

import java.util.Comparator;
import java.util.List;
import java.util.stream.Collector;
import java.util.stream.Collectors;

import com.google.common.collect.Lists;

public class StreamSortDemo {
    public static void main(String[] args) {
        List<PointData> list = geList();

        list.stream()
            .sorted(Comparator.comparing(PointData::getTimestamp))
            .forEach(System.out::println);
    }

    public static List<PointData> geList() {
        return Lists.newArrayList(
            new PointData(9L, "s1_9"),
            new PointData(2L, "s1_2"),
            new PointData(6L, "s1_6"),
            new PointData(5L, "s1_5"),
            new PointData(2L, "s2_2"),
            new PointData(6L, "s2_6"),
            new PointData(9L, "s2_9"),
            new PointData(5L, "s2_5")
        );
    }
}

class PointData {
    private Long timestamp;
    private String desc;

    public PointData (Long timestamp, String desc) {
        this.timestamp = timestamp;
        this.desc = desc;
    }

    public Long getTimestamp() {
        return timestamp;
    }

    public String getDesc() {
        return desc;
    }

    public String toString() {
        return "{timestamp:"+timestamp+",desc:"+desc+"}";
    }
}
