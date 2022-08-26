package f_design_pattern.behavioral.template_method;

public class Coffee extends Beverage {
    @Override
    protected void brew() {
        System.out.println("step 02: 用沸水冲泡咖啡");
    }

    @Override
    protected void pourInCup() {
        System.out.println("step 03: 把咖啡倒进杯子");
    }

    @Override
    protected void addCondiments() {
        System.out.println("step 04: 加糖和牛奶");
    }

    protected boolean needAddCondiments() {
        return true;
    }
}
