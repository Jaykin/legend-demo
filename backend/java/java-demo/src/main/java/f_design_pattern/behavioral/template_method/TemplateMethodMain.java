package f_design_pattern.behavioral.template_method;

import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.BitSet;
import java.util.Date;

public class TemplateMethodMain {
    public static void main(String[] args) {
        System.out.println((Integer) null);

        // 泡咖啡
        Coffee coffee = new Coffee();
        coffee.make();

        // 泡茶
        Tea tea = new Tea();
        tea.make();

        System.out.println(Integer.valueOf("001"));

        DecimalFormat g1 = new DecimalFormat("0000000");
        System.out.println(g1.format(1));

    }
}
