package com.sorin.glossary.domain.bookmark.domain;

import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;
import java.util.List;

public interface BookmarkRepository extends JpaRepository<Bookmark, Long> {
    boolean existsByUserIdAndTermId(String userId, Long termId);

    Optional<Bookmark> findByUserIdAndTermId(String userId, Long termId);

    List<Bookmark> findByUserIdOrderByCreatedAtDesc(String userId);
    // In future, if we need to fetch Terms directly with join, we might add a
    // custom query or use a projection/DTO.
    // For now, we'll fetch bookmarks and then fetch terms or similar.
    // Actually, to get "My Bookmarks" efficiently, we might want:
    // @Query("SELECT t FROM Term t JOIN Bookmark b ON t.id = b.termId WHERE
    // b.userId = :userId ...")
    // But let's start simple.
}
