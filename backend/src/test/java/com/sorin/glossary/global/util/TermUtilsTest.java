package com.sorin.glossary.global.util;

import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;

import static org.assertj.core.api.Assertions.assertThat;

class TermUtilsTest {

    @Test
    @DisplayName("한글 초성 추출 테스트")
    void getInitialKo() {
        assertThat(TermUtils.getInitialKo("감자")).isEqualTo("ㄱ");
        assertThat(TermUtils.getInitialKo("사과")).isEqualTo("ㅅ");
        assertThat(TermUtils.getInitialKo("하늘")).isEqualTo("ㅎ");
        assertThat(TermUtils.getInitialKo("Apple")).isEqualTo("A");
    }

    @Test
    @DisplayName("영문 초성 추출 테스트")
    void getInitialEn() {
        assertThat(TermUtils.getInitialEn("Apple")).isEqualTo("A");
        assertThat(TermUtils.getInitialEn("banana")).isEqualTo("B");
        assertThat(TermUtils.getInitialEn("감자")).isEqualTo("감");
    }
}
