# 🚀 온채움랩 백엔드 개발 — 단계별 개발 프롬프트

> **사용법**: 아래 STEP 1부터 순서대로 프롬프트를 AI에게 전달하세요.
> 각 단계가 완성되고 검증된 후에 다음 단계로 넘어갑니다.
> 한 번에 하나의 STEP만 진행합니다.

---

## 📌 현재 프로젝트 상태 요약 (참고 정보)

| 항목 | 현재 상태 |
| --- | --- |
| **프레임워크** | React 19 + Vite 6 + TailwindCSS 4 |
| **Contact 폼** | `Contact.tsx` — `handleSubmit`이 데모 alert만 표시 (DB 미연결) |
| **Portfolio** | `src/data/portfolio.ts` — 6건 하드코딩, picsum 이미지 사용 |
| **FAQ** | `FAQ.tsx` — 4건 하드코딩 배열 |
| **Reviews** | `Reviews.tsx` — 6건 하드코딩 배열 |
| **기존 서버** | Express 패키지 설치되어 있으나 별도 서버 파일 없음 |

---

## STEP 1. Supabase 프로젝트 생성 및 데이터베이스 테이블 구축

### 프롬프트

```
온채움랩 프로젝트에 Supabase를 백엔드로 연동하려고 합니다.
아래 4개 테이블을 Supabase 데이터베이스에 생성해 주세요.

1. inquiries (고객 문의)
   - id (uuid, PK, auto)
   - name (text, NOT NULL) — 이름/기업명
   - phone (text, NOT NULL) — 연락처
   - email (text, NOT NULL) — 이메일
   - budget (text) — 예산 범위
   - message (text, NOT NULL) — 문의 내용
   - status (text, default 'PENDING') — 상태 (PENDING, IN_PROGRESS, RESOLVED)
   - created_at (timestamptz, default now())

2. portfolios (포트폴리오)
   - id (uuid, PK, auto)
   - title (text, NOT NULL)
   - description (text)
   - category (text, NOT NULL) — '랜딩페이지', '기업&사업', '쇼핑몰', 'UX/UI디자인'
   - thumbnail_url (text)
   - detail_image_url (text)
   - is_visible (boolean, default true)
   - sort_order (integer, default 0)
   - created_at (timestamptz, default now())

3. reviews (고객 리뷰)
   - id (uuid, PK, auto)
   - content (text, NOT NULL) — 리뷰 내용
   - author (text, NOT NULL) — 작성자
   - project (text) — 프로젝트명
   - rating (integer, default 5)
   - is_visible (boolean, default true)
   - created_at (timestamptz, default now())

4. faqs (자주 묻는 질문)
   - id (uuid, PK, auto)
   - question (text, NOT NULL)
   - answer (text, NOT NULL)
   - order_index (integer, default 0)
   - is_visible (boolean, default true)
   - created_at (timestamptz, default now())

각 테이블에 RLS(Row Level Security) 정책도 설정해 주세요:
- inquiries: 누구나 INSERT 가능, SELECT/UPDATE/DELETE는 인증된 사용자만
- portfolios, reviews, faqs: 누구나 is_visible=true인 행 SELECT 가능, INSERT/UPDATE/DELETE는 인증된 사용자만

현재 하드코딩되어 있는 데이터도 초기 데이터(seed)로 넣어 주세요:
- portfolios 6건 (src/data/portfolio.ts 참고)
- faqs 4건 (src/components/FAQ.tsx 참고)
- reviews 6건 (src/components/Reviews.tsx 참고)
```

### ✅ 완료 확인 기준
- [ ] Supabase 대시보드에서 4개 테이블이 생성되어 있음
- [ ] RLS 정책이 각 테이블에 적용되어 있음
- [ ] 초기 데이터(seed)가 정상 삽입되어 있음

---

## STEP 2. Supabase 클라이언트 연동 및 환경변수 설정

### 프롬프트

```
온채움랩 프로젝트(React + Vite)에 Supabase 클라이언트를 연동해 주세요.

1. @supabase/supabase-js 패키지를 설치해 주세요.

2. src/lib/supabase.ts 파일을 새로 만들어서 Supabase 클라이언트를 초기화하는 코드를 작성해 주세요.
   - 환경변수 VITE_SUPABASE_URL과 VITE_SUPABASE_ANON_KEY를 사용합니다.

3. .env.local 파일에 실제 Supabase 프로젝트의 URL과 anon key를 설정합니다.
   (Supabase 대시보드 > Settings > API에서 확인 가능)

4. .env.example 파일도 업데이트해서 어떤 환경변수가 필요한지 문서화해 주세요.

5. .gitignore에 .env.local이 포함되어 있는지 확인해 주세요.

6. Supabase에서 TypeScript 타입을 생성해서 src/types/database.types.ts 파일로 저장해 주세요.

현재 프로젝트 경로: c:\Users\hjtok\Documents\바이브코딩\onchaeumlab
```

### ✅ 완료 확인 기준
- [ ] `@supabase/supabase-js` 패키지 설치 완료
- [ ] `src/lib/supabase.ts` 파일 생성되어 있음
- [ ] `.env.local` 파일에 Supabase URL/Key 설정됨
- [ ] 로컬 서버(`npm run dev`)를 실행했을 때 에러 없이 구동됨

---

## STEP 3. Contact 폼 — Supabase 연동 (문의 접수 기능)

### 프롬프트

```
온채움랩의 Contact 문의 폼을 Supabase DB에 연동해 주세요.

현재 상태:
- src/components/Contact.tsx 파일에 문의 폼이 있습니다.
- handleSubmit 함수가 현재는 alert('문의가 성공적으로 접수되었습니다. (현재는 데모 상태입니다.)') 로만 되어 있습니다.
- 폼 필드: name, phone, email, budget, message

변경 요청:
1. handleSubmit 함수를 수정하여 Supabase의 inquiries 테이블에 데이터를 INSERT 하도록 바꿔 주세요.

2. 사용자 피드백 UX를 개선해 주세요:
   - 전송 중일 때: 버튼에 로딩 스피너를 표시하고 버튼 비활성화
   - 전송 성공 시: 성공 모달 또는 토스트 메시지 표시
   - 전송 실패 시: 에러 메시지 표시

3. 폼 유효성 검증(validation)도 추가해 주세요:
   - 이메일 형식 확인
   - 전화번호 형식 확인 (한국 번호)
   - 필수 필드 비어있으면 안 됨

4. 기존 디자인과 스타일은 그대로 유지해 주세요.
   - TailwindCSS 클래스 기반 스타일
   - motion(framer-motion) 애니메이션 유지

src/lib/supabase.ts에 있는 Supabase 클라이언트를 import 해서 사용해 주세요.
```

### ✅ 완료 확인 기준
- [ ] 폼 작성 후 "문의 보내기" 클릭 시 Supabase inquiries 테이블에 데이터 저장됨
- [ ] Supabase 대시보드 Table Editor에서 새로 추가된 행 확인 가능
- [ ] 로딩/성공/에러 UX가 정상 동작함
- [ ] 유효성 검증이 작동함 (잘못된 이메일, 빈 필드 등)

---

## STEP 4. Portfolio 섹션 — DB 데이터 동적 렌더링

### 프롬프트

```
온채움랩의 Portfolio 섹션을 하드코딩된 데이터 대신 Supabase에서 불러오도록 변경해 주세요.

현재 상태:
- src/data/portfolio.ts 파일에 portfolioData 배열이 하드코딩되어 있음 (6건)
- src/components/Portfolio.tsx에서 이 데이터를 import 해서 렌더링 중

변경 요청:
1. Portfolio.tsx 컴포넌트를 수정하여 Supabase의 portfolios 테이블에서 데이터를 fetch하도록 해 주세요.
   - is_visible이 true인 것만 가져옵니다
   - sort_order 순으로 정렬합니다
   - useEffect + useState로 로딩 처리해 주세요

2. 데이터 로딩 중에는 스켈레톤(Skeleton) UI를 표시해 주세요.
   - 기존 카드 레이아웃과 동일한 크기의 애니메이션 플레이스홀더

3. 데이터가 없을 때의 빈 상태(Empty State) UI도 추가해 주세요.

4. 카테고리 필터(탭)는 DB에서 가져온 데이터의 category 값을 기반으로 동적 생성합니다.
   - '전체' 탭은 항상 첫 번째로 유지

5. 기존 디자인, 애니메이션(framer-motion), 모달 기능은 모두 그대로 유지해 주세요.

6. src/data/portfolio.ts의 PortfolioItem 인터페이스는 Supabase 타입으로 교체합니다.
```

### ✅ 완료 확인 기준
- [ ] Portfolio 섹션이 Supabase에서 데이터를 불러와 정상 렌더링됨
- [ ] 카테고리 필터가 정상 동작함
- [ ] 포트폴리오 상세 모달이 정상 작동함
- [ ] 로딩 중 스켈레톤 UI가 표시됨
- [ ] Supabase에서 데이터 수정 시 새로고침하면 반영됨

---

## STEP 5. FAQ 섹션 — DB 데이터 동적 렌더링

### 프롬프트

```
온채움랩의 FAQ 섹션을 Supabase에서 데이터를 불러오도록 변경해 주세요.

현재 상태:
- src/components/FAQ.tsx 파일에 faqs 배열이 4건 하드코딩되어 있음

변경 요청:
1. FAQ.tsx를 수정하여 Supabase의 faqs 테이블에서 데이터를 fetch하도록 해 주세요.
   - is_visible이 true인 것만 가져옵니다
   - order_index 순으로 정렬합니다

2. 로딩 중 스켈레톤 UI를 추가해 주세요.
   - FAQ 아코디언 아이템과 유사한 형태의 플레이스홀더

3. 기존 디자인(아코디언 형태, 열고 닫기, Q/A 표시)과 애니메이션을 모두 유지해 주세요.

4. 하단의 "원하시는 답변을 찾지 못하셨나요?" 배너 영역도 그대로 유지합니다.
```

### ✅ 완료 확인 기준
- [ ] FAQ 섹션이 Supabase에서 데이터를 불러와 렌더링됨
- [ ] 아코디언 열고 닫기가 정상 동작함
- [ ] order_index 순서대로 정렬되어 표시됨
- [ ] Supabase에서 FAQ 추가/수정 시 새로고침으로 반영됨

---

## STEP 6. Reviews 섹션 — DB 데이터 동적 렌더링

### 프롬프트

```
온채움랩의 Reviews(고객 리뷰) 섹션을 Supabase에서 데이터를 불러오도록 변경해 주세요.

현재 상태:
- src/components/Reviews.tsx 파일에 reviews 배열이 6건, metrics 배열이 3건 하드코딩

변경 요청:
1. reviews 데이터를 Supabase의 reviews 테이블에서 fetch하도록 변경합니다.
   - is_visible이 true인 것만 가져옵니다
   - created_at 내림차순으로 정렬

2. metrics 배열(10years+, 95%, @ + 카드 3개)은 하드코딩 그대로 유지합니다.
   (이 부분은 정적 콘텐츠이므로 DB 연동 불필요)

3. 데스크톱 마키 애니메이션과 모바일 스와이프 캐러셀 모두 기존 동작을 유지합니다.

4. 로딩 중에는 리뷰 카드 영역에 스켈레톤을 표시합니다.

5. 리뷰가 없을 때의 빈 상태 UI도 추가해 주세요.
```

### ✅ 완료 확인 기준
- [ ] Reviews 섹션이 Supabase에서 리뷰 데이터를 불러와 렌더링됨
- [ ] 데스크톱 마키 애니메이션이 정상 동작함
- [ ] 모바일 캐러셀이 정상 동작함
- [ ] Supabase에서 리뷰 추가/수정 시 반영됨

---

## STEP 7. 관리자 인증 시스템 구축

### 프롬프트

```
온채움랩에 관리자 로그인 시스템을 구축해 주세요. Supabase Auth를 사용합니다.

1. 관리자 로그인 페이지를 만들어 주세요.
   - 경로: /admin/login
   - 이메일 + 비밀번호 방식
   - 온채움랩 브랜드에 맞는 깔끔한 로그인 UI
   - 로그인 성공 시 /admin/dashboard로 이동
   - 로그인 실패 시 에러 메시지 표시

2. 인증 상태 관리를 위한 AuthContext를 만들어 주세요.
   - src/contexts/AuthContext.tsx
   - 로그인/로그아웃 함수 제공
   - 현재 사용자 정보 제공

3. ProtectedRoute 컴포넌트를 만들어 주세요.
   - 인증되지 않은 사용자는 /admin/login으로 리다이렉트

4. React Router를 설치하고 라우팅을 설정해 주세요.
   - / : 기존 랜딩페이지 (App.tsx)
   - /admin/login : 관리자 로그인
   - /admin/* : 관리자 페이지 (인증 필요)

5. Supabase에 관리자 계정 1개를 생성하는 방법을 안내해 주세요.

현재 App.tsx에는 라우터 없이 컴포넌트들이 바로 렌더링되고 있습니다.
기존 랜딩페이지 동작에 영향이 없도록 해 주세요.
```

### ✅ 완료 확인 기준
- [ ] /admin/login 접속 시 로그인 페이지가 표시됨
- [ ] 로그인 성공 시 /admin/dashboard로 이동
- [ ] 비로그인 상태에서 /admin/dashboard 접근 시 로그인 페이지로 리다이렉트
- [ ] 기존 랜딩페이지( / )가 정상 동작함

---

## STEP 8. 관리자 대시보드 — 문의 내역 관리

### 프롬프트

```
온채움랩 관리자 대시보드의 문의 내역 관리 페이지를 만들어 주세요.

1. 대시보드 메인 (/admin/dashboard)
   - 사이드바 네비게이션: 대시보드, 문의관리, 포트폴리오, FAQ, 리뷰, 로그아웃
   - 대시보드 요약 카드:
     - 전체 문의 수
     - 대기 중(PENDING) 문의 수
     - 진행 중(IN_PROGRESS) 문의 수
     - 이번 달 문의 수
   - 최근 문의 5건 미리보기 리스트

2. 문의 관리 페이지 (/admin/inquiries)
   - 전체 문의 목록을 테이블로 표시
   - 컬럼: 이름, 연락처, 이메일, 예산, 상태, 접수일
   - 상태별 필터 (전체/대기/진행중/완료)
   - 각 문의를 클릭하면 상세 내용 모달 표시
   - 상태 변경 기능 (드롭다운으로 PENDING → IN_PROGRESS → RESOLVED)
   - 문의 삭제 기능 (확인 모달 포함)

3. UI 스타일:
   - 깔끔한 관리자 UI (다크 사이드바 + 밝은 콘텐츠 영역)
   - 반응형 (모바일에서는 사이드바 접이식)
   - 상태별 뱃지 색상 구분 (대기:노랑, 진행:파랑, 완료:초록)

Supabase 클라이언트를 사용하여 데이터를 가져오고 업데이트해 주세요.
```

### ✅ 완료 확인 기준
- [ ] /admin/dashboard에서 요약 카드와 최근 문의가 표시됨
- [ ] /admin/inquiries에서 전체 문의 목록이 테이블로 표시됨
- [ ] 상태 변경(PENDING → IN_PROGRESS → RESOLVED)이 정상 동작
- [ ] 필터링이 정상 동작
- [ ] 삭제 기능이 정상 동작

---

## STEP 9. 관리자 대시보드 — 포트폴리오/FAQ/리뷰 CRUD

### 프롬프트

```
온채움랩 관리자 대시보드에 다음 3개 관리 페이지를 추가해 주세요.

### 1. 포트폴리오 관리 (/admin/portfolios)
- 포트폴리오 목록 (카드형태 또는 테이블)
- 새 포트폴리오 추가 폼: 제목, 설명, 카테고리(드롭다운), 썸네일URL, 상세이미지URL, 노출여부, 정렬순서
- 수정/삭제 기능
- 노출여부(is_visible) 토글 스위치
- 드래그 앤 드롭 또는 숫자 입력으로 순서 변경 가능

### 2. FAQ 관리 (/admin/faqs)
- FAQ 목록 (순서대로)
- 새 FAQ 추가 폼: 질문, 답변, 순서, 노출여부
- 수정/삭제 기능
- 순서(order_index) 변경 기능

### 3. 리뷰 관리 (/admin/reviews)
- 리뷰 목록
- 새 리뷰 추가 폼: 내용, 작성자, 프로젝트명, 별점(1~5), 노출여부
- 수정/삭제 기능

공통 사항:
- 각 폼은 모달 또는 별도 페이지로 구현
- 저장/삭제 시 확인 모달 표시
- 성공/실패 토스트 메시지
- STEP 8에서 만든 관리자 레이아웃(사이드바)을 그대로 사용

Supabase 클라이언트를 사용하여 CRUD 구현해 주세요.
```

### ✅ 완료 확인 기준
- [ ] 포트폴리오 추가/수정/삭제가 정상 동작하며 프론트에 반영됨
- [ ] FAQ 추가/수정/삭제가 정상 동작하며 프론트에 반영됨
- [ ] 리뷰 추가/수정/삭제가 정상 동작하며 프론트에 반영됨
- [ ] 노출여부 토글이 즉시 반영됨

---

## STEP 10. 문의 접수 알림 기능 (이메일 / 웹훅)

### 프롬프트

```
온채움랩에 새로운 문의가 접수되면 관리자에게 알림을 보내는 기능을 구현해 주세요.

옵션 A — Supabase Edge Function + 이메일 알림:
1. Supabase Edge Function을 만들어서 inquiries 테이블에 새 행이 INSERT 되면 트리거됩니다.
2. Resend 또는 SendGrid API를 사용하여 관리자 이메일(ceo@onchaeumlab.co.kr)로 알림을 보냅니다.
3. 이메일 내용: 고객 이름, 연락처, 이메일, 예산, 문의 내용 요약

옵션 B — 카카오톡 알림 (대안):
1. 카카오 알림톡 API 연동이 가능하다면 카카오톡으로 알림을 보내는 것도 검토해 주세요.

우선 옵션 A(이메일 알림)를 먼저 구현해 주세요.
Supabase Database Webhook + Edge Function 조합으로 구현합니다.
```

### ✅ 완료 확인 기준
- [ ] 문의 폼 제출 시 관리자 이메일로 알림이 도착함
- [ ] 이메일 내용에 문의 정보가 정확하게 포함됨
- [ ] Edge Function 로그에서 정상 실행 확인

---

## 🗂 전체 진행 체크리스트

| STEP | 내용 | 상태 |
| --- | --- | --- |
| 1 | Supabase 테이블 생성 + 시드 데이터 | ⬜ |
| 2 | Supabase 클라이언트 연동 + 환경변수 | ⬜ |
| 3 | Contact 폼 → DB 저장 연동 | ⬜ |
| 4 | Portfolio → DB 동적 렌더링 | ⬜ |
| 5 | FAQ → DB 동적 렌더링 | ⬜ |
| 6 | Reviews → DB 동적 렌더링 | ⬜ |
| 7 | 관리자 인증 (로그인/라우팅) | ⬜ |
| 8 | 관리자 대시보드 (문의 관리) | ⬜ |
| 9 | 관리자 CRUD (포트폴리오/FAQ/리뷰) | ⬜ |
| 10 | 문의 알림 (이메일/웹훅) | ⬜ |
