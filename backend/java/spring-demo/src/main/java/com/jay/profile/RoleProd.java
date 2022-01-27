package com.jay.profile;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

@Component
@Profile("prod")
@Data
public class RoleProd extends Role {
    @Value("[prod] Java 工程师")
    private String roleName;
}
