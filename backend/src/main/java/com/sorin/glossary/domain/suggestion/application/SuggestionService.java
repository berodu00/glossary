package com.sorin.glossary.domain.suggestion.application;

import com.sorin.glossary.domain.process.domain.Process;
import com.sorin.glossary.domain.process.domain.ProcessRepository;
import com.sorin.glossary.domain.suggestion.domain.Suggestion;
import com.sorin.glossary.domain.suggestion.domain.SuggestionRepository;
import com.sorin.glossary.domain.suggestion.domain.SuggestionStatus;
import com.sorin.glossary.domain.suggestion.dto.CreateSuggestionRequest;
import com.sorin.glossary.domain.suggestion.dto.SuggestionResponse;
import com.sorin.glossary.domain.term.domain.Term;
import com.sorin.glossary.domain.term.domain.TermRepository;
import com.sorin.glossary.global.error.CommonErrorCode;
import com.sorin.glossary.global.error.exception.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class SuggestionService {

    private final SuggestionRepository suggestionRepository;
    private final TermRepository termRepository;
    private final ProcessRepository processRepository;

    @Transactional
    public Long createSuggestion(CreateSuggestionRequest request, String requesterId) {
        Process process = null;
        if (request.getProcessId() != null) {
            process = processRepository.findById(request.getProcessId())
                    .orElseThrow(() -> new EntityNotFoundException(CommonErrorCode.ENTITY_NOT_FOUND));
        }

        Suggestion suggestion = Suggestion.builder()
                .requesterId(requesterId)
                .nameKo(request.getNameKo())
                .nameEn(request.getNameEn())
                .description(request.getDescription())
                .process(process)
                .build();

        return suggestionRepository.save(suggestion).getId();
    }

    public List<SuggestionResponse> getPendingSuggestions() {
        return suggestionRepository.findAllByStatusOrderByCreatedAtDesc(SuggestionStatus.PENDING).stream()
                .map(SuggestionResponse::from)
                .collect(Collectors.toList());
    }

    @Transactional
    public void approveSuggestion(Long suggestionId, String reviewerId) {
        Suggestion suggestion = findSuggestionById(suggestionId);

        if (suggestion.getStatus() != SuggestionStatus.PENDING) {
            throw new IllegalArgumentException("이미 처리된 제안입니다.");
        }

        // Create new Term using the suggestion data
        // Note: Term builder handles initial generation automatically
        Term term = Term.builder()
                .nameKo(suggestion.getNameKo())
                .nameEn(suggestion.getNameEn())
                .description(suggestion.getDescription())
                .updatedBy(reviewerId) // Currently creating, so using reviewer as creator/updater
                .processes(suggestion.getProcess() != null ? Collections.singletonList(suggestion.getProcess()) : null)
                .build();

        termRepository.save(term);

        // Update Suggestion Status
        suggestion.approve(term, reviewerId);
    }

    @Transactional
    public void rejectSuggestion(Long suggestionId, String reviewerId, String reason) {
        Suggestion suggestion = findSuggestionById(suggestionId);

        if (suggestion.getStatus() != SuggestionStatus.PENDING) {
            throw new IllegalArgumentException("이미 처리된 제안입니다.");
        }

        suggestion.reject(reviewerId, reason);
    }

    private Suggestion findSuggestionById(Long id) {
        return suggestionRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(CommonErrorCode.ENTITY_NOT_FOUND));
    }
}
