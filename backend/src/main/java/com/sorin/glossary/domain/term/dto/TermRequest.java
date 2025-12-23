package com.sorin.glossary.domain.term.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.ArrayList;
import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class TermRequest {
    @NotBlank(message = "용어명(한글)은 필수입니다.")
    private String nameKo;

    private String nameEn;
    private String abbreviation;

    @NotBlank(message = "설명은 필수입니다.")
    private String description;

    private String photoUrl;

    @Builder.Default
    private List<Long> processIds = new ArrayList<>();

    @Builder.Default
    private List<String> synonyms = new ArrayList<>();
}
