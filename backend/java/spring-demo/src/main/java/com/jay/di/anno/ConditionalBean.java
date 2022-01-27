package com.jay.di.anno;

import com.jay.condition.ExampleCondition;
import org.springframework.context.annotation.Conditional;
import org.springframework.stereotype.Component;

@Component
@Conditional({ExampleCondition.class})
public class ConditionalBean {
    public boolean isWired() {
        return true;
    }
}
