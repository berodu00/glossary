package com.sorin.glossary.domain.bookmark.presentation;

import com.sorin.glossary.domain.bookmark.application.BookmarkService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/bookmarks")
@RequiredArgsConstructor
public class BookmarkController {

    private final BookmarkService bookmarkService;

    @PostMapping("/{termId}")
    public ResponseEntity<Map<String, Boolean>> toggleBookmark(
            @PathVariable Long termId,
            @RequestParam(required = false, defaultValue = "TEST_USER") String userId // TODO: Replace with Auth
                                                                                      // Principal later
    ) {
        boolean isBookmarked = bookmarkService.toggleBookmark(userId, termId);
        return ResponseEntity.ok(Map.of("bookmarked", isBookmarked));
    }

    @GetMapping("/me")
    public ResponseEntity<List<Long>> getMyBookmarks(
            @RequestParam(required = false, defaultValue = "TEST_USER") String userId) {
        return ResponseEntity.ok(bookmarkService.getMyBookmarkTermIds(userId));
    }
}
