package f_design_pattern.behavioral.template_method;

public class Tea extends Beverage {
    @Override
    protected void brew() {
        System.out.println("step 02: 用沸水冲泡茶");
    }

    @Override
    protected void pourInCup() {
        System.out.println("step 03: 把茶倒进杯子");
    }

    @Override
    protected void addCondiments() {
    }
}
