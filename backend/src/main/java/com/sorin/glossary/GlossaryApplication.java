package com.sorin.glossary;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import org.springframework.scheduling.annotation.EnableAsync;

@EnableAsync
@SpringBootApplication
public class GlossaryApplication {

    public static void main(String[] args) {
        SpringApplication.run(GlossaryApplication.class, args);
    }

}
