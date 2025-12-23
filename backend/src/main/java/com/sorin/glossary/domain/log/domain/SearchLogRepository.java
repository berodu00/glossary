package com.sorin.glossary.domain.log.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SearchLogRepository extends JpaRepository<SearchLog, Long> {
    List<SearchLog> findTop10ByUserIdOrderByCreatedAtDesc(String userId);
}
