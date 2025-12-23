package com.sorin.glossary.domain.log.domain;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;
import org.hibernate.annotations.JdbcTypeCode;
import org.hibernate.type.SqlTypes;

import java.time.LocalDateTime;
import java.util.Map;

@Entity
@Getter
@Table(name = "search_logs")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@EntityListeners(AuditingEntityListener.class)
public class SearchLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id", nullable = false)
    private String userId;

    @Column(name = "keyword")
    private String keyword;

    @JdbcTypeCode(SqlTypes.JSON)
    @Column(name = "search_condition", columnDefinition = "text")
    private Map<String, Object> searchCondition;

    @CreatedDate
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;

    @Builder
    public SearchLog(String userId, String keyword, Map<String, Object> searchCondition) {
        this.userId = userId;
        this.keyword = keyword;
        this.searchCondition = searchCondition;
    }
}
