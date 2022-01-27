package com.jay.entity;

import lombok.Data;

import java.io.Serializable;

@Data
public class FemaleEmployee extends Employee implements Serializable {
    private FemaleHealthForm femaleHealthForm = null;
}
