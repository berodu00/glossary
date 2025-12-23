package com.vibecoding.glossary.service;

import com.vibecoding.glossary.entity.StdTerm;
import com.vibecoding.glossary.repository.StdTermRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
@RequiredArgsConstructor
public class TermService {
    private final StdTermRepository termRepository;

    @Transactional(readOnly = true)
    public List<StdTerm> searchTerms(String keyword) {
        if (keyword == null || keyword.trim().isEmpty()) {
            return termRepository.findAll();
        }
        return termRepository.searchByKeyword(keyword);
    }
}
