
# TechSpec.md

**사내 공정 용어 관리 시스템 (Responsive Web)** **Version: 1.2 – Implementation Binding**

## 1. 시스템 개요

본 시스템은 고려아연 임직원을 대상으로 사내 전문 공정 용어를 체계적으로 관리하기 위한 웹 기반 시스템이다.

* 공정별 전문 용어를 검색·조회·즐겨찾기 할 수 있다.
* PC / Mobile 환경을 모두 지원하는 반응형 웹으로 제공한다.
* 임직원은 신규 용어를 제안할 수 있으며, 관리자의 승인 절차를 통해 정식 용어로 등록된다.
* 모든 데이터는 SSO 기반 사번 인증을 통해 접근 제어된다.
* **본 문서는 실제 구현 결과가 반드시 일치해야 하는 계약 문서이며, 희망사항은 포함하지 않는다.**

## 2. 인증 및 보안 아키텍처

### 2.1 인증 방식

* 사내 SSO(IdP) 기반 OIDC 로그인을 사용한다.
* 로그인 흐름:
1. 사용자는 사내 IdP에서 인증
2. 백엔드는 IdP 토큰을 검증
3. 백엔드는 자체 Access Token(JWT) 발급
4. Refresh Token은 사용하지 않는다. (Access Token 만료 시 SSO 재인증)
5. **Dev Environment Exception**: 로컬 개발 및 테스트 환경에서는 IdP 연동 대신 `POST /api/v1/auth/dev-login`을 통해 JWT를 발급받는 모의 인증을 허용한다. 단, 발급되는 JWT 구조는 운영 환경과 동일해야 한다.



### 2.2 권한 모델 (RBAC)

| Role | 권한 |
| --- | --- |
| **ROLE_USER** | 용어 검색, 상세 조회, 즐겨찾기, 신규 용어 제안 |
| **ROLE_ADMIN** | 공정 관리, 용어 승인/반려, 용어 수정 |

## 3. 기술 스택 (Tech Stack)

* **Language**: Backend (Java 17), Frontend (TypeScript)
* **Framework**: Backend (Spring Boot 3.x), Frontend (React 18.x)
* **Database**: PostgreSQL 15.x
* **Build Tool**: Gradle
* **Migration Tool**: Flyway
* **Styling**: Tailwind CSS (Mobile-First)

## 4. 데이터베이스 스키마 (ERD)

모든 스키마 변경은 Flyway Migration Script로 관리한다.
* **Note (v1.2)**: Milestone 9에서 초기 마이그레이션 스크립트(`V1__init_schema.sql`)를 최종 엔티티 정의에 맞춰 통합(Consolidation)하였다.
* Dev 환경에서는 `DevDataSeeder`를 통해 서버 시작 시 기본 데이터(공정, 용어)가 자동 적재된다.

### 4.1 processes (공정 마스터)

| 필드명 | 타입 | 제약 | 설명 |
| --- | --- | --- | --- |
| id | BIGSERIAL | PK | 공정 ID |
| name | VARCHAR(100) | NOT NULL, UNIQUE | 공정 명칭 |
| display_order | INT | DEFAULT 0 | 노출 순서 |
| created_at | TIMESTAMP | DEFAULT NOW() | 생성 일시 |

### 4.2 terms (용어 마스터)

| 필드명 | 타입 | 제약 | 설명 |
| --- | --- | --- | --- |
| id | BIGSERIAL | PK | 용어 ID |
| name_ko | VARCHAR(255) | NOT NULL | 한글 용어명 |
| name_en | VARCHAR(255) |  | 영문 표기 |
| abbreviation | VARCHAR(100) |  | 약어 |
| description | TEXT | NOT NULL | 상세 설명 |
| photo_url | VARCHAR(512) |  | 이미지 경로 |
| **initial_ko** | CHAR(1) | NOT NULL | 한글 초성 (ㄱ~ㅎ) |
| **initial_en** | CHAR(1) | NOT NULL | 영문 초성 (A~Z, 대문자 저장) |
| **name_jamo** | VARCHAR(255) |  | 한글 자모 분리 (예: ㅌㅔㅅㅡㅌㅡ) - **V2 Added** |
| **name_initials** | VARCHAR(255) |  | 한글 초성 전체 (예: ㅌㅅㅌ) - **V2 Added** |
| created_at | TIMESTAMP | DEFAULT NOW() | 생성 일시 |
| updated_at | TIMESTAMP |  | 수정 일시 |
| updated_by | VARCHAR(50) |  | 수정자 사번 |
| **deleted_at** | TIMESTAMP |  | Soft Delete 처리용 시각 |

### 4.3 term_process_mapping (용어-공정 매핑)

| 필드명 | 타입 | 제약 | 설명 |
| --- | --- | --- | --- |
| term_id | BIGINT | PK, FK → terms.id | 용어 ID |
| process_id | BIGINT | PK, FK → processes.id | 공정 ID |

### 4.4 term_synonyms (용어 유의어)

| 필드명 | 타입 | 제약 | 설명 |
| --- | --- | --- | --- |
| id | BIGSERIAL | PK | ID |
| term_id | BIGINT | FK → terms.id | 용어 ID |
| synonym | VARCHAR(255) | NOT NULL | 유의어 |

### 4.5 term_suggestions (신규 용어 제안)

### 4.5 term_suggestions (신규 용어 제안)

| 필드명 | 타입 | 제약 | 설명 |
| --- | --- | --- | --- |
| id | BIGSERIAL | PK | 제안 ID |
| requester_id | VARCHAR(50) | NOT NULL | 제안자 사번 |
| name_ko | VARCHAR(255) | NOT NULL | 제안 용어명(한글) |
| name_en | VARCHAR(255) |  | 제안 용어명(영문) |
| description | TEXT | NOT NULL | 제안 설명 |
| status | VARCHAR(20) | DEFAULT 'PENDING' | 상태 (PENDING, APPROVED, REJECTED) |
| process_id | BIGINT |  | 매핑 공정 ID (Optional) |
| created_at | TIMESTAMP | DEFAULT NOW() | 신청 일시 |
| reviewed_at | TIMESTAMP |  | 처리 일시 |
| reviewer_note | TEXT |  | 반려/승인 사유 |

* 승인 시 `terms` 테이블로 이관되며, `initial_ko`, `initial_en`은 시스템이 자동 생성한다.

### 4.6 bookmarks & 4.7 search_logs

(기존 명세 유지)

## 5. API 명세

### 5.1 공통 에러 포맷

```json
{
  "code": "STRING_CODE",
  "message": "Human readable message"
}

```

### 5.2 용어 검색 (GET /api/v1/terms)

* **Request Params**:
* `keyword`: 검색어
* `processIds`: 다중 공정 필터
* `initial`: 초성 필터 (한글 ㄱ~ㅎ 또는 영문 A~Z)
* `page`, `size`, `sort`


* **구현 규칙**: **모든 검색 쿼리는 `deleted_at IS NULL` 조건을 기본으로 포함한다.**
* **고급 검색 (Jamo Search)**:
    * 검색어가 모두 자음(초성)으로만 구성된 경우 `name_initials` 컬럼을 검색한다. (예: 'ㅌㅅㅌ' -> '테스트')
    * 그 외의 경우 `name_ko` OR `name_jamo` OR `name_en` OR `abbreviation`을 검색한다. (예: 'ㅌ' -> '테스트', '테스' -> '테스트')

### 5.3 용어 상세 조회 (GET /api/v1/terms/{id})

* **Response**: Term 상세 정보 (processes: List<{id, name}> 포함)
* **구현 규칙**: 요청된 ID의 데이터가 `deleted_at`이 NULL이 아닌 경우 404 에러를 반환한다.

## 6. 관리자(Admin) 기능

### 6.1 제안 관리
* **목록 조회**: 대기 중(PENDING)인 제안 목록을 조회한다.
* **상세 보기 (Modal)**: 
    * 리스트의 항목 클릭 시 모달(Modal) 팝업을 통해 상세 정보를 제공한다.
    * 포함 정보: 용어명(한/영), 설명, 이미지, 신청자 정보, 신청일.
* **승인/반려**:
    * 모달 하단에서 승인(Approve) 또는 반려(Reject) 처리를 수행한다.
    * 반려 시 반려 사유(Reason)를 입력받는다.

(기존 명세 유지: 공정 마스터 CRUD)

## 7. 프론트엔드 아키텍처

* **Feature-based 구조**: features/search, features/admin, features/bookmark
* **데이터 패칭**: TanStack Query 기반
* **반응형**: Tailwind CSS (Mobile-First)

## 8. 비기능 및 구현 원칙

* **평균 검색 응답 시간 < 500ms** (initial_ko, initial_en 인덱스 활용)
* **Soft Delete 필터링**: 모든 API 수준 및 비즈니스 로직에서 삭제된 데이터(deleted_at NOT NULL)는 조회 대상에서 제외한다.
* **영문 초성 자동화**: 용어 등록 및 수정 시 `name_en`의 첫 글자를 추출하여 `initial_en` 필드에 대문자로 자동 저장한다.
* 모든 API는 인증 필수.

## 9. 범위 외 (Out of Scope)

* 다국어 UI, Refresh Token, 외부 시스템 공개 API

---

**결론**: 본 문서는 영문 초성 검색의 성능 최적화와 데이터 무결성(Soft Delete)을 보장하기 위한 구체적 설계를 포함하며, 이를 벗어나는 구현은 허용되지 않는다.