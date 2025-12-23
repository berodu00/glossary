package com.sorin.glossary.domain.suggestion.application;

import com.sorin.glossary.domain.process.domain.Process;
import com.sorin.glossary.domain.process.domain.ProcessRepository;
import com.sorin.glossary.domain.suggestion.domain.Suggestion;
import com.sorin.glossary.domain.suggestion.domain.SuggestionRepository;
import com.sorin.glossary.domain.suggestion.dto.CreateSuggestionRequest;
import com.sorin.glossary.domain.suggestion.presentation.SuggestionController;
import com.sorin.glossary.domain.term.domain.Term;
import com.sorin.glossary.domain.term.domain.TermRepository;
import com.sorin.glossary.domain.term.dto.TermSearchCondition;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.test.context.ActiveProfiles;
import org.springframework.transaction.annotation.Transactional;

import java.util.Collections;
import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@SpringBootTest
@ActiveProfiles("test")
@Transactional
class SuggestionServiceTest {

    @Autowired
    private SuggestionService suggestionService;

    @Autowired
    private SuggestionRepository suggestionRepository;

    @Autowired
    private TermRepository termRepository;

    @Autowired
    private ProcessRepository processRepository;

    @Test
    @DisplayName("제안 승인 후 QueryDSL 검색으로 조회가 가능해야 한다")
    void approveAndSearch_TermFound() {
        // Given
        Process process = processRepository.save(Process.builder().name("TestProcess").displayOrder(1).build());

        Suggestion suggestion = Suggestion.builder()
                .requesterId("user1")
                .nameKo("테스트용어")
                .nameEn("TestTerm")
                .description("설명")
                .process(process)
                .build();
        suggestionRepository.save(suggestion);

        // When
        suggestionService.approveSuggestion(suggestion.getId(), "admin1");

        // Then - Verify via Search (QueryDSL)
        TermSearchCondition condition = new TermSearchCondition();
        condition.setKeyword("테스트");

        Page<Term> result = termRepository.search(condition, PageRequest.of(0, 10));
        assertThat(result.getContent()).hasSize(1);
        assertThat(result.getContent().get(0).getNameKo()).isEqualTo("테스트용어");

        // Check filtering by process
        condition.setProcessIds(Collections.singletonList(process.getId()));
        result = termRepository.search(condition, PageRequest.of(0, 10));
        assertThat(result.getContent()).hasSize(1);
    }
}
