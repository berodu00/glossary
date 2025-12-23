package com.sorin.glossary.domain.term.domain;

import com.sorin.glossary.domain.process.domain.Process;
import com.sorin.glossary.domain.process.domain.ProcessRepository;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import java.util.List;

import static org.assertj.core.api.Assertions.assertThat;

@DataJpaTest
class TermRepositoryTest {

    @Autowired
    private TermRepository termRepository;

    @Autowired
    private ProcessRepository processRepository;

    @Test
    @DisplayName("용어 저장 시 초성이 자동 생성된다")
    void saveTermWithInitials() {
        // given
        Term term = Term.builder()
                .nameKo("배소")
                .nameEn("Roasting")
                .description("광석을 굽는 공정")
                .build();

        // when
        Term savedTerm = termRepository.save(term);

        // then
        assertThat(savedTerm.getId()).isNotNull();
        assertThat(savedTerm.getInitialKo()).isEqualTo("ㅂ");
        assertThat(savedTerm.getInitialEn()).isEqualTo("R");
    }

    @Test
    @DisplayName("용어와 공정을 매핑하여 저장한다")
    void saveTermWithProcess() {
        // given
        Process process = processRepository.save(Process.builder().name("제련").build());

        Term term = Term.builder()
                .nameKo("전해")
                .nameEn("Electrolysis")
                .description("전기 분해")
                .processes(List.of(process))
                .build();

        // when
        Term savedTerm = termRepository.save(term);

        // then
        assertThat(savedTerm.getProcesses()).hasSize(1);
        assertThat(savedTerm.getProcesses().get(0).getName()).isEqualTo("제련");
    }
}
