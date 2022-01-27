package b_api.functional;

import net.sourceforge.pinyin4j.PinyinHelper;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Comparator;
import java.util.List;

import net.sourceforge.pinyin4j.PinyinHelper;

public class ComparatorDemo {
    public static void main(String[] args) {
        sortCnEnString();
    }

    /**
     * 中英文混合排序
     * */
    public static void sortCnEnString() {
        List<String> strs = new ArrayList<>(Arrays.asList(
                "全厂-流量计（kg/h）7-瞬时流量",
                "全不-流量计（kg/h）7-瞬时流量",
                "全厂-流量计（kg/h）10-瞬时流量",
                "全厂-阿个（kg/h）7-瞬时流量",
                "全厂-流量计(kg/h)7-累计流量",
                "全厂-流量计（L/s）3-瞬时流量",
                "全厂-流量计（L/s）3-累计流量",
                "生产一期-一期制浆回用水流量-瞬时流量"
        ));

        strs.sort(Comparator.comparing(ComparatorDemo::strToPinyin));
        // strs.sort(Comparator.comparing(String::toString));
        System.out.println(strs);

        // System.out.println(strToPinyin("全厂-流量计（kg/h）7-瞬时流量"));

        // System.out.println(Arrays.toString(PinyinHelper.toHanyuPinyinStringArray('1')));
    }

    // 字符串转拼音(去掉声部，多拼音的只取第一个)
    public static String strToPinyin(String str) {
        StringBuilder py = new StringBuilder();

        for(int i = 0; i < str.length(); ++i) {
            char ch = str.charAt(i);
            String[] pys = PinyinHelper.toHanyuPinyinStringArray(ch);
            if (pys == null || pys.length <= 0) {
                py.append(ch);
            } else {
                py.append(pys[0], 0, pys[0].length() - 1);
            }
        }

        return py.toString();
    }
}
