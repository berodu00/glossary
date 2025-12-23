package com.sorin.glossary.domain.log.presentation;

import com.sorin.glossary.domain.log.domain.SearchLog;
import com.sorin.glossary.domain.log.domain.SearchLogRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/search-logs")
@RequiredArgsConstructor
public class SearchLogController {

    private final SearchLogRepository searchLogRepository;

    @GetMapping("/recent")
    public ResponseEntity<List<Map<String, Object>>> getRecentLogs(
            @RequestParam(required = false, defaultValue = "TEST_USER") String userId) {
        // Return simplified logs (e.g. just keyword and date)
        List<SearchLog> logs = searchLogRepository.findTop10ByUserIdOrderByCreatedAtDesc(userId);

        List<Map<String, Object>> response = logs.stream()
                .filter(log -> log.getKeyword() != null && !log.getKeyword().isBlank())
                .map(log -> Map.<String, Object>of(
                        "id", log.getId(),
                        "keyword", log.getKeyword(),
                        "createdAt", log.getCreatedAt()))
                .distinct() // simple distinct, might need better logic if duplicates exist
                .toList();

        return ResponseEntity.ok(response);
    }
}
