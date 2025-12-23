package com.sorin.glossary.domain.auth.presentation;

import com.sorin.glossary.global.security.JwtTokenProvider;
import jakarta.validation.Valid;
import jakarta.validation.constraints.NotBlank;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.RequiredArgsConstructor;
import lombok.Setter;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/v1/auth")
@RequiredArgsConstructor
public class AuthController {

    private final JwtTokenProvider tokenProvider;

    @PostMapping("/dev-login")
    public ResponseEntity<TokenResponse> devLogin(@RequestBody @Valid DevLoginRequest request) {
        String role = request.getRole() != null ? request.getRole() : "ROLE_USER";
        String token = tokenProvider.createToken(request.getUserId(), role);
        return ResponseEntity.ok(new TokenResponse(token));
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class DevLoginRequest {
        @NotBlank
        private String userId;
        private String role; // Optional, defaults to ROLE_USER
    }

    @Getter
    @Setter
    @NoArgsConstructor
    public static class TokenResponse {
        private String accessToken;

        public TokenResponse(String accessToken) {
            this.accessToken = accessToken;
        }
    }
}
