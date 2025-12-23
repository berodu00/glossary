package com.sorin.glossary.domain.term.domain;

import com.sorin.glossary.domain.term.dto.TermSearchCondition;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface TermRepositoryCustom {
    Page<Term> search(TermSearchCondition condition, Pageable pageable);
}
