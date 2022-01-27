import java.math.BigDecimal;
import java.util.*;

public class Main {
    public static void main(String[] args) {
        // Calendar c = Calendar.getInstance();
        // c.add(Calendar.YEAR, 2022);
        // c.add(Calendar.MONTH, 1);
        // c.add(Calendar.DAY_OF_MONTH, 12);
        //
        // Date date = c.getTime();
        // System.out.println(date);

        double dd = 20000000000000000.0;
        System.out.println(dd);
        System.out.println(new BigDecimal(Double.toString(dd)).toPlainString());
    }
}
