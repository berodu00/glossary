package com.sorin.glossary.domain.process.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

public class ProcessRequest {

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Create {
        @NotBlank(message = "공정 명칭은 필수입니다")
        private String name;

        @NotNull(message = "순서는 필수입니다")
        private Integer displayOrder;
    }

    @Getter
    @NoArgsConstructor
    @AllArgsConstructor
    @Builder
    public static class Update {
        @NotBlank(message = "공정 명칭은 필수입니다")
        private String name;

        @NotNull(message = "순서는 필수입니다")
        private Integer displayOrder;
    }
}
