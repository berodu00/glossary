package com.sorin.glossary.domain.process.domain;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;
import org.springframework.dao.DataIntegrityViolationException;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;

@DataJpaTest
class ProcessRepositoryTest {

    @Autowired
    private ProcessRepository processRepository;

    @Test
    @DisplayName("공정을 저장하고 조회한다")
    void saveAndFind() {
        // given
        Process process = Process.builder()
                .name("제련")
                .displayOrder(1)
                .build();

        // when
        Process savedProcess = processRepository.save(process);

        // then
        assertThat(savedProcess.getId()).isNotNull();
        assertThat(savedProcess.getName()).isEqualTo("제련");
        assertThat(savedProcess.getDisplayOrder()).isEqualTo(1);
        assertThat(savedProcess.getCreatedAt()).isNotNull();
    }

    @Test
    @DisplayName("공정 명칭은 중복될 수 없다")
    void duplicateName() {
        // given
        Process process1 = Process.builder().name("제련").build();
        Process process2 = Process.builder().name("제련").build();

        processRepository.save(process1);

        // when & then
        assertThatThrownBy(() -> processRepository.save(process2))
                .isInstanceOf(DataIntegrityViolationException.class);
    }

    @Test
    @DisplayName("DisplayOrder 기본값은 0이다")
    void defaultDisplayOrder() {
        // given
        Process process = Process.builder().name("배소").build();

        // when
        Process savedProcess = processRepository.save(process);

        // then
        assertThat(savedProcess.getDisplayOrder()).isEqualTo(0);
    }
}
