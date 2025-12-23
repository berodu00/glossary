package com.vibecoding.glossary.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Table(name = "std_term")
@Getter
@Setter
public class StdTerm {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "term_id")
    private Long termId;

    @Column(name = "logical_name", nullable = false)
    private String logicalName;

    @Column(name = "physical_name", nullable = false)
    private String physicalName;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "domain_id")
    private StdDomain domain;

    @Column(length = 20)
    private String status;

    @Column(name = "requester_id", length = 50)
    private String requesterId;

    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
}
