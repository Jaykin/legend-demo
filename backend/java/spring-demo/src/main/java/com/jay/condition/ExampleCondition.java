package com.jay.condition;


import org.springframework.context.annotation.Condition;
import org.springframework.context.annotation.ConditionContext;
import org.springframework.core.env.Environment;
import org.springframework.core.type.AnnotatedTypeMetadata;

public class ExampleCondition implements Condition {
    @Override
    public boolean matches(ConditionContext context, AnnotatedTypeMetadata metadata) {
        Environment env = context.getEnvironment();

        boolean hasConditionProp = env.containsProperty("my.prop.example.condition");

        if (!hasConditionProp) {
            return false;
        }

        return Boolean.parseBoolean(env.getProperty("my.prop.example.condition"));
    }
}
