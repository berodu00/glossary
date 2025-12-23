package com.sorin.glossary.domain.term.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Table(name = "term_synonyms")
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class TermSynonym {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "term_id", nullable = false)
    private Term term;

    @Column(nullable = false)
    private String synonym;

    public TermSynonym(Term term, String synonym) {
        this.term = term;
        this.synonym = synonym;
    }
}
