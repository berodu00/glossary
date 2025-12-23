package com.sorin.glossary.domain.bookmark.application;

import com.sorin.glossary.domain.bookmark.domain.Bookmark;
import com.sorin.glossary.domain.bookmark.domain.BookmarkRepository;
import com.sorin.glossary.domain.term.domain.Term;
import com.sorin.glossary.domain.term.domain.TermRepository;
import com.sorin.glossary.global.error.exception.EntityNotFoundException;
import com.sorin.glossary.global.error.CommonErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class BookmarkService {

    private final BookmarkRepository bookmarkRepository;
    private final TermRepository termRepository;

    @Transactional
    public boolean toggleBookmark(String userId, Long termId) {
        // Check if term exists first
        if (!termRepository.existsById(termId)) {
            throw new EntityNotFoundException(CommonErrorCode.TERM_NOT_FOUND);
        }

        return bookmarkRepository.findByUserIdAndTermId(userId, termId)
                .map(bookmark -> {
                    bookmarkRepository.delete(bookmark);
                    return false; // Removed
                })
                .orElseGet(() -> {
                    bookmarkRepository.save(Bookmark.builder()
                            .userId(userId)
                            .termId(termId)
                            .build());
                    return true; // Added
                });
    }

    public List<Long> getMyBookmarkTermIds(String userId) {
        return bookmarkRepository.findByUserIdOrderByCreatedAtDesc(userId).stream()
                .map(Bookmark::getTermId)
                .toList();
    }
}
