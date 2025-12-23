package com.sorin.glossary.global.dto;

import lombok.Getter;
import org.springframework.data.domain.Page;

import java.util.List;

@Getter
public class PageResponse<T> {
    private final List<T> content;
    private final long totalElements;
    private final int totalPages;
    private final int size;
    private final int number;
    private final boolean first;
    private final boolean last;
    private final boolean empty;

    public PageResponse(Page<T> page) {
        this.content = page.getContent();
        this.totalElements = page.getTotalElements();
        this.totalPages = page.getTotalPages();
        this.size = page.getSize();
        this.number = page.getNumber();
        this.first = page.isFirst();
        this.last = page.isLast();
        this.empty = page.isEmpty();
    }
}
