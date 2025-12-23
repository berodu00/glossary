# 프론트엔드 컴포넌트 설계 (Frontend Design)

## 1. 개요
본 문서는 `landing_page.PNG` 및 `용어집_제안서.pdf`를 기반으로 한 프론트엔드 UI/UX 구현 계획이다.
React Ecosystem(Vite, TypeScript, TanStack Query)과 Tailwind CSS를 사용하여 "프리미엄하고 역동적인" 디자인을 구현한다.

## 2. 기술 스택 및 라이브러리
- **Core**: React 18+, TypeScript, Vite
- **Styling**: Tailwind CSS (Glassmorphism 효과 적용)
- **State Management**: 
  - Server State: `@tanstack/react-query` (API 캐싱)
  - URL State: `react-router-dom` (검색어, 필터 상태를 URL에 동기화)
- **Icons**: `lucide-react` (모던한 선형 아이콘)
- **Animation**: `framer-motion` (부드러운 진입/전환 효과)
- **HTTP Client**: `axios`
- **Utils**: `clsx`, `tailwind-merge` (클래스 조건부 결합)

## 3. 폴더 구조 (Feature-based)
```
src/
├── components/          # 공통 UI 컴포넌트 (Button, Input, Card 등)
├── features/
│   ├── layout/          # 레이아웃 (Header, Footer)
│   ├── search/          # 검색 및 필터 기능 (Hero, FilterPanel)
│   ├── term/            # 용어 조회 및 상세 (TermList, TermCard, TermDetail)
│   └── admin/           # 관리자 기능 (추후 구현)
├── hooks/               # 커스텀 훅 (useDebounce 등)
├── api/                 # API 클라이언트 및 엔드포인트 정의
└── types/               # TypeScript 타입 정의
```

## 4. 상세 컴포넌트 설계

### 4.1. Layout (`AppLayout.tsx`)
- 전체 페이지를 감싸는 래퍼.
- **Header**: 로고(좌측), 네비게이션(북마크, 관리자) (우측).
- **Background**: 은은한 그라데이션 또는 블러 효과 배경.

### 4.2. Landing Page (`LandingPage.tsx`)
- 메인 진입 페이지. 아래 섹션들을 수직으로 배치.

#### (1) Search Hero Section (`SearchHero.tsx`)
- **디자인**: 화면 상단 중앙 배치. 큰 타이틀 ("KZ 공정용어, 어디까지...")
- **기능**:
  - 검색어 입력 (`Input`): 포커스 시 확장 애니메이션.
  - 추천 키워드 (`Chip`): "SMF", "전해제련" 등 클릭 시 자동 검색.
  - 검색 실행 시 URL Query Parameter 업데이트 (`?keyword=...`)

#### (2) Filter Panel Section (`FilterPanel.tsx`)
- **디자인**: 카드 형태의 컨테이너, 그림자 효과.
- **구성 요소**:
  - **Type Tabs**: "기본용어" vs "공정용어" 토글.
  - **Initial Filter**: 한글(ㄱ-ㅎ) / 영문(A-Z) 버튼 그리드.
  - **Process Grid**: 공정별 체크박스 (전체 선택 포함).
- **데이터**: `GET /api/v1/processes` 결과를 이용해 동적 생성.

#### (3) Term List Section (`TermList.tsx`)
- **디자인**: 1열 리스트 형태 (PC 기준).
- **기능**:
  - `useQuery`를 이용한 데이터 페칭 (`GET /api/v1/terms`).
  - 로딩 스켈레톤(Skeleton) UI 표시.
  - 결과 없음(Empty State) 표시.
  - 페이지네이션 (하단 숫자 페이징).

#### (4) Term Card (`TermCard.tsx`)
- **디자인**: 깔끔한 흰색 배경, 호버 시 살짝 떠오르는 효과(`hover:scale`).
- **내용**:
  - **Header**: 용어명(한글/영문), 북마크 아이콘(우상단).
  - **Chips**: 공정명 배지 (색상 구분).
  - **Body**: 설명 텍스트 (2줄 말줄임).
  - **Image**: 우측 썸네일 (있는 경우).
  - **Actions**: "상세보기" 버튼 또는 카드 전체 클릭 시 이동.

### 4.3. Term Detail Page (`TermDetailPage.tsx`)
- **Route**: `/terms/:id`
- **디자인**: 모달 또는 별도 페이지 (사용자 UX에 따라 결정, 현재는 페이지로 기획).
- **내용**:
  - 용어 상세 정보, 전체 이미지.
  - **Synonyms**: 유의어 목록 태그 표시.
  - **Related**: 같은 공정의 다른 용어들 (추천).

## 5. 단계별 구현 순서 (Step-by-Step)
- [x] Step 1. **환경 설정**: 패키지 설치 및 테마(폰트, 컬러) 설정.
- [x] Step 2. **레이아웃 & 헤더**: 기본 골격 구현.
- [x] Step 3. **검색 & 필터 UI**: `SearchHero`, `FilterPanel` 퍼블리싱.
- [x] Step 4. **데이터 연동**: API 호출(`axios`) 및 `SearchHero` 기능 연결.
- [x] Step 5. **리스트 & 카드 UI**: `TermList`, `TermCard` 구현 및 실제 데이터 바인딩.
- [x] Step 6. **상세 페이지**: 상세 조회 화면 구현.
