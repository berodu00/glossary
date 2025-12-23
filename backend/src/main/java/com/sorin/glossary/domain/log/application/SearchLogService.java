package com.sorin.glossary.domain.log.application;

import com.sorin.glossary.domain.log.domain.SearchLog;
import com.sorin.glossary.domain.log.domain.SearchLogRepository;
import com.sorin.glossary.domain.term.dto.TermSearchCondition;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.scheduling.annotation.Async;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import java.util.HashMap;
import java.util.Map;

@Service
@RequiredArgsConstructor
@Slf4j
public class SearchLogService {

    private final SearchLogRepository searchLogRepository;

    @Async
    @Transactional(propagation = Propagation.REQUIRES_NEW)
    public void logSearch(String userId, TermSearchCondition condition) {
        try {
            // Skip logging if empty search (optional policy)
            if (condition.getKeyword() == null && condition.getInitial() == null
                    && (condition.getProcessIds() == null || condition.getProcessIds().isEmpty())) {
                return;
            }

            Map<String, Object> conditionMap = new HashMap<>();
            if (condition.getProcessIds() != null)
                conditionMap.put("processIds", condition.getProcessIds());
            if (condition.getInitial() != null)
                conditionMap.put("initial", condition.getInitial());

            searchLogRepository.save(SearchLog.builder()
                    .userId(userId)
                    .keyword(condition.getKeyword())
                    .searchCondition(conditionMap)
                    .build());
        } catch (Exception e) {
            log.error("Failed to log search for user: {}", userId, e);
            // Non-blocking error, just log it
        }
    }
}
