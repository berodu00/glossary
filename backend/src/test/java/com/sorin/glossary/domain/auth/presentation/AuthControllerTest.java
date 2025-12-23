package com.sorin.glossary.domain.auth.presentation;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.sorin.glossary.global.security.JwtTokenProvider;
import com.sorin.glossary.global.config.SecurityConfig;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.context.annotation.Import;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@WebMvcTest(AuthController.class)
@Import(SecurityConfig.class)
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @MockBean
    private JwtTokenProvider tokenProvider;

    @Autowired
    private ObjectMapper objectMapper;

    @Test
    @DisplayName("Dev Login 성공 시 토큰을 반환한다")
    void devLogin_Success() throws Exception {
        // given
        AuthController.DevLoginRequest request = new AuthController.DevLoginRequest();
        request.setUserId("TEST_USER");
        request.setRole("ROLE_USER");

        given(tokenProvider.createToken(anyString(), anyString())).willReturn("mock-jwt-token");

        // when & then
        mockMvc.perform(post("/api/v1/auth/dev-login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$.accessToken").value("mock-jwt-token"));
    }

    @Test
    @DisplayName("Dev Login 시 UserId가 없으면 400 에러")
    void devLogin_Fail_NoUserId() throws Exception {
        // given
        AuthController.DevLoginRequest request = new AuthController.DevLoginRequest();
        // userId null

        // when & then
        mockMvc.perform(post("/api/v1/auth/dev-login")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(request)))
                .andExpect(status().isBadRequest());
    }
}
