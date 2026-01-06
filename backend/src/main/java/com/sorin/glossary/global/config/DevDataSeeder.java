package com.sorin.glossary.global.config;

import com.sorin.glossary.domain.process.application.ProcessService;
import com.sorin.glossary.domain.process.domain.ProcessRepository;
import com.sorin.glossary.domain.process.dto.ProcessRequest;
import com.sorin.glossary.domain.process.dto.ProcessResponse;
import com.sorin.glossary.domain.suggestion.domain.SuggestionRepository;
import com.sorin.glossary.domain.term.application.TermService;
import com.sorin.glossary.domain.term.domain.TermRepository;
import com.sorin.glossary.domain.term.dto.TermRequest;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Profile;
import org.springframework.stereotype.Component;

import java.util.Arrays;
import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import com.sorin.glossary.domain.suggestion.application.SuggestionService;

@Slf4j
@Component
@RequiredArgsConstructor
public class DevDataSeeder implements CommandLineRunner {

    private final ProcessService processService;
    private final TermService termService;
    private final SuggestionService suggestionService;
    private final ProcessRepository processRepository;
    private final TermRepository termRepository;
    private final SuggestionRepository suggestionRepository;

    @Override
    public void run(String... args) throws Exception {
        log.info("🌱 Starting Dev Data Seeding...");

        // Clean Slate (Order matters for FK constraints)
        suggestionRepository.deleteAll();
        termRepository.deleteAll();
        processRepository.deleteAll();

        // 1. Seed Processes
        List<ProcessResponse> processes = seedProcesses();

        // 2. Seed Terms
        seedTerms(processes);

        log.info("✅ Dev Data Seeding Completed!");
    }

    private List<ProcessResponse> seedProcesses() {
        List<String> processNames = Arrays.asList(
                "제련 (Smelting)", "전해 (Electrolysis)", "주조 (Casting)", "출하 (Shipping)", "환경 (Environment)");

        int order = 1;
        for (String name : processNames) {
            processService.createProcess(ProcessRequest.Create.builder()
                    .name(name)
                    .displayOrder(order++)
                    .build());
        }
        return processService.getAllProcesses();
    }

    private void seedTerms(List<ProcessResponse> processes) {
        // Find Process IDs (Robust matching using English suffix)
        // e.g. "제련 (Smelting)" -> "Smelting"
        Map<String, Long> pMap = processes.stream()
                .collect(Collectors.toMap(p -> {
                    String name = p.getName();
                    if (name.contains("(") && name.contains(")")) {
                        return name.substring(name.indexOf("(") + 1, name.indexOf(")"));
                    }
                    return name;
                }, ProcessResponse::getId));

        // Sample Data (Lookup keys changed to English)
        createTerm("가열로", "Heating Furnace", "Furnace", "금속을 녹이거나 가열하기 위한 설비", pMap.get("Smelting"), "가열");
        createTerm("냉각수", "Cooling Water", "CW", "설비나 제품을 식히기 위해 순환되는 물", pMap.get("Smelting"), "냉각");
        createTerm("다이캐스팅", "Die Casting", "DC", "정밀한 금형에 용융 금속을 주입하여 주조하는 방식", pMap.get("Casting"), "주조");
        createTerm("라들", "Ladle", null, "용융 금속을 운반하거나 저장하는 용기", pMap.get("Casting"), "운반");
        createTerm("마그네슘", "Magnesium", "Mg", "가벼우면서도 강도가 높은 금속 원소", pMap.get("Smelting"), "원소");
        createTerm("불순물", "Impurity", null, "원하는 물질 외에 섞여 있는 다른 물질", pMap.get("Electrolysis"), "이물질");
        createTerm("슬래그", "Slag", null, "제련 과정에서 금속과 분리되어 나오는 찌꺼기", pMap.get("Smelting"), "찌꺼기");
        createTerm("아노드", "Anode", null, "전해 정련에서 산화 반응이 일어나는 양극", pMap.get("Electrolysis"), "양극");
        createTerm("전해액", "Electrolyte", null, "이온이 녹아 있어 전류가 흐를 수 있는 액체", pMap.get("Electrolysis"), "용액");
        createTerm("주형", "Mold", null, "용융 금속을 부어 굳히는 틀", pMap.get("Casting"), "틀");
        createTerm("차징", "Charging", null, "원료를 설비에 투입하는 작업", pMap.get("Smelting"), "투입");
        createTerm("카토드", "Cathode", null, "전해 정련에서 환원 반응이 일어나는 음극", pMap.get("Electrolysis"), "음극");
        createTerm("토치", "Torch", null, "가열이나 절단에 사용되는 불꽃 발생 장치", pMap.get("Shipping"), "절단");
        createTerm("파이프", "Pipe", null, "유체나 기체를 이송하는 관", pMap.get("Environment"), "배관");
        createTerm("하역", "Unloading", null, "화물을 싣고 내리는 작업", pMap.get("Shipping"), "운송");
        createTerm("호이스트", "Hoist", null, "무거운 물건을 들어 올리는 기계 장치", pMap.get("Environment"), "운반");
        createTerm("화학적 산소 요구량", "COD", "COD", "물 속의 유기물을 분해하는 데 필요한 산소의 양", pMap.get("Environment"), "수질");
        createTerm("교반기", "Agitator", null, "액체를 섞기 위한 장치", pMap.get("Electrolysis"), "혼합");
        createTerm("Scrap", "스크랩", null, "재활용을 위해 회수된 금속 부스러기", pMap.get("Smelting"), "고철");
        createTerm("Zinc", "아연", "Zn", "주기율표 30번 원소", pMap.get("Smelting"), "원소");

        // Jamo Search Test Data
        createTerm("테스트", "Test", null, "자모 검색 테스트 용어", pMap.get("Environment"), null);

        // 3. Seed Suggestions
        seedSuggestions(pMap);

        log.info("✅ Dev Data Seeding Completed!");
    }

    private void seedSuggestions(Map<String, Long> pMap) {
        suggestionService.createSuggestion(
                com.sorin.glossary.domain.suggestion.dto.CreateSuggestionRequest.builder()
                        .nameKo("새로운 용어 제안")
                        .nameEn("New Term Suggestion")
                        .description("이 용어를 추가해주세요. 검토 부탁드립니다.")
                        .processId(pMap.get("Smelting"))
                        .build(),
                "user123");
        suggestionService.createSuggestion(
                com.sorin.glossary.domain.suggestion.dto.CreateSuggestionRequest.builder()
                        .nameKo("반려될 제안")
                        .description("설명이 부족한 제안입니다.")
                        .processId(pMap.get("Casting"))
                        .build(),
                "user456");
    }

    private void createTerm(String nameKo, String nameEn, String abbr, String desc, Long processId, String synonym) {
        if (processId == null) {
            log.warn("❌ Process ID not found for term: {}", nameKo);
            return;
        }

        termService.createTerm(TermRequest.builder()
                .nameKo(nameKo)
                .nameEn(nameEn)
                .abbreviation(abbr)
                .description(desc)
                .processIds(Collections.singletonList(processId))
                .synonyms(synonym != null ? Collections.singletonList(synonym) : Collections.emptyList())
                .build());
    }
}
