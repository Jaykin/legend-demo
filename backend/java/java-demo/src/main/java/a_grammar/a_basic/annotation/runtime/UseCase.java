package a_grammar.a_basic.annotation.runtime;

import java.lang.annotation.ElementType;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target({ElementType.METHOD, ElementType.FIELD})
@Retention(RetentionPolicy.RUNTIME)
@TargetType(value = "UseCase") // 组合注解
public @interface UseCase {
    int id();

    String description() default "no description";
}
