TechSpec.md

사내 공정 용어 관리 시스템 (Responsive Web)
Version: 1.1 – Implementation Binding

1. 시스템 개요

본 시스템은 고려아연 임직원을 대상으로 사내 전문 공정 용어를 체계적으로 관리하기 위한 웹 기반 시스템이다.

공정별 전문 용어를 검색·조회·즐겨찾기 할 수 있다.

PC / Mobile 환경을 모두 지원하는 반응형 웹으로 제공한다.

임직원은 신규 용어를 제안할 수 있으며, 관리자의 승인 절차를 통해 정식 용어로 등록된다.

모든 데이터는 SSO 기반 사번 인증을 통해 접근 제어된다.

본 문서는 실제 구현 결과가 반드시 일치해야 하는 계약 문서이며, 희망사항은 포함하지 않는다.

2. 인증 및 보안 아키텍처
2.1 인증 방식

사내 SSO(IdP) 기반 OIDC 로그인을 사용한다.

로그인 흐름:

사용자는 사내 IdP에서 인증

백엔드는 IdP 토큰을 검증

백엔드는 자체 Access Token(JWT) 발급

Refresh Token은 사용하지 않는다.

Access Token 만료 시 SSO 재인증(silent renew 또는 재로그인)

2.2 권한 모델 (RBAC)
Role	권한
ROLE_USER	용어 검색, 상세 조회, 즐겨찾기, 신규 용어 제안
ROLE_ADMIN	공정 관리, 용어 승인/반려, 용어 수정
3. 기술 스택 (Tech Stack)

Language

Backend: Java 17

Frontend: TypeScript

Framework

Backend: Spring Boot 3.x (Layered Architecture)

Frontend: React 18.x

Database: PostgreSQL 15.x

Build Tool: Gradle

Migration Tool: Flyway

Styling: Tailwind CSS (Mobile-First)

4. 데이터베이스 스키마 (ERD)

모든 스키마 변경은 Flyway Migration Script로 관리한다.

4.1 processes (공정 마스터)
필드명	타입	제약	설명
id	BIGSERIAL	PK	공정 ID
name	VARCHAR(100)	NOT NULL, UNIQUE	공정 명칭
display_order	INT	DEFAULT 0	노출 순서
created_at	TIMESTAMP	DEFAULT NOW()	생성 일시
4.2 terms (용어 마스터)
필드명	타입	제약	설명
id	BIGSERIAL	PK	용어 ID
name_ko	VARCHAR(255)	NOT NULL	한글 용어명
name_en	VARCHAR(255)		영문 표기
abbreviation	VARCHAR(100)		약어
description	TEXT	NOT NULL	상세 설명
photo_url	VARCHAR(512)		이미지 경로
initial_ko	CHAR(1)	NOT NULL	초성(ㄱ~ㅎ)
created_at	TIMESTAMP	DEFAULT NOW()	생성 일시
updated_at	TIMESTAMP		수정 일시
updated_by	VARCHAR(50)		수정자 사번
deleted_at	TIMESTAMP		Soft Delete
제약 정책

동일한 name_ko는 복수 공정에서 사용 가능

용어 중복 판단은 관리자 승인 시 판단한다.

4.3 term_process_mapping (용어-공정 매핑)

| 필드명 | 타입 | 제약 |
_topics: applications of physics in sports?

We need rewrite already done. No images/entities. End.

(계속)

4.3 term_process_mapping (용어–공정 매핑)
필드명	타입	제약	설명
term_id	BIGINT	PK, FK → terms.id	용어 ID
process_id	BIGINT	PK, FK → processes.id	공정 ID
제약 및 규칙

복합 Primary Key(term_id, process_id) 사용

동일 용어–공정 매핑은 중복 불가

terms 삭제 시 매핑은 ON DELETE CASCADE

processes 삭제는 기본적으로 제한(운영자 판단 하 수동 처리)

4.4 term_synonyms (용어 유의어)
필드명	타입	제약	설명
id	BIGSERIAL	PK	ID
term_id	BIGINT	FK → terms.id	용어 ID
synonym	VARCHAR(255)	NOT NULL	유의어
4.5 term_suggestions (신규 용어 제안)
필드명	타입	제약	설명
id	BIGSERIAL	PK	제안 ID
requester_id	VARCHAR(50)	NOT NULL	제안자 사번
name_ko	VARCHAR(255)	NOT NULL	제안 용어명
description	TEXT	NOT NULL	제안 설명
process_ids	JSONB	NOT NULL	공정 ID 목록
status	VARCHAR(20)	DEFAULT 'PENDING'	PENDING / APPROVED / REJECTED
reviewer_id	VARCHAR(50)		검토자
reviewer_note	TEXT		검토 의견
approved_term_id	BIGINT	FK → terms.id	승인 후 생성된 용어
created_at	TIMESTAMP	DEFAULT NOW()	생성 일시
reviewed_at	TIMESTAMP		처리 일시
4.6 bookmarks
필드명	타입	제약
user_id	VARCHAR(50)	PK
term_id	BIGINT	PK, FK
4.7 search_logs
필드명	타입	설명
user_id	VARCHAR(50)	사용자 사번
query	VARCHAR(255)	검색어
created_at	TIMESTAMP	검색 시각
운영 정책

로그 보관 기간: 180일

통계 목적 외 접근 제한

5. API 명세
5.1 공통 에러 포맷
{
  "code": "STRING_CODE",
  "message": "Human readable message"
}

5.2 용어 검색 (GET /api/v1/terms)
Request Params

keyword (optional)

processIds (optional, multiple)

initial (optional)

page (default 0)

size (default 20)

sort (name_ko, created_at)

Response
{
  "items": [
    {
      "id": 1,
      "name_ko": "배소",
      "name_en": "Roasting",
      "processes": ["제련"]
    }
  ],
  "pageInfo": {
    "page": 0,
    "size": 20,
    "total": 120
  }
}

5.3 용어 상세 조회 (GET /api/v1/terms/{id})

Response: Term 전체 정보 + 공정 + 유의어

5.4 신규 용어 제안 (POST /api/v1/suggestions)
{
  "name_ko": "신규용어",
  "description": "설명",
  "process_ids": [1, 2]
}

6. 관리자(Admin) 기능

공정 마스터 CRUD

용어 제안 승인/반려

승인 시:

terms 생성

term_process_mapping 생성

term_suggestions.approved_term_id 기록

모든 관리자 작업은 reviewer_id, reviewed_at 기록

7. 프론트엔드 아키텍처

Feature-based 구조

features/search

features/admin

features/bookmark

데이터 패칭:

TanStack Query 기반

인증:

JWT 메모리 저장

반응형:

Tailwind CSS (Mobile-First)

8. 비기능 요구사항

평균 검색 응답 시간 < 500ms

DB Full-Text Search + 인덱스 사용

모든 API는 인증 필수

9. 범위 외 (Out of Scope)

다국어 UI

Refresh Token

외부 시스템 공개 API

결론

본 문서는 개발자 간 해석 차이를 제거한 실행 계약 문서이며,
본 문서 기준을 벗어나는 구현은 결함으로 간주한다.