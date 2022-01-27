package com.jay.di.anno;

import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Data
@Component("role_anno_01")
public class Role {
    @Value("1")
    private Long id;

    @Value("role_name_01")
    private String roleName;

    @Value("role_note_01")
    private String note;
}
