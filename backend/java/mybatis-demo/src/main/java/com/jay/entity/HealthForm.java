package com.jay.entity;

import lombok.Data;

@Data
public abstract class HealthForm {
    private Long id;
    private Long empId;
    private String heart;
    private String liver;
    private String spleen;
    private String lung;
    private String kidney;
    private String note;
}
