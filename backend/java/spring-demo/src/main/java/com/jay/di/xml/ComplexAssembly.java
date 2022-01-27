package com.jay.di.xml;

import lombok.Data;

import java.util.List;
import java.util.Map;
import java.util.Properties;
import java.util.Set;

@Data
public class ComplexAssembly {
    private Long id;
    private List<String> list;
    private Map<String, String> map;
    private Properties props ;
    private Set<String> set;
    private String[] array;
}
