package a_grammar.a_basic.annotation.runtime;

import java.lang.reflect.Method;

public class RuntimeProcessor {
    // @UserCase
    public static void useCase(Class<?> clazz) {
        // 通过反射获取方法集合
        for (Method m : clazz.getDeclaredMethods()) {
            UseCase uc = m.getAnnotation(UseCase.class);

            // 获取方法的 @UseCase 注解
            if (uc != null) {
                System.out.println("Found @UseCase, id: " + uc.id() + ", description: " + uc.description());
            }
        }
    }

    // @TargetType
    public static void targetType(Class<?> clazz) {
        TargetType tt = clazz.getAnnotation(TargetType.class);

        if (tt != null) {
            System.out.println("Found @TargetType, value: " + tt.value() + ", useCase: " + tt.useCase().id() + "," + tt.useCase().description());
        }
    }
}
