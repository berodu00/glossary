package com.sorin.glossary.domain.term.application;

import com.sorin.glossary.domain.process.domain.ProcessRepository;
import com.sorin.glossary.domain.process.domain.Process;
import com.sorin.glossary.domain.term.domain.Term;
import com.sorin.glossary.domain.term.domain.TermRepository;
import com.sorin.glossary.domain.term.domain.TermSynonym;
import com.sorin.glossary.domain.term.dto.TermRequest;
import com.sorin.glossary.domain.term.dto.TermResponse;
import com.sorin.glossary.domain.term.dto.TermSearchCondition;
import com.sorin.glossary.global.error.exception.EntityNotFoundException;
import com.sorin.glossary.global.error.CommonErrorCode;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class TermService {

    private final TermRepository termRepository;
    private final ProcessRepository processRepository;

    public Page<TermResponse> searchTerms(TermSearchCondition condition, Pageable pageable) {
        Page<Term> result = termRepository.search(condition, pageable);
        return result.map(TermResponse::from);
    }

    public TermResponse getTerm(Long id) {
        Term term = findTermById(id);
        return TermResponse.from(term);
    }

    @Transactional
    public Long createTerm(TermRequest request) {
        List<Process> processes = processRepository.findAllById(request.getProcessIds());
        Term term = Term.builder()
                .nameKo(request.getNameKo())
                .nameEn(request.getNameEn())
                .abbreviation(request.getAbbreviation())
                .description(request.getDescription())
                .photoUrl(request.getPhotoUrl())
                .processes(processes)
                .build();

        if (request.getSynonyms() != null) {
            for (String synonymStr : request.getSynonyms()) {
                term.getSynonyms().add(new TermSynonym(term, synonymStr));
            }
        }

        return termRepository.save(term).getId();
    }

    @Transactional
    public void updateTerm(Long id, TermRequest request) {
        Term term = findTermById(id);
        List<Process> processes = processRepository.findAllById(request.getProcessIds());

        term.update(
                request.getNameKo(),
                request.getNameEn(),
                request.getAbbreviation(),
                request.getDescription(),
                request.getPhotoUrl(),
                null,
                processes);

        term.getSynonyms().clear();
        if (request.getSynonyms() != null) {
            for (String synonymStr : request.getSynonyms()) {
                term.getSynonyms().add(new TermSynonym(term, synonymStr));
            }
        }
    }

    @Transactional
    public void deleteTerm(Long id) {
        Term term = findTermById(id);
        term.softDelete();
    }

    private Term findTermById(Long id) {
        Term term = termRepository.findById(id)
                .orElseThrow(() -> new EntityNotFoundException(CommonErrorCode.ENTITY_NOT_FOUND));

        if (term.getDeletedAt() != null) {
            throw new EntityNotFoundException(CommonErrorCode.ENTITY_NOT_FOUND);
        }
        return term;
    }
}
