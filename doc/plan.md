docs/Plan.md
개요
본 문서는 고려아연 공정용어집 시스템 구축을 위한 단계별 작업 계획서이다. 모든 작업은 TDD 원칙을 준수하며, 각 마일스톤 완료 후 TechSpec.md와의 일치 여부를 검증한다.

Milestone 1: 프로젝트 기초 설정 및 데이터베이스 스키마
[x] Backend: Spring Boot 프로젝트 스캐폴딩 및 의존성 설정 (JPA, QueryDSL, Flyway, Validation) 


[x] Backend: Flyway를 이용한 기본 테이블 생성 마이그레이션 스크립트 작성 (processes, terms, term_process_mapping)

[x] Frontend: React(Vite) + TypeScript + Tailwind CSS 환경 설정 및 폴더 구조(Features 기반) 생성 


[x] Backend/Frontend: 공통 에러 포맷 처리를 위한 전역 핸들러 및 인터셉터 구현

Milestone 2: 공정 마스터(Process) 및 기본 도메인 구현 (TDD)
[x] Backend: Process Entity 및 Repository 테스트 및 구현 (Soft Delete 미적용 대상)

[x] Backend: Process CRUD API 구현 및 Controller 테스트 

[x] Backend: Term Entity 정의 및 초성 추출 로직(initial_ko, initial_en) 단위 테스트 및 구현

Milestone 3: 용어 검색 API 및 Soft Delete 필터링 (TDD)
[x] Backend: TermRepository 검색 쿼리 구현 (Keyword, ProcessId, Initial 필터링)

[x] Backend: [핵심] 모든 검색 및 조회 쿼리에 deleted_at IS NULL 조건 강제 적용 로직 구현

[x] Backend: GET /api/v1/terms 페이징 및 정렬 API 구현 및 통합 테스트

Milestone 4: 용어 상세 조회 및 유의어 관리
[x] Backend: term_synonyms 테이블 마이그레이션 및 Entity 연관관계 설정

[x] Backend: GET /api/v1/terms/{id} 상세 조회 API 구현 (삭제된 항목 조회 시 404 반환 포함)

[x] Backend: 관리자용 용어 수정/삭제(Soft Delete) API 구현 

Milestone 5: Frontend - 용어 검색, 필터링 및 상세 조회
[x] Frontend: 메인 검색 바 및 공정 필터링 컴포넌트 구현 (features/search) 

[x] Frontend: 한글 초성/영문 스펠링 탭 필터 UI 구현

[x] Frontend: TanStack Query를 활용한 무한 스크롤 또는 페이징 처리 

[x] Frontend: 용어 상세 페이지 및 이미지 표시 로직 (features/search-detail)

[x] Frontend: 상세 페이지 내 유의어(Synonyms) 표시 구현

Milestone 6: 용어 제안(Suggestion) 시스템 (Backend + Frontend)
[x] Backend: term_suggestions 테이블 마이그레이션 및 JSONB 필드 처리 구현

[x] Backend: POST /api/v1/suggestions 제안 등록 API 구현 (ROLE_USER)

[x] Backend: 관리자용 제안 승인/반려 API 구현 (승인 시 terms 자동 이관 로직 포함) 

[x] Frontend: 신규 용어 제안 폼 및 유효성 검사 구현 (features/suggestion)

[x] Frontend: 관리자 전용 공정 관리 및 제안 승인/반려 화면 (features/admin)

Milestone 7: 사용자 편의 기능 (북마크 및 로그)
[ ] Backend: bookmarks 테이블 구현 및 토글(등록/해제) API 구현

[ ] Backend: search_logs 기록 로직 구현 (Async 처리) 및 통계용 필터

[ ] Backend: 사용자별 최근 검색어 및 즐겨찾기 목록 조회 API

[ ] Frontend: 즐겨찾기(북마크) 버튼 및 마이페이지 연동

Milestone 8: 인증 아키텍처 (SSO/JWT)
[ ] Backend: Security 필터 설정 및 JWT 발급/검증 로직 구현

[ ] Backend: 사번 기반 로그인 및 ROLE 별 접근 제어(RBAC) 테스트

[ ] Frontend: Axios 인터셉터를 활용한 JWT 메모리 저장 및 인증 헤더 처리 

Milestone 9: 최종 통합 및 배포 준비
[ ] Frontend: 전체 모바일/태블릿 반응형 레이아웃 점검 (Tailwind CSS) 

[ ] System: 최종 통합 테스트 및 TechSpec.md 준수 여부 전수 검사

완료 조건 (Definition of Done)

모든 마일스톤의 테스트 코드가 통과한다.

deleted_at IS NULL 필터가 누락된 검색 API가 없다.

PC와 모바일에서 동일한 검색 결과가 보장된다.

모든 코드는 TechSpec.md의 데이터 규격을 준수한다.