package com.sorin.glossary.domain.term.presentation;

import com.sorin.glossary.domain.term.application.TermService;
import com.sorin.glossary.domain.term.dto.TermResponse;
import com.sorin.glossary.domain.term.dto.TermSearchCondition;
import com.sorin.glossary.global.dto.PageResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/terms")
@RequiredArgsConstructor
public class TermController {

    private final TermService termService;

    @GetMapping
    public ResponseEntity<PageResponse<TermResponse>> searchTerms(
            @ModelAttribute TermSearchCondition condition,
            @PageableDefault(size = 10) Pageable pageable) {
        Page<TermResponse> result = termService.searchTerms(condition, pageable);
        return ResponseEntity.ok(new PageResponse<>(result));
    }
}
