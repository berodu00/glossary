package com.sorin.glossary.global.util;

public class TermUtils {

    // Hangul Unicode Constants
    private static final char HANGUL_BASE = 0xAC00; // '가'
    private static final char HANGUL_END = 0xD7A3; // '힣'
    private static final int CHOSUNG_BASE = 588;
    private static final int JUNGSUNG_BASE = 28;

    private static final char[] CHOSUNG_LIST = {
            'ㄱ', 'ㄲ', 'ㄴ', 'ㄷ', 'ㄸ', 'ㄹ', 'ㅁ', 'ㅂ', 'ㅃ', 'ㅅ',
            'ㅆ', 'ㅇ', 'ㅈ', 'ㅉ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
    };

    private static final char[] JUNGSUNG_LIST = {
            'ㅏ', 'ㅐ', 'ㅑ', 'ㅒ', 'ㅓ', 'ㅔ', 'ㅕ', 'ㅖ', 'ㅗ', 'ㅘ',
            'ㅙ', 'ㅚ', 'ㅛ', 'ㅜ', 'ㅝ', 'ㅞ', 'ㅟ', 'ㅠ', 'ㅡ', 'ㅢ', 'ㅣ'
    };

    private static final char[] JONGSUNG_LIST = {
            ' ', 'ㄱ', 'ㄲ', 'ㄳ', 'ㄴ', 'ㄵ', 'ㄶ', 'ㄷ', 'ㄹ', 'ㄺ',
            'ㄻ', 'ㄼ', 'ㄽ', 'ㄾ', 'ㄿ', 'ㅀ', 'ㅁ', 'ㅂ', 'ㅄ', 'ㅅ',
            'ㅆ', 'ㅇ', 'ㅈ', 'ㅊ', 'ㅋ', 'ㅌ', 'ㅍ', 'ㅎ'
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
        return String.valueOf(c);
    }

    public static String getInitialEn(String text) {
        if (text == null || text.isEmpty()) {
            return "";
        }
        char c = text.charAt(0);
        if (isAlpha(c)) {
            return String.valueOf(Character.toUpperCase(c));
        }
        return String.valueOf(c);
    }

    /**
     * Extracts all initial consonants from the text.
     * e.g. "테스트" -> "ㅌㅅㅌ"
     */
    public static String extractInitials(String text) {
        if (text == null || text.isEmpty()) {
            return "";
        }

        StringBuilder sb = new StringBuilder();
        for (char c : text.toCharArray()) {
            if (c >= HANGUL_BASE && c <= HANGUL_END) {
                int chosungIndex = (c - HANGUL_BASE) / CHOSUNG_BASE;
                sb.append(CHOSUNG_LIST[chosungIndex]);
            } else if (c >= 'ㄱ' && c <= 'ㅎ') {
                // Already a consonant (user typing jamo)
                sb.append(c);
            } else {
                sb.append(c);
            }
        }
        return sb.toString();
    }

    /**
     * Decomposes Hangul syllables into Jamo.
     * e.g. "테스트" -> "ㅌㅔㅅㅡㅌㅡ"
     */
    public static String extractJamo(String text) {
        if (text == null || text.isEmpty()) {
            return "";
        }

        StringBuilder sb = new StringBuilder();
        for (char c : text.toCharArray()) {
            if (c >= HANGUL_BASE && c <= HANGUL_END) {
                int base = c - HANGUL_BASE;
                int chosungIndex = base / CHOSUNG_BASE;
                int jungsungIndex = (base % CHOSUNG_BASE) / JUNGSUNG_BASE;
                int jongsungIndex = base % JUNGSUNG_BASE;

                sb.append(CHOSUNG_LIST[chosungIndex]);
                sb.append(JUNGSUNG_LIST[jungsungIndex]);
                if (jongsungIndex > 0) {
                    sb.append(JONGSUNG_LIST[jongsungIndex]);
                }
            } else {
                sb.append(c);
            }
        }
        return sb.toString();
    }

    public static boolean isAllConsonants(String text) {
        if (text == null || text.isEmpty()) {
            return false;
        }
        for (char c : text.toCharArray()) {
            boolean isConsonant = false;
            for (char chosung : CHOSUNG_LIST) {
                if (c == chosung) {
                    isConsonant = true;
                    break;
                }
            }
            // Allow spaces? Maybe not. Strict usage.
            if (!isConsonant)
                return false;
        }
        return true;
    }

    private static boolean isAlpha(char c) {
        return (c >= 'a' && c <= 'z') || (c >= 'A' && c <= 'Z');
    }
}
