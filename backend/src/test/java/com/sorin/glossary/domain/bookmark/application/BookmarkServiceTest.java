package com.sorin.glossary.domain.bookmark.application;

import com.sorin.glossary.domain.bookmark.domain.Bookmark;
import com.sorin.glossary.domain.bookmark.domain.BookmarkRepository;
import com.sorin.glossary.domain.term.domain.TermRepository;
import com.sorin.glossary.global.error.exception.EntityNotFoundException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.times;

@ExtendWith(MockitoExtension.class)
class BookmarkServiceTest {

    @InjectMocks
    private BookmarkService bookmarkService;

    @Mock
    private BookmarkRepository bookmarkRepository;

    @Mock
    private TermRepository termRepository;

    @Test
    @DisplayName("Toggle: Add bookmark if not exists")
    void toggle_add() {
        // given
        String userId = "TEST_USER";
        Long termId = 1L;

        given(termRepository.existsById(termId)).willReturn(true);
        given(bookmarkRepository.findByUserIdAndTermId(userId, termId)).willReturn(Optional.empty());

        // when
        boolean result = bookmarkService.toggleBookmark(userId, termId);

        // then
        assertThat(result).isTrue();
        verify(bookmarkRepository).save(any(Bookmark.class));
    }

    @Test
    @DisplayName("Toggle: Remove bookmark if exists")
    void toggle_remove() {
        // given
        String userId = "TEST_USER";
        Long termId = 1L;
        Bookmark bookmark = Bookmark.builder().userId(userId).termId(termId).build();

        given(termRepository.existsById(termId)).willReturn(true);
        given(bookmarkRepository.findByUserIdAndTermId(userId, termId)).willReturn(Optional.of(bookmark));

        // when
        boolean result = bookmarkService.toggleBookmark(userId, termId);

        // then
        assertThat(result).isFalse();
        verify(bookmarkRepository).delete(bookmark);
    }

    @Test
    @DisplayName("Toggle: Throw exception if term not found")
    void toggle_fail_term_not_found() {
        // given
        String userId = "TEST_USER";
        Long termId = 999L;

        given(termRepository.existsById(termId)).willReturn(false);

        // when & then
        assertThatThrownBy(() -> bookmarkService.toggleBookmark(userId, termId))
                .isInstanceOf(EntityNotFoundException.class);
    }
}
