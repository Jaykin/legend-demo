package a_grammar.a_basic.annotation;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;
import java.lang.reflect.Method;

/**
 * @author jay.wang
 * @date 2021-08-17 11:44
 */
public class AnnotationDemo {
    public static void main(String[] args) {
        AnnotationDemo anno = new AnnotationDemo();

        anno.invoke();

        // UseCaseReflectTracker.trackUseCase(AnnotationDemo.class);
    }

    @UseCase(id = 1, description = "@UseCase For AnnotationDemo.invoke")
    public void invoke() {
        System.out.println("call invoke");
    }

    @JavacUseCase(value = "哈哈哈")
    public void invoke2() {
        System.out.println("call invoke2");
    }
}

// 1、注解自定义
@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@interface UseCase {
    int id();

    String description() default "no description";
}

// 2、注解处理器 - 反射
class UseCaseReflectTracker {
    public static void trackUseCase(Class<?> cl) {
        // 通过反射获取方法集合
        for (Method m : cl.getDeclaredMethods()) {
            UseCase uc = m.getAnnotation(UseCase.class);

            // 获取方法的 @UseCase 注解
            if (uc != null) {
                System.out.println("Found Use Case " + uc.id() + ": " + uc.description());
            }
        }
    }
}