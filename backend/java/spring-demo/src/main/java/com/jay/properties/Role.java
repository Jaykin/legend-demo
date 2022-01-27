package com.jay.properties;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Data
@Component
public class Role {
    private Long id;

    @Value("${my.prop.roleName}")
    private String roleName;
    private String note;
}
