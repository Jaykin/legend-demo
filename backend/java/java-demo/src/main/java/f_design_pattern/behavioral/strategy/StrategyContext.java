package f_design_pattern.behavioral.strategy;

import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;

/**
 * 环境类：管理策略类
 * 
 * 考虑如何关联 客户端条件 - 策略类
 * - 运行时 if-else
 * - 手动初始化所有策略类: Map
 * - 自动扫描策略类: Map
 */
public class StrategyContext {
    private static Map<String, IStrategy> strategys = new HashMap<>() {
        {
            put("s_one", new StrategyOne());
            put("s_two", new StrategyTwo());
        }
    };

    private StrategyContext() {
    }

    public static void operate(String key) {
        IStrategy strategy = strategys.get(key);

        if (strategy != null) {
            strategy.operate();
        }
    }
}
