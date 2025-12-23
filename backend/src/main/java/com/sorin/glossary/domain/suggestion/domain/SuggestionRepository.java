package com.sorin.glossary.domain.suggestion.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface SuggestionRepository extends JpaRepository<Suggestion, Long> {
    List<Suggestion> findAllByStatusOrderByCreatedAtDesc(SuggestionStatus status);
}
