package com.sorin.glossary.domain.suggestion.presentation;

import com.sorin.glossary.domain.suggestion.application.SuggestionService;
import com.sorin.glossary.domain.suggestion.dto.CreateSuggestionRequest;
import com.sorin.glossary.domain.suggestion.dto.SuggestionResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/suggestions")
@RequiredArgsConstructor
public class SuggestionController {

    private final SuggestionService suggestionService;

    // TODO: Use real user ID from security context in M8
    private static final String MOCK_USER_ID = "123456";
    private static final String MOCK_ADMIN_ID = "999999";

    @PostMapping
    public ResponseEntity<Void> createSuggestion(@RequestBody @Valid CreateSuggestionRequest request) {
        Long id = suggestionService.createSuggestion(request, MOCK_USER_ID);
        return ResponseEntity.created(URI.create("/api/v1/suggestions/" + id)).build();
    }

    @GetMapping("/pending")
    public ResponseEntity<List<SuggestionResponse>> getPendingSuggestions() {
        return ResponseEntity.ok(suggestionService.getPendingSuggestions());
    }

    @PostMapping("/{id}/approve")
    public ResponseEntity<Void> approveSuggestion(@PathVariable Long id) {
        suggestionService.approveSuggestion(id, MOCK_ADMIN_ID);
        return ResponseEntity.ok().build();
    }

    @PostMapping("/{id}/reject")
    public ResponseEntity<Void> rejectSuggestion(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String reason = body.getOrDefault("reason", "");
        suggestionService.rejectSuggestion(id, MOCK_ADMIN_ID, reason);
        return ResponseEntity.ok().build();
    }
}
