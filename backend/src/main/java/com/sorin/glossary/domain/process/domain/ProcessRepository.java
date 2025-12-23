package com.sorin.glossary.domain.process.domain;

import org.springframework.data.jpa.repository.JpaRepository;

public interface ProcessRepository extends JpaRepository<Process, Long> {
    boolean existsByName(String name);
}
