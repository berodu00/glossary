package com.sorin.glossary.domain.suggestion.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
public class CreateSuggestionRequest {
    @NotBlank(message = "용어명(한글)은 필수입니다.")
    private String nameKo;

    private String nameEn;

    @NotBlank(message = "설명은 필수입니다.")
    private String description;

    private Long processId;
}
