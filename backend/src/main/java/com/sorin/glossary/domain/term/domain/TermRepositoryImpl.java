package com.sorin.glossary.domain.term.domain;

import com.querydsl.core.types.Order;
import com.querydsl.core.types.OrderSpecifier;
import com.querydsl.core.types.dsl.BooleanExpression;
import com.querydsl.jpa.impl.JPAQuery;
import com.querydsl.jpa.impl.JPAQueryFactory;
import com.sorin.glossary.domain.term.dto.TermSearchCondition;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.support.PageableExecutionUtils;
import org.springframework.util.StringUtils;

import java.util.List;

import static com.sorin.glossary.domain.term.domain.QTerm.term;
import static com.sorin.glossary.domain.process.domain.QProcess.process;

@RequiredArgsConstructor
public class TermRepositoryImpl implements TermRepositoryCustom {

    private final JPAQueryFactory queryFactory;

    @Override
    public Page<Term> search(TermSearchCondition condition, Pageable pageable) {
        List<Term> content = queryFactory
                .selectFrom(term)
                .distinct()
                .leftJoin(term.processes, process).fetchJoin()
                .where(
                        keywordContains(condition.getKeyword()),
                        processIdsIn(condition.getProcessIds()),
                        initialEq(condition.getInitial()),
                        term.deletedAt.isNull() // Soft Delete check
                )
                .offset(pageable.getOffset())
                .limit(pageable.getPageSize())
                .orderBy(sort(pageable))
                .fetch();

        JPAQuery<Long> countQuery = queryFactory
                .select(term.countDistinct())
                .from(term)
                .leftJoin(term.processes, process)
                .where(
                        keywordContains(condition.getKeyword()),
                        processIdsIn(condition.getProcessIds()),
                        initialEq(condition.getInitial()),
                        term.deletedAt.isNull());

        return PageableExecutionUtils.getPage(content, pageable, countQuery::fetchOne);
    }

    private BooleanExpression keywordContains(String keyword) {
        if (!StringUtils.hasText(keyword)) {
            return null;
        }
        return term.nameKo.containsIgnoreCase(keyword)
                .or(term.nameEn.containsIgnoreCase(keyword))
                .or(term.abbreviation.containsIgnoreCase(keyword));
    }

    private BooleanExpression processIdsIn(List<Long> processIds) {
        if (processIds == null || processIds.isEmpty()) {
            return null;
        }
        return process.id.in(processIds);
    }

    private BooleanExpression initialEq(String initial) {
        if (!StringUtils.hasText(initial)) {
            return null;
        }
        // initial matches either ko or en
        return term.initialKo.eq(initial).or(term.initialEn.equalsIgnoreCase(initial));
    }

    private OrderSpecifier<?> sort(Pageable pageable) {
        if (!pageable.getSort().isEmpty()) {
            for (Sort.Order order : pageable.getSort()) {
                Order direction = order.getDirection().isAscending() ? Order.ASC : Order.DESC;
                switch (order.getProperty()) {
                    case "nameKo":
                        return new OrderSpecifier<>(direction, term.nameKo);
                    case "nameEn":
                        return new OrderSpecifier<>(direction, term.nameEn);
                    case "createdAt":
                        return new OrderSpecifier<>(direction, term.createdAt);
                }
            }
        }
        return new OrderSpecifier<>(Order.DESC, term.createdAt); // Default sort
    }
}
