package f_design_pattern.behavioral.strategy;

@StrategyImplAnno(key = "s_one")
public class StrategyOne implements IStrategy {
    @Override
    public void operate() {
        System.out.println("This is StrategyOne...");
    }
}
