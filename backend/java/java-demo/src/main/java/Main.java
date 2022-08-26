import java.math.BigDecimal;
import java.math.RoundingMode;
import java.sql.Time;
import java.text.SimpleDateFormat;
import java.time.LocalTime;
import java.util.*;
import java.util.function.Function;
import java.util.stream.Collectors;

import org.apache.commons.text.StringEscapeUtils;

import com.google.common.collect.Lists;
import com.mysql.cj.util.StringUtils;

import helper.IntegerEnum;

public class Main {
	public static void main(String[] args) throws Exception {
		List<Integer> list = new ArrayList<>();
		list.add(0, 3);
		list.add(0, 2);
		list.add(0, 1);
		System.out.println(list);

		// Calendar calendar01 = Calendar.getInstance();
		// calendar01.set(Calendar.MONTH, 0); // 1月

		// Calendar calendar02 = Calendar.getInstance();
		// calendar02.set(Calendar.MONTH, 1); // 2月

		// Calendar calendar03 = Calendar.getInstance();
		// calendar03.set(Calendar.MONTH, 2); // 3月

		// Calendar calendar04 = Calendar.getInstance();
		// calendar04.set(Calendar.MONTH, 3); // 4月

		// Calendar calendar05 = Calendar.getInstance();
		// calendar05.set(2022, 1, 1, 0, 0, 30); // 2022-02-01

		// Calendar calendar06 = Calendar.getInstance();
		// calendar06.set(2022, 0, 31, 0, 0, 30); // 2022-01-31
		// System.out.println(calendar06.get(Calendar.DAY_OF_MONTH));
		// calendar06.set(Calendar.DAY_OF_MONTH, 32); // 2022-02-01
		// calendar06.add(Calendar.MONTH, 1); // 2022-02-28
		// calendar06.add(Calendar.MONTH, 1); // 2022-03-28
		// System.out.println(calendar06.getTime());

		// System.out.println(calendar01.getActualMaximum(Calendar.DAY_OF_MONTH));
		// System.out.println(calendar02.getActualMaximum(Calendar.DAY_OF_MONTH));
		// System.out.println(calendar03.getActualMaximum(Calendar.DAY_OF_MONTH));
		// System.out.println(calendar04.getActualMaximum(Calendar.DAY_OF_MONTH));

		// LocalTime time1 = LocalTime.of(18, 23, 0);
		// Calendar calendar07 = Calendar.getInstance();
		// calendar07.set(Calendar.HOUR_OF_DAY, time1.getHour());
		// calendar07.set(Calendar.MINUTE, time1.getMinute());
		// calendar07.set(Calendar.SECOND, time1.getSecond());
		// System.out.println(calendar07.getTime());

		// Calendar calendar08 = Calendar.getInstance();
		// calendar08.setTime(new Date());
		// calendar08.set(Calendar.HOUR, 0);
		// calendar08.clear(Calendar.MINUTE);
		// calendar08.clear(Calendar.SECOND);
		// calendar08.clear(Calendar.MILLISECOND);
		// calendar08.add(Calendar.DAY_OF_MONTH, -1);
		// System.out.println(calendar08.getTime());

		// tt();

		for (int i = 0; i < 3; i++) {
			System.out.println(IntegerEnum.class.getEnumConstants()[i].toString());
		}
	}

	public static boolean checkMaterialCyclic(Long item, List<Long> depsChains, Map<Long, List<Long>> deps) {
		// System.out.println(item + "_" + depsChains);

		if (depsChains.contains(item)) {
			// 有环
			System.out.println(depsChains);
			return true;
		}

		if (deps.containsKey(item)) {
			List<Long> records = deps.get(item);

			for (Long distribution : records) {
				List<Long> chains = Lists.newArrayList(depsChains);
				chains.add(item);

				if (checkMaterialCyclic(distribution, chains, deps)) {
					return true;
				}
			}
		}

		return false;
	}

	public static void tt() {
		List<Integer> list = new ArrayList<>();
		list.add(1);
		list.add(2);
		list.add(3);
		list.add(4);

		for (int i = 0; i < list.size();) {
			Integer item = list.get(i);
			if (item <= 2) {
				list.remove(i);
				list.add(item * 5);
			} else {
				i++;
			}
		}

		System.out.println(list);
	}

	public static void ff() {
		List<List<Integer>> list = Lists.newArrayList();
		list.add(Lists.newArrayList(1, 2, 3));
		list.add(Lists.newArrayList(7, 5, 2));
		list.add(Lists.newArrayList(7, 4, 2));
		list.add(Lists.newArrayList(5, 5, 4));

		list.sort(new Comparator<List<Integer>>() {
			@Override
			public int compare(List<Integer> o1, List<Integer> o2) {
				if (o1.get(0) < o2.get(0)) {
					return -1;
				}

				if (o1.get(0) > o2.get(0)) {
					return 1;
				}

				if (o1.get(0) == o2.get(0)) {
					if (o1.get(1) < o2.get(1)) {
						return -1;
					}

					if (o1.get(1) > o2.get(1)) {
						return 1;
					}

					if (o1.get(1) == o2.get(1)) {
						return 0;
					}
				}

				return 0;
			}
		});
		System.out.println(list);

	}
}
