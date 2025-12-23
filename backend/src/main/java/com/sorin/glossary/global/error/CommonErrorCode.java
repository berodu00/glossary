package com.sorin.glossary.global.error;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum CommonErrorCode implements ErrorCode {
    INVALID_PARAMETER("C001", "Invalid Parameter"),
    RESOURCE_NOT_FOUND("C002", "Resource not found"),
    ENTITY_NOT_FOUND("C003", "Entity Not Found"),
    TERM_NOT_FOUND("T001", "Term Not Found"),
    INTERNAL_SERVER_ERROR("C999", "Internal Server Error"),
    ;

    private final String code;
    private final String message;
}
