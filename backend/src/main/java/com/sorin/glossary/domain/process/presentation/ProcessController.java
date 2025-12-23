package com.sorin.glossary.domain.process.presentation;

import com.sorin.glossary.domain.process.application.ProcessService;
import com.sorin.glossary.domain.process.dto.ProcessRequest;
import com.sorin.glossary.domain.process.dto.ProcessResponse;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/v1/processes")
@RequiredArgsConstructor
public class ProcessController {

    private final ProcessService processService;

    @PostMapping
    public ResponseEntity<ProcessResponse> createProcess(@Valid @RequestBody ProcessRequest.Create request) {
        return ResponseEntity.ok(processService.createProcess(request));
    }

    @GetMapping
    public ResponseEntity<List<ProcessResponse>> getAllProcesses() {
        return ResponseEntity.ok(processService.getAllProcesses());
    }
}
