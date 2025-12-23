package com.sorin.glossary.domain.suggestion.domain;

import com.sorin.glossary.domain.process.domain.Process;
import com.sorin.glossary.domain.term.domain.Term;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Table(name = "term_suggestions")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
public class Suggestion {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "requester_id", nullable = false)
    private String requesterId;

    @Column(name = "name_ko", nullable = false)
    private String nameKo;

    @Column(name = "name_en")
    private String nameEn;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String description;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "process_id")
    private Process process;

    @Enumerated(EnumType.STRING)
    @Column(length = 20)
    private SuggestionStatus status;

    @Column(name = "reviewer_id")
    private String reviewerId;

    @Column(name = "reviewer_note", columnDefinition = "TEXT")
    private String reviewerNote;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "approved_term_id")
    private Term approvedTerm;

    @CreatedDate
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Column(name = "reviewed_at")
    private LocalDateTime reviewedAt;

    @Builder
    public Suggestion(String requesterId, String nameKo, String nameEn, String description, Process process) {
        this.requesterId = requesterId;
        this.nameKo = nameKo;
        this.nameEn = nameEn;
        this.description = description;
        this.process = process;
        this.status = SuggestionStatus.PENDING;
    }

    public void approve(Term term, String reviewerId) {
        this.status = SuggestionStatus.APPROVED;
        this.approvedTerm = term;
        this.reviewerId = reviewerId;
        this.reviewedAt = LocalDateTime.now();
    }

    public void reject(String reviewerId, String reason) {
        this.status = SuggestionStatus.REJECTED;
        this.reviewerId = reviewerId;
        this.reviewerNote = reason;
        this.reviewedAt = LocalDateTime.now();
    }
}
