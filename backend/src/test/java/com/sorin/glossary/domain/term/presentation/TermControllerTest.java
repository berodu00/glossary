package com.sorin.glossary.domain.term.presentation;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sorin.glossary.domain.term.application.TermService;
import com.sorin.glossary.domain.term.dto.TermResponse;
import com.sorin.glossary.domain.term.dto.TermSearchCondition;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.Pageable;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;
import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(controllers = TermController.class)
class TermControllerTest {

        @Autowired
        private MockMvc mockMvc;

        @MockBean
        private TermService termService;

        @Test
        @DisplayName("용어 검색 API Test")
        void searchTerms() throws Exception {
                // given
                TermResponse term = TermResponse.builder()
                                .id(1L)
                                .nameKo("테스트용어")
                                .initialKo("ㅌ")
                                .initialEn("T")
                                .processes(new java.util.ArrayList<>())
                                .createdAt(java.time.LocalDateTime.now())
                                .updatedAt(java.time.LocalDateTime.now())
                                .build();

                List<TermResponse> content = new java.util.ArrayList<>();
                content.add(term);

                // Assuming 'termResponses' refers to the 'content' list in this context
                // and the instruction implies wrapping it in a new ArrayList for PageImpl.
                // Also simplifying 'any()' arguments as per the provided snippet.
                given(termService.searchTerms(any(), any()))
                                .willReturn(new PageImpl<>(new java.util.ArrayList<>(content)));

                // when & then
                mockMvc.perform(get("/api/v1/terms")
                                .param("keyword", "테스트")
                                .param("page", "0")
                                .param("size", "10"))
                                .andDo(print())
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$.content[0].nameKo").value("테스트용어"));
        }
}
