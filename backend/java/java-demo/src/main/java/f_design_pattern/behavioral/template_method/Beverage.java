package f_design_pattern.behavioral.template_method;

/**
 * 抽象模板类/抽象类
 */
public abstract class Beverage {
    /**
     * 制作饮料
     * 模板方法
     */
    public final void make() {
        boilWater();
        brew();
        pourInCup();
        if (needAddCondiments()) {
            addCondiments();
        }
    }

    /**
     * step 01: 把水煮沸
     */
    protected void boilWater() {
        System.out.println("step 01: 把水煮沸");
    }

    /**
     * step 02: 泡
     * 抽象方法，需子类重写
     */
    protected abstract void brew();

    /**
     * step 03: 把饮料倒进杯子
     * 抽象方法，需子类重写
     */
    protected abstract void pourInCup();

    /**
     * step 04: 加调料
     * 抽象方法，需子类重写
     */
    protected abstract void addCondiments();

    /**
     * 是否需要加调料
     * 钩子方法，由子类定义
     */
    protected boolean needAddCondiments() {
        return false;
    }
}
