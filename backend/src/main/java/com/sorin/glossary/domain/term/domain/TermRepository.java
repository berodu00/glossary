package com.sorin.glossary.domain.term.domain;

import org.springframework.data.jpa.repository.JpaRepository;

public interface TermRepository extends JpaRepository<Term, Long>, TermRepositoryCustom {
    // Basic repository. Custom search will be in Custom implementation via QueryDSL
    // later.
}
