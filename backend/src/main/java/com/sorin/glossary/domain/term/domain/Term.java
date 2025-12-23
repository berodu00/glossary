package com.sorin.glossary.domain.term.domain;

import com.sorin.glossary.domain.process.domain.Process;
import com.sorin.glossary.global.util.TermUtils;
import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "terms")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
public class Term {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name_ko", nullable = false)
    private String nameKo;

    @Column(name = "name_en")
    private String nameEn;

    private String abbreviation;

    @Column(nullable = false, columnDefinition = "TEXT")
    private String description;

    @Column(name = "photo_url")
    private String photoUrl;

    @Column(name = "initial_ko", nullable = false, columnDefinition = "char(1)")
    private String initialKo;

    @Column(name = "initial_en", nullable = false, columnDefinition = "char(1)")
    private String initialEn;

    @CreatedDate
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @LastModifiedDate
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "updated_by")
    private String updatedBy;

    @Column(name = "deleted_at")
    private LocalDateTime deletedAt;

    @ManyToMany(fetch = FetchType.LAZY)
    @JoinTable(name = "term_process_mapping", joinColumns = @JoinColumn(name = "term_id"), inverseJoinColumns = @JoinColumn(name = "process_id"))
    private List<Process> processes = new ArrayList<>();

    @OneToMany(mappedBy = "term", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<TermSynonym> synonyms = new ArrayList<>();

    @Builder
    public Term(String nameKo, String nameEn, String abbreviation, String description, String photoUrl,
            String updatedBy, List<Process> processes) {
        this.nameKo = nameKo;
        this.nameEn = nameEn;
        this.abbreviation = abbreviation;
        this.description = description;
        this.photoUrl = photoUrl;
        this.updatedBy = updatedBy;

        // Auto-generate initials
        this.initialKo = TermUtils.getInitialKo(nameKo);
        this.initialEn = TermUtils.getInitialEn(nameEn);

        if (processes != null) {
            this.processes = processes;
        }
    }

    public void softDelete() {
        this.deletedAt = LocalDateTime.now();
    }

    public void update(String nameKo, String nameEn, String abbreviation, String description, String photoUrl,
            String updatedBy, List<Process> processes) {
        this.nameKo = nameKo;
        this.nameEn = nameEn;
        this.abbreviation = abbreviation;
        this.description = description;
        this.photoUrl = photoUrl;
        this.updatedBy = updatedBy;
        this.initialKo = TermUtils.getInitialKo(nameKo);
        this.initialEn = TermUtils.getInitialEn(nameEn);

        if (processes != null) {
            this.processes = processes;
        }
    }
}
