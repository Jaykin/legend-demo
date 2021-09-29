package b_api.date;

import java.text.SimpleDateFormat;
import java.time.LocalDate;
import java.util.Date;

public class DateBase {
    public static void main(String[] args) {
        /** yyyy 表示当天所在的年 **/
        System.out.println(new SimpleDateFormat("yyyy-MM-dd HH:mm:ss").format(new Date()));

        /** YYYY 表示当天所在周所在的年，只要周跨年，则返回的是下一年 **/
        System.out.println(new SimpleDateFormat("YYYY-MM-dd HH:mm:ss").format(new Date()));

        /** 获取当年的天数 **/
        System.out.println(LocalDate.now().lengthOfYear());
    }
}
