package com.sorin.glossary.domain.term.application;

import com.sorin.glossary.domain.process.domain.Process;
import com.sorin.glossary.domain.process.domain.ProcessRepository;
import com.sorin.glossary.domain.term.domain.Term;
import com.sorin.glossary.domain.term.domain.TermRepository;
import com.sorin.glossary.domain.term.dto.TermRequest;
import com.sorin.glossary.domain.term.dto.TermResponse;
import com.sorin.glossary.global.error.exception.EntityNotFoundException;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;

import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.assertj.core.api.Assertions.assertThatThrownBy;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.ArgumentMatchers.anyList;
import static org.mockito.Mockito.verify;
import static org.mockito.Mockito.when;

@ExtendWith(MockitoExtension.class)
class TermServiceTest {

    @InjectMocks
    private TermService termService;

    @Mock
    private TermRepository termRepository;

    @Mock
    private ProcessRepository processRepository;

    @Test
    @DisplayName("용어 상세 조회 성공")
    void getTerm_Success() {
        // given
        Term term = Term.builder()
                .nameKo("테스트")
                .description("desc")
                .processes(List.of())
                .build();
        // mock id
        org.springframework.test.util.ReflectionTestUtils.setField(term, "id", 1L);

        when(termRepository.findById(1L)).thenReturn(Optional.of(term));

        // when
        TermResponse response = termService.getTerm(1L);

        // then
        assertThat(response.getNameKo()).isEqualTo("테스트");
    }

    @Test
    @DisplayName("삭제된 용어 조회 시 예외 발생")
    void getTerm_Deleted_ThrowsException() {
        // given
        Term term = Term.builder().nameKo("삭제됨").description("desc").build();
        term.softDelete();

        when(termRepository.findById(1L)).thenReturn(Optional.of(term));

        // when & then
        assertThatThrownBy(() -> termService.getTerm(1L))
                .isInstanceOf(EntityNotFoundException.class);
    }

    @Test
    @DisplayName("용어 생성 성공")
    void createTerm_Success() {
        // given
        TermRequest request = TermRequest.builder()
                .nameKo("신규")
                .description("desc")
                .processIds(List.of(1L))
                .synonyms(List.of("유의어"))
                .build();

        Process process = Process.builder().name("공정").build();
        when(processRepository.findAllById(anyList())).thenReturn(List.of(process));

        Term savedTerm = Term.builder().nameKo("신규").build();
        org.springframework.test.util.ReflectionTestUtils.setField(savedTerm, "id", 1L);
        when(termRepository.save(any(Term.class))).thenReturn(savedTerm);

        // when
        Long id = termService.createTerm(request);

        // then
        assertThat(id).isEqualTo(1L);
        verify(termRepository).save(any(Term.class));
    }
}
