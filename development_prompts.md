# 🚀 안티그래피티(Anti-Graffiti) 단계별 개발 프롬프트 가이드

이 문서는 백엔드 전체를 한 번에 개발하는 대신, 기능별로 나누어 **점진적으로(Step-by-Step)** 완성해 나갈 수 있도록 설계된 프롬프트 모음입니다. 각 단계를 완료할 때마다 테스트를 권장합니다.

---

## 🛠️ Step 1: 프로젝트 초기화 및 DB 설정
**목적**: NestJS 기반의 프로젝트 뼈대를 만들고 PostgreSQL(PostGIS)과 연결합니다.

> **Prompt**:
> "안티그래피티 서비스의 백엔드를 위해 NestJS 프로젝트를 생성해줘. 
> 1. TypeScript와 npm을 사용하고, 데이터베이스 관리를 위해 Prisma를 설치해줘. 
> 2. PostgreSQL(PostGIS 포함) 연결 설정을 진행해. 
> 3. 필수 엔터티인 User(email, password, role), Report(location: geometry, image_url, status) 스키마를 prisma.schema에 정의하고 Migration을 수행해줘."

---

## 🔐 Step 2: JWT 기반 인증 시스템 구현
**목적**: 사용자가 가입하고 로그인하여 API를 사용할 수 있는 권한을 부여합니다.

> **Prompt**:
> "Step 1에서 구축된 프로젝트에 인증(Auth) 모듈을 추가해줘.
> 1. Passport와 JWT strategy를 사용하여 로그인 기능을 구현해.
> 2. 회원가입(Signup) 시 비밀번호는 bcrypt로 암호화해서 저장해야 해.
> 3. 모든 API 요청 시 토큰을 검증하는 전역 유효성 검사(Guard)를 설정하고, `Admin`과 `Citizen` 역할을 구분할 수 있는 Role Guard를 만들어줘."

---

## 📸 Step 3: 실시간 제보(Report) 등록 API
**목적**: 시민이 그래피티 사진과 위치 정보를 서버에 전송합니다.

> **Prompt**:
> "불법 그래피티 제보를 위한 `Reports` 모듈을 구현해줘.
> 1. `POST /api/v1/reports` 엔드포인트를 만들어. 
> 2. 좌표 데이터(위도, 경도)를 PostGIS `Point` 타입으로 변환해서 저장해야 해.
> 3. 파일 업로드를 위해 이미지 파일을 수신하고 서비스를 통해 S3(또는 로컬 스토리지) 저장 경로를 연동하는 로직을 추가해줘. (Multer 활용)"

---

## 🗺️ Step 4: 위치 기반 지도 검색 및 목록 조회
**목적**: 현재 지도 영역 내에 있는 그래피티 목록을 효율적으로 불러옵니다.

> **Prompt**:
> "등록된 제보를 지도에 표시하기 위한 조회 API를 구현해줘.
> 1. `GET /api/v1/reports`에서 쿼리 파라미터로 `lat`, `lng`, `radius(km)`를 받아.
> 2. PostGIS의 `ST_DWithin` 또는 유사한 공간 쿼리를 사용하여 해당 반경 내의 제보만 필터링해서 반환해.
> 3. 대량의 데이터를 대비해 간단한 페이징(offset, limit) 처리를 포함해줘."

---

## 🏗️ Step 5: 관리자 대시보드 및 상태 변경
**목적**: 지자체 관리자가 제보를 처리하고 상태를 업데이트합니다.

> **Prompt**:
> "관리자용 처리 상태 관리 기능을 구현해줘.
> 1. `PATCH /api/v1/reports/:id/status` 엔드포인트를 생성해.
> 2. 이 API는 오직 `Admin` 권한만 접근 가능해야 해.
> 3. 상태값(`PENDING`, `APPROVED`, `COMPLETED` 등)을 업데이트하고, 변경 이력을 `StatusHistory` 테이블에 기록하도록 로직을 작성해줘."

---

## ☁️ Step 6: 최종 배포 및 문서화
**목적**: 서버를 클라우드에 올리고 API 명세서를 동기화합니다.

> **Prompt**:
> "지금까지 개발된 코드를 배포용으로 고도화해줘.
> 1. NestJS에 `@nestjs/swagger`를 설정해서 모든 API를 문서화해.
> 2. 환경 변수(`.env`) 관리를 위해 `@nestjs/config`를 적용해.
> 3. Vercel이나 Render에 배포할 수 있도록 `Procfile` 또는 배포 설정 파일(json)을 작성해줘."

---

> [!TIP]
> **성공적인 개발 Tip**: 한 단계를 마칠 때마다 `npm run test`를 실행하거나 Postman으로 API 응답을 확인하세요. 다음 단계로 넘어가기 전 코드가 정상 작동하는지 확인하는 것이 버그를 줄이는 가장 빠른 길입니다.
