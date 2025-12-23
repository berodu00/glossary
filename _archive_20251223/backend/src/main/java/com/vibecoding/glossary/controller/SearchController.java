package com.vibecoding.glossary.controller;

import com.vibecoding.glossary.dto.TermRespDto;
import com.vibecoding.glossary.service.TermService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/terms")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173") // Allow frontend
public class SearchController {

    private final TermService termService;

    @GetMapping
    public List<TermRespDto> search(@RequestParam(name = "q", required = false) String keyword) {
        return termService.searchTerms(keyword).stream()
                .map(TermRespDto::new)
                .collect(Collectors.toList());
    }
}
