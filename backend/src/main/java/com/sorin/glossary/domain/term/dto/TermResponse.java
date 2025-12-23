package com.sorin.glossary.domain.term.dto;

import com.sorin.glossary.domain.process.domain.Process;
import com.sorin.glossary.domain.term.domain.Term;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TermResponse {
    private Long id;
    private String nameKo;
    private String nameEn;
    private String abbreviation;
    private String description;
    private String photoUrl;
    private String initialKo;
    private String initialEn;
    @Builder.Default
    private List<ProcessDto> processes = new java.util.ArrayList<>();
    @com.fasterxml.jackson.annotation.JsonFormat(shape = com.fasterxml.jackson.annotation.JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime createdAt;
    @com.fasterxml.jackson.annotation.JsonFormat(shape = com.fasterxml.jackson.annotation.JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd'T'HH:mm:ss")
    private LocalDateTime updatedAt;

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class ProcessDto {
        private Long id;
        private String name;

        public static ProcessDto from(Process process) {
            return ProcessDto.builder()
                    .id(process.getId())
                    .name(process.getName())
                    .build();
        }
    }

    public static TermResponse from(Term term) {
        return TermResponse.builder()
                .id(term.getId())
                .nameKo(term.getNameKo())
                .nameEn(term.getNameEn())
                .abbreviation(term.getAbbreviation())
                .description(term.getDescription())
                .photoUrl(term.getPhotoUrl())
                .initialKo(term.getInitialKo())
                .initialEn(term.getInitialEn())
                .processes(term.getProcesses().stream()
                        .map(ProcessDto::from)
                        .collect(Collectors.toList()))
                .createdAt(term.getCreatedAt())
                .updatedAt(term.getUpdatedAt())
                .build();
    }
}
