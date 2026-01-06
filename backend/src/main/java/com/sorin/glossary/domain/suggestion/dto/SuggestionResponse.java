package com.sorin.glossary.domain.suggestion.dto;

import com.sorin.glossary.domain.suggestion.domain.Suggestion;
import com.sorin.glossary.domain.suggestion.domain.SuggestionStatus;
import lombok.Builder;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@Builder
public class SuggestionResponse {
    private Long id;
    private String requesterId;
    private String nameKo;
    private String nameEn;
    private String description;
    private Long processId;
    private String processName;
    private String imageUrl;
    private SuggestionStatus status;
    private LocalDateTime createdAt;
    private LocalDateTime reviewedAt;
    private String reviewerNote;

    public static SuggestionResponse from(Suggestion suggestion) {
        return SuggestionResponse.builder()
                .id(suggestion.getId())
                .requesterId(suggestion.getRequesterId())
                .nameKo(suggestion.getNameKo())
                .nameEn(suggestion.getNameEn())
                .description(suggestion.getDescription())
                .processId(suggestion.getProcess() != null ? suggestion.getProcess().getId() : null)
                .processName(suggestion.getProcess() != null ? suggestion.getProcess().getName() : null)
                .imageUrl(suggestion.getImageUrl())
                .status(suggestion.getStatus())
                .createdAt(suggestion.getCreatedAt())
                .reviewedAt(suggestion.getReviewedAt())
                .reviewerNote(suggestion.getReviewerNote())
                .build();
    }
}
