package a_grammar.a_basic.annotation.runtime;

import java.lang.annotation.Documented;
import java.lang.annotation.ElementType;
import java.lang.annotation.Inherited;
import java.lang.annotation.Retention;
import java.lang.annotation.RetentionPolicy;
import java.lang.annotation.Target;

@Target(ElementType.TYPE)
@Retention(RetentionPolicy.RUNTIME)
@Documented
@Inherited
public @interface TargetType {
    String value() default "";

    // 嵌套注解
    UseCase useCase() default @UseCase(id = 0, description = "-");
}
