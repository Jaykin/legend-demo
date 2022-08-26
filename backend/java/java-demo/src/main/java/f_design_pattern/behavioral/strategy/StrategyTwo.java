package f_design_pattern.behavioral.strategy;

@StrategyImplAnno(key = "s_two")
public class StrategyTwo implements IStrategy {
    @Override
    public void operate() {
        System.out.println("This is StrategyTwo...");
    }
}
