package com.jay.constant;

import lombok.AllArgsConstructor;
import lombok.Getter;

@AllArgsConstructor
@Getter
public enum SexEnum {
    FEMALE((byte)0, "女性"),
    MALE((byte)1, "男性")
    ;

    private Byte sex;
    private String desc;
}
