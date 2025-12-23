package com.sorin.glossary.global.config;

import com.fasterxml.jackson.core.JsonGenerator;
import com.fasterxml.jackson.databind.JsonSerializer;
import com.fasterxml.jackson.databind.SerializerProvider;
import org.springframework.boot.jackson.JsonComponentModule;
import org.springframework.boot.test.context.TestConfiguration;
import org.springframework.context.annotation.Bean;
import org.springframework.data.domain.Page;

import java.io.IOException;

@TestConfiguration
public class TestJacksonConfig {

    @Bean
    public JsonComponentModule pageJsonComponentModule() {
        JsonComponentModule module = new JsonComponentModule();
        module.addSerializer(Page.class, new JsonSerializer<Page>() {
            @Override
            public void serialize(Page page, JsonGenerator gen, SerializerProvider serializers) throws IOException {
                gen.writeStartObject();
                gen.writeObjectField("content", page.getContent());
                gen.writeNumberField("totalElements", page.getTotalElements());
                gen.writeNumberField("totalPages", page.getTotalPages());
                gen.writeNumberField("size", page.getSize());
                gen.writeNumberField("number", page.getNumber());
                gen.writeBooleanField("first", page.isFirst());
                gen.writeBooleanField("last", page.isLast());
                gen.writeBooleanField("empty", page.isEmpty());
                gen.writeEndObject();
            }
        });
        return module;
    }
}
