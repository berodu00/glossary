package com.vibecoding.glossary.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "std_word")
@Getter
@Setter
public class StdWord {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "word_id")
    private Long wordId;

    @Column(name = "logical_name", nullable = false)
    private String logicalName;

    @Column(name = "physical_name", nullable = false)
    private String physicalName;

    @Column(columnDefinition = "TEXT")
    private String definition;

    @Column(length = 20)
    private String status = "APPROVED";
}
