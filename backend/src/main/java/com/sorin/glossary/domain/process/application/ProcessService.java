package com.sorin.glossary.domain.process.application;

import com.sorin.glossary.domain.process.domain.Process;
import com.sorin.glossary.domain.process.domain.ProcessRepository;
import com.sorin.glossary.domain.process.dto.ProcessRequest;
import com.sorin.glossary.domain.process.dto.ProcessResponse;
import com.sorin.glossary.global.error.CommonErrorCode;
import com.sorin.glossary.global.error.exception.BusinessException;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class ProcessService {

    private final ProcessRepository processRepository;

    @Transactional
    public ProcessResponse createProcess(ProcessRequest.Create request) {
        if (processRepository.existsByName(request.getName())) {
            throw new BusinessException(CommonErrorCode.INVALID_PARAMETER); // TODO: Add specific DUPLICATE error code
        }

        Process process = Process.builder()
                .name(request.getName())
                .displayOrder(request.getDisplayOrder())
                .build();

        return ProcessResponse.from(processRepository.save(process));
    }

    public List<ProcessResponse> getAllProcesses() {
        return processRepository.findAll(Sort.by("displayOrder").ascending())
                .stream()
                .map(ProcessResponse::from)
                .collect(Collectors.toList());
    }

    // TODO: Update and Delete implementation
}
