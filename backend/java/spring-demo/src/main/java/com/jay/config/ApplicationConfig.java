package com.jay.config;

import org.springframework.context.annotation.*;
import org.springframework.context.support.PropertySourcesPlaceholderConfigurer;

@Configuration
@ComponentScan(basePackages = {"com.jay.*"})
@ImportResource({"classpath:spring-config.xml"})
@Import({AopConfig.class})
@PropertySource(value = {"classpath:config.properties"}, ignoreResourceNotFound = true, encoding = "UTF-8")
public class ApplicationConfig {
    @Bean
    public PropertySourcesPlaceholderConfigurer propertySourcesPlaceholderConfigurer() {
        return new PropertySourcesPlaceholderConfigurer();
    }
}
