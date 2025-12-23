package com.sorin.glossary.domain.process.presentation;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sorin.glossary.domain.process.application.ProcessService;
import com.sorin.glossary.domain.process.dto.ProcessRequest;
import com.sorin.glossary.domain.process.dto.ProcessResponse;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.List;

import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(ProcessController.class)
class ProcessControllerTest {

        @Autowired
        private MockMvc mockMvc;

        @MockBean
        private ProcessService processService;

        @Autowired
        private ObjectMapper objectMapper;

        @Test
        @DisplayName("공정을 생성한다")
        void createProcess() throws Exception {
                // given
                ProcessRequest.Create request = ProcessRequest.Create.builder()
                                .name("제련")
                                .displayOrder(1)
                                .build();

                given(processService.createProcess(any(ProcessRequest.Create.class)))
                                .willReturn(ProcessResponse.builder().id(1L).name("제련").displayOrder(1).build());

                // when & then
                mockMvc.perform(post("/api/v1/processes")
                                .contentType(MediaType.APPLICATION_JSON)
                                .content(objectMapper.writeValueAsString(request)))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$.id").exists())
                                .andExpect(jsonPath("$.name").value("제련"));
        }

        @Test
        @DisplayName("공정 목록을 조회한다")
        void getAllProcesses() throws Exception {
                // given
                given(processService.getAllProcesses())
                                .willReturn(List.of(
                                                ProcessResponse.builder().id(1L).name("제련").displayOrder(1).build()));

                // when & then
                mockMvc.perform(get("/api/v1/processes"))
                                .andExpect(status().isOk())
                                .andExpect(jsonPath("$[0].name").value("제련"));
        }
}
