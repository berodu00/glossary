# Vibe Coding Project - 사내 표준 용어 관리 시스템 개발 명세 분석 리포트

**문서 번호:** SPEC-2025-003
**작성일:** 2025년 12월 16일
**작성자:** Gemini (AI Assistant)
**프로젝트 기간:** 2025.12.15 ~ 2026.02.28

---

## 1. 프로젝트 개요

### 1.1 배경 및 목적
부서 간, 혹은 프로젝트 간 상이한 용어 사용으로 인한 커뮤니케이션 비용을 절감하고, IT 시스템 구축 시 데이터 표준(DB 컬럼명, 변수명 등)을 준수하기 위한 중앙 집중형 관리 시스템이 필요합니다. 엑셀 기반의 수기 관리를 탈피하여 검색 편의성과 데이터 무결성을 확보합니다.

### 1.2 핵심 목표
* **용어 표준화:** 한글명, 영문명, 약어, 이의어(Synonym) 등을 체계적으로 관리하여 전사 표준 정립.
* **개발 생산성 향상:** 개발자가 변수명이나 DB 컬럼명을 고민하는 시간을 줄이고, 자동 변환 기능 제공.
* **접근성 강화:** 웹 기반의 통합 검색 환경을 구축하여 누구나 쉽게 표준 용어를 조회.
* **변경 관리:** 용어의 제정, 개정, 폐기 이력을 시스템으로 관리하여 혼선 방지.

---

## 2. 개발 환경 및 기술 스택

`2.rule.txt`의 프로젝트 표준 기술 스택을 기반으로 합니다.

| 구분 | 기술 스택 | 비고 |
| :--- | :--- | :--- |
| **Backend** | **Java, Spring Boot** | 안정적인 API 서비스 제공 |
| **Database** | **PostgreSQL** | 대용량 텍스트 검색 및 표준 데이터 저장 |
| **Search Engine** | **PostgreSQL Full-Text Search** | 별도 엔진 도입 없이 DB 내장 기능 활용 (초기 단계) |
| **Frontend** | **React 또는 Thymeleaf** | 검색 중심의 SPA(Single Page Application) 구조 권장 |
| **Infra** | **Docker** | 배포 편의성 확보 |

---

## 3. 기능 요구사항 (Functional Requirements)

### 3.1 용어 검색 및 조회 (General User)
* **통합 검색:** 한글명, 영문명, 약어, 설명에 포함된 키워드로 통합 검색 (자동 완성 기능 포함).
* **상세 조회:** 용어의 정의, 표준 영문명, 약어, 도메인(타입, 길이), 이의어/유의어 정보 표시.
* **개발 지원 도구:**
    * **Case 변환:** 검색된 영문명을 CamelCase, SnakeCase, PascalCase로 원클릭 복사 기능 제공.
    * **SQL 생성:** 테이블 정의서 작성 시 활용 가능한 표준 용어 리스트 엑셀 다운로드.

### 3.2 용어 신청 및 승인 (Workflow)
* **신규 등록 신청:** 표준에 없는 용어 발생 시, 사용자가 시스템을 통해 신규 등록 요청.
* **검토 및 승인:** 표준화 관리자(DA/DBA)가 신청 내역을 검토하여 승인/반려 처리 (반려 시 사유 입력).
* **이력 관리:** 용어의 변경 이력(History) 자동 저장 (누가, 언제, 무엇을, 왜 변경했는지).

### 3.3 관리자 기능 (Admin)
* **표준 단어/용어/도메인 관리:**
    * **단어:** 최소 단위의 의미를 가진 단어 관리 (예: '고객', '번호').
    * **용어:** 단어의 조합으로 이루어진 표준 용어 관리 (예: '고객번호').
    * **도메인:** 데이터 타입 및 길이 표준 관리 (예: '번호'는 VARCHAR(20)).
* **품질 점검:** 표준 준수율 리포트, 중복 용어 검출 기능.

---

## 4. UI/UX 요구사항

### 4.1 메인 검색 화면 (Portal)
* **Google Style:** 화면 중앙에 대형 검색바를 배치하여 검색 기능에 집중.
* **직관적 결과:** 검색 결과 리스트에 한글명, 영문명(Full), 약어(Abbr)를 한눈에 볼 수 있도록 테이블/카드 UI 구성.
* **Quick Copy:** 영문명/약어 옆에 '복사' 아이콘을 배치하여 개발 편의성 극대화.

### 4.2 용어 신청 팝업/페이지
* **유사 용어 추천:** 신청하려는 용어 입력 시, 기존에 유사한 용어가 있는지 실시간으로 체크하여 중복 등록 방지 UX 적용.
* **가이드 제공:** 입력 필드 옆에 표준 명명 규칙(Naming Convention) 가이드를 툴팁으로 제공.

### 4.3 관리자 대시보드
* **Status Board:** '검토 대기', '승인 완료', '반려' 건수를 시각적으로 표현.
* **Bulk Edit:** 엑셀 업로드/다운로드를 통한 대량 데이터 일괄 등록 및 수정 UI (Grid 형태).

---

## 5. 데이터베이스 설계 전략 (Draft Schema)

데이터 표준화의 핵심인 단어-용어-도메인 구조를 반영합니다.

```sql
-- 1. 표준 단어 (Atomic Words)
CREATE TABLE std_word (
    word_id SERIAL PRIMARY KEY,
    logical_name VARCHAR(100) NOT NULL, -- 한글명 (예: 고객)
    physical_name VARCHAR(100) NOT NULL, -- 영문명 (예: CUST)
    definition TEXT,
    status VARCHAR(20) DEFAULT 'APPROVED'
);

-- 2. 표준 도메인 (Data Types)
CREATE TABLE std_domain (
    domain_id SERIAL PRIMARY KEY,
    domain_name VARCHAR(100) NOT NULL, -- 도메인명 (예: 번호_V20)
    data_type VARCHAR(50), -- VARCHAR
    data_length INTEGER, -- 20
    description TEXT
);

-- 3. 표준 용어 (Composite Terms)
CREATE TABLE std_term (
    term_id SERIAL PRIMARY KEY,
    logical_name VARCHAR(200) NOT NULL, -- 용어명 (예: 고객번호)
    physical_name VARCHAR(200) NOT NULL, -- 영문명 (예: CUST_NO)
    domain_id INTEGER REFERENCES std_domain(domain_id),
    status VARCHAR(20), -- REQUESTED, APPROVED, REJECTED
    requester_id VARCHAR(50),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- 4. 용어 구성 정보 (단어와 용어의 매핑 관계)
CREATE TABLE term_composition (
    term_id INTEGER REFERENCES std_term(term_id),
    word_id INTEGER REFERENCES std_word(word_id),
    order_seq INTEGER -- 단어 결합 순서
);