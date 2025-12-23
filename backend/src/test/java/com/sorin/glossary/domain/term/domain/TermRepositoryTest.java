package com.sorin.glossary.domain.term.domain;

import com.sorin.glossary.domain.process.domain.Process;
import com.sorin.glossary.domain.process.domain.ProcessRepository;
import com.sorin.glossary.domain.term.dto.TermSearchCondition;
import com.sorin.glossary.global.config.QueryDslConfig;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.context.annotation.Import;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
@Import(QueryDslConfig.class)
class TermRepositoryTest {

    @Autowired
    private TermRepository termRepository;

    @Autowired
    private ProcessRepository processRepository;

    @BeforeEach
    void setUp() {
        Process p1 = processRepository.save(Process.builder().name("제련").build());
        Process p2 = processRepository.save(Process.builder().name("전해").build());

        Term t1 = Term.builder().nameKo("가열").nameEn("Heating").description("desc").processes(List.of(p1)).build();
        Term t2 = Term.builder().nameKo("가공").nameEn("Processing").description("desc").processes(List.of(p2)).build();
        Term t3 = Term.builder().nameKo("나사").nameEn("Screw").description("desc").processes(List.of(p1, p2)).build();
        Term t4 = Term.builder().nameKo("다리").nameEn("Bridge").description("desc").build();

        // Deleted term
        Term t5 = Term.builder().nameKo("삭제된용어").nameEn("Deleted").description("desc").build();
        t5.softDelete();

        termRepository.saveAll(List.of(t1, t2, t3, t4, t5));
    }

    @Test
    @DisplayName("키워드 검색 (한글/영문) 및 Soft Delete 확인")
    void searchByKeyword() {
        // given
        TermSearchCondition condition = TermSearchCondition.builder().keyword("가").build();
        Pageable pageable = PageRequest.of(0, 10);

        // when
        Page<Term> result = termRepository.search(condition, pageable);

        // then
        assertThat(result.getContent()).hasSize(2); // 가열, 가공
        assertThat(result.getContent()).extracting("nameKo").containsExactlyInAnyOrder("가열", "가공");
    }

    @Test
    @DisplayName("공정 ID 필터 검색")
    void searchByProcessIds() {
        // given
        Process p1 = processRepository.findAll().stream().filter(p -> p.getName().equals("제련")).findFirst().get();
        TermSearchCondition condition = TermSearchCondition.builder().processIds(List.of(p1.getId())).build();
        Pageable pageable = PageRequest.of(0, 10);

        // when
        Page<Term> result = termRepository.search(condition, pageable);

        // then
        // t1(제련), t3(제련, 전해) -> 2개
        assertThat(result.getContent()).hasSize(2);
        assertThat(result.getContent()).extracting("nameKo").contains("가열", "나사");
    }

    @Test
    @DisplayName("초성 검색 (한글)")
    void searchByInitialKo() {
        // given
        TermSearchCondition condition = TermSearchCondition.builder().initial("ㄱ").build();
        Pageable pageable = PageRequest.of(0, 10);

        // when
        Page<Term> result = termRepository.search(condition, pageable);

        // then
        // 가열(ㄱ), 가공(ㄱ) -> 2개
        assertThat(result.getContent()).hasSize(2);
    }

    @Test
    @DisplayName("초성 검색 (영문)")
    void searchByInitialEn() {
        // given
        TermSearchCondition condition = TermSearchCondition.builder().initial("S").build(); // Screw
        Pageable pageable = PageRequest.of(0, 10);

        // when
        Page<Term> result = termRepository.search(condition, pageable);

        // then
        assertThat(result.getContent()).hasSize(1);
        assertThat(result.getContent().get(0).getNameEn()).isEqualTo("Screw");
    }

    @Test
    @DisplayName("삭제된 데이터는 조회되지 않아야 한다")
    void softDeleteCheck() {
        // given
        TermSearchCondition condition = TermSearchCondition.builder().keyword("삭제").build();
        Pageable pageable = PageRequest.of(0, 10);

        // when
        Page<Term> result = termRepository.search(condition, pageable);

        // then
        assertThat(result.getContent()).isEmpty();
    }
}
