package com.sorin.glossary.global.util;

public class TermUtils {

    // Hangul Unicode Constants
    private static final char HANGUL_BASE = 0xAC00; // '가'
    private static final char HANGUL_END = 0xD7A3; // '힣'
    private static final int CHOSUNG_BASE = 588;
    private static final char[] CHOSUNG_LIST = {
            'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ',
            'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
    };

    public static String getInitialKo(String text) {
        if (text == null || text.isEmpty()) {
            return "";
        }
        char c = text.charAt(0);
        if (c >= HANGUL_BASE && c <= HANGUL_END) {
            int chosungIndex = (c - HANGUL_BASE) / CHOSUNG_BASE;
            return String.valueOf(CHOSUNG_LIST[chosungIndex]);
        }
        // If not Hangul, return the character itself or handle otherwise?
        // Spec says "initial_ko" (ㄱ~ㅎ).
        // If it starts with non-hangul, maybe it's invalid for name_ko?
        // Or just return first char.
        return String.valueOf(c);
    }

    public static String getInitialEn(String text) {
        if (text == null || text.isEmpty()) {
            return "";
        }
        // Spec says: extract first char of name_en and uppercase it
        char c = text.charAt(0);
        if (isAlpha(c)) {
            return String.valueOf(Character.toUpperCase(c));
        }
        return String.valueOf(c);
    }

    private static boolean isAlpha(char c) {
        return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z');
    }
}
