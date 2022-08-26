package f_design_pattern.behavioral.strategy;

import java.io.File;
import java.io.FileFilter;
import java.net.URI;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import helper.Timer;

public class ClientCaller {
    public static void main(String[] args) throws Exception  {
        // StrategyContext.operate("s_one");
        // StrategyContext.operate("s_two");

        Timer timer = new Timer();
        Map<String, IStrategy> strategies = scanStrategy();
        System.out.println(timer.duration() + "ms");
        strategies.get("s_one").operate();
        strategies.get("s_two").operate();
    }

    // 扫描策略类
    public static Map<String, IStrategy> scanStrategy() throws Exception  {
        // 获取 class 文件
        URI uri = ClassLoader.getSystemClassLoader().getResource("f_design_pattern/behavioral/strategy").toURI();
        File file = new File(uri);

        File[] files = file.listFiles(new FileFilter() {
            @Override
            public boolean accept(File pathname) {
                return pathname.getName().endsWith(".class");
            }
        });

        Map<String, IStrategy> strategies = new HashMap<>();
        for (int i = 0; i < files.length; i++) {
            String name = files[i].getName();

            System.out.println(name);
            /**
             * ClientCaller.class
                StrategyTwo.class
                StrategyContext.class
                IStrategy.class
                StrategyContext$1.class
                StrategyOne.class
             */

             try {
                // 通过全限定名加载 class
                Class<?> clazz = ClassLoader.getSystemClassLoader().loadClass("f_design_pattern.behavioral.strategy." + name.replace(".class", ""));
                
                StrategyImplAnno anno = clazz.getAnnotation(StrategyImplAnno.class);
                if (anno != null) {
                    // 实例化具有指定注解的类
                    strategies.put(anno.key(), (IStrategy) clazz.newInstance());
                }
             } catch (ClassNotFoundException e) {
                e.printStackTrace();
             }
        }

        return strategies;
    }
}
