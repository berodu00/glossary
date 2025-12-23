package com.vibecoding.glossary.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Table(name = "std_domain")
@Getter
@Setter
public class StdDomain {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "domain_id")
    private Long domainId;

    @Column(name = "domain_name", nullable = false)
    private String domainName;

    @Column(name = "data_type")
    private String dataType;

    @Column(name = "data_length")
    private Integer dataLength;

    @Column(columnDefinition = "TEXT")
    private String description;
}
