# 온채움랩 백엔드 개발 기획서 (Backend Development Plan)

## 1. 개요 및 목표
현재 정적(Static) 프론트엔드로 구성된 온채움랩 랜딩 페이지를 동적(Dynamic) 웹 애플리케이션으로 고도화합니다. 주요 목표는 고객 문의(Contact)를 데이터베이스에 안전하게 저장하고, 포트폴리오(Portfolio), 자주 묻는 질문(FAQ) 등을 관리자가 직접 등록/수정/삭제할 수 있는 **관리자 통합 시스템(Admin Panel) 및 기반 API**를 구축하는 것입니다.

## 2. 추천 시스템 아키텍처 및 기술 스택
기존 프론트엔드(`React` + `Vite`) 구조를 최대한 유지하면서 빠르고 안정적으로 백엔드를 추가하는 방안입니다.

- **백엔드 프레임워크**: Node.js + Express.js
- **데이터베이스**: PostgreSQL (또는 MySQL)
- **인증(Auth)**: JWT (JSON Web Token) 기반 관리자 인증
- **이메일/알림 연동**: Nodemailer 또는 서드파티 API(SendGrid, AWS SES)를 사용하여 문의 접수 시 자동 안내 및 관리자 알림 발송
- **파일 스토리지 (옵션)**: AWS S3 (포트폴리오 업로드 및 이미지 서빙)
- *(대안안)* **BaaS 활용**: Node.js 서버구축 없이 빠르게 런칭하려면 Supabase나 Firebase를 연동하는 방법도 탁월한 선택입니다.

## 3. 주요 기능 명세 (Requirement Details)

### 3.1. 고객 문의 내역(Contact) 관리
- 사용자가 웹사이트의 폼(이름, 연락처, 이메일, 예산, 내용)을 작성해 제출하면 DB에 안전하게 저장
- 저장과 동시에 지정된 관리자 이메일, 혹은 슬랙/카카오톡 등 업무 메신저로 알림 전송 기능 구현
- 관리자는 상태값 변경 가능 (예: 대기, 진행중, 완료 등)

### 3.2. 포트폴리오(Portfolio) & 고객 리뷰(Reviews) 관리
- 코드를 수정할 필요 없이, 관리자가 관리자 웹페이지 내에서 진행한 프로젝트(포트폴리오) 정보를 등록
- 썸네일 이미지, 클라이언트 정보, 결과물 링크 등 수정/삭제 기능
- 리뷰 섹션에 노출할 실제 고객 피드백도 데이터 기반으로 노출

### 3.3. 관리자 시스템 (Admin Panel)
- 관리자 외에는 접근 불가한 프라이빗 라우팅 적용
- 최신 문의사항 및 사이트 통계를 한눈에 볼 수 있는 대시보드 제공
- 각 데이터(게시물, 문의내역 등)의 목록/상세보기/생성/수정/삭제 인터페이스

## 4. 데이터베이스 스키마 설계 (Draft)

**1. `Admin` (관리자 계정)**
- `id` (PK, UUID)
- `username` (계정명)
- `password_hash` (암호화된 비밀번호)
- `created_at` (생성일시)

**2. `Inquiry` (고객 문의내역)**
- `id` (PK)
- `name` (이름/기업명)
- `phone` (연락처)
- `email` (고객 이메일)
- `budget` (서비스 예산)
- `message` (문의 내용)
- `status` (상태값: PENDING, IN_PROGRESS, RESOLVED)
- `created_at` (문의 발생일시)

**3. `Portfolio` (웹사이트 포트폴리오 노출용)**
- `id` (PK)
- `title` (프로젝트 제목)
- `description` (프로젝트 설명)
- `image_url` (이미지 주소)
- `category` (디자인/개발 등 카테고리)
- `is_visible` (Boolean, 화면 노출 여부 제한용)
- `created_at`

**4. `FAQ` (자주 묻는 질문)**
- `id` (PK)
- `question` (질문)
- `answer` (답변)
- `order_index` (노출 순서)

## 5. RESTful API 엔드포인트 아키텍처 (기본)

| HTTP Method | API Endpoint | 기능 설명 (Description) | 접근 권한(Auth) |
| --- | --- | --- | --- |
| **POST** | `/api/inquiries` | 새로운 고객 문의 등록 (Client -> DB) | 제한 없음 |
| **GET** | `/api/inquiries` | 전체 고객 문의 내역 리스트 조회 | **관리자 전용** |
| **PATCH**| `/api/inquiries/:id` | 특정 문의 내역의 상태 값(status) 업데이트 | **관리자 전용** |
| **GET** | `/api/portfolios` | 서비스 등록 포트폴리오 전체 조회 (사이트 렌더링 용) | 제한 없음 |
| **POST** | `/api/portfolios` | 새로운 포트폴리오 생성/등록 | **관리자 전용** |
| **PUT/DEL** | `/api/portfolios/:id`| 특정 포트폴리오 정보 수정 혹은 삭제 | **관리자 전용** |
| **POST** | `/api/admin/login` | 관리자 로그인 및 인증 토큰(JWT) 발급 | 제한 없음 |

## 6. 개발 로드맵 단계 및 수행 가이드 (Action Plan)

### Step 1. 백엔드 프로젝트 초기 세팅 및 DB 구축
- `server` 폴더(Node.js + Express) 스캐폴딩 설정
- RDBMS 서버 준비 및 위 설계에 맞게 테이블 셋업

### Step 2. API 개발 및 기능 중심 구현
- 문의 폼을 받아 DB에 꽂아주는 핵심 로직 API부터 구현 완성
- Nodemailer 등을 활용해 이메일 알림 기능 연동 (실제 메일함으로 전송되는지 확인)
- 포트폴리오/리뷰 관리를 위한 CRUD 개발과 인증/보안 계층 활성화

### Step 3. 프론트엔드 연동 및 통합 테스트
- React의 `Contact.tsx` 등을 수정하여 `fetch()` 또는 `axios`를 통해 생성된 `/api/inquiries` API를 연결
- 실제 Form 데이터를 백엔드에 전송 후 결과에 따른 알림, UX/UI 모달 피드백 구축
- 프론트엔드의 하드 코딩되어있던 FAQ/포트폴리오 섹션을 백엔드에서 불러온 데이터로 동적 렌더링되게 수정

### Step 4. 관리자 페이지(Admin Dashboard) 작업
- 내부 팀원들 전용 어드민 페이지 개발 (예: `/admin` 라우트).
- React 내부나 별도의 경량 대시보드로 구성
- 인증 시에만 페이지가 보이며 저장된 내역을 보고 관리할 수 있게 개발

### Step 5. 실 운영 환경 배포
- 백엔드를 안정적인 서버(AWS, Vercel, Render 등)에 배포하고, 프론트엔드와 연결 완료
