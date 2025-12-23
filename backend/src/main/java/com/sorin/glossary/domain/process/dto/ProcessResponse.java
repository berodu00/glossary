package com.sorin.glossary.domain.process.dto;

import com.sorin.glossary.domain.process.domain.Process;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class ProcessResponse {
    private Long id;
    private String name;
    private Integer displayOrder;
    private LocalDateTime createdAt;

    public static ProcessResponse from(Process process) {
        return ProcessResponse.builder()
                .id(process.getId())
                .name(process.getName())
                .displayOrder(process.getDisplayOrder())
                .createdAt(process.getCreatedAt())
                .build();
    }
}
