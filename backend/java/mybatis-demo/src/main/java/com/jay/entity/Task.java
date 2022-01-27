package com.jay.entity;

import lombok.Data;

@Data
public class Task {
    private Long id;
    private String title;
    private String content;
    private String note;
}
