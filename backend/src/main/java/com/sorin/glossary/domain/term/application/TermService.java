package com.sorin.glossary.domain.term.application;

import com.sorin.glossary.domain.term.domain.Term;
import com.sorin.glossary.domain.term.domain.TermRepository;
import com.sorin.glossary.domain.term.dto.TermResponse;
import com.sorin.glossary.domain.term.dto.TermSearchCondition;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TermService {

    private final TermRepository termRepository;

    public Page<TermResponse> searchTerms(TermSearchCondition condition, Pageable pageable) {
        Page<Term> result = termRepository.search(condition, pageable);
        return result.map(TermResponse::from);
    }
}
