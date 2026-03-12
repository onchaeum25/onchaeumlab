# 📄 안티그래피티(Anti-Graffiti) 백엔드 개발 기획서

이 문서는 설계된 아키텍처를 바탕으로 실제 개발을 진행하기 위한 구체적인 **실무 가이드라인**입니다.

---

## 1. 개발 목표 (Development Objectives)
- **안정성**: 타입 안정성(TypeScript)을 확보하여 런타임 오류 최소화
- **생산성**: NestJS의 구조화된 패턴을 활용하여 빠른 기능 구현
- **확장성**: 향후 AI 이미지 분석 및 지자체 시스템 연동을 고려한 모듈형 설계

---

## 2. 주요 구현 기능 상세 (Feature Details)

### 2.1. 인증 및 권한 (Auth & Security)
- **기능**: 이메일 기반 가입/로그인, JWT 토큰 발급/검증
- **구현 전략**: Passport.js 또는 Supabase Auth 통합. `Citizen`, `Admin`, `Worker`의 3단계 Role 기반 Guard 구현.

### 2.2. 제보 관리 시스템 (Report System)
- **제보 등록**: 이미지 파일 업로드(S3) + 위치 좌표(Lat, Lng) + 설명 저장.
- **지도 기반 검색**: 사용자의 현재 좌표 기준 반경 $N\text{ km}$ 내의 그래피티 정보 추출 (PostGIS 연산 사용).
- **워크플로우**: `PENDING` → `APPROVED` → `IN_PROGRESS` → `COMPLETED` 상태 전환 로직 구현.

### 2.3. 이미지 처리 환경 (Media Handling)
- **업로드**: 클라이언트에서 직접 Storage로 업로드하는 Pre-signed URL 방식 권장.
- **최적화**: 업로드된 이미지는 썸네일 생성을 위해 비동기 람다(Lambda) 또는 내부 Worker 처리 고려.

---

## 3. 주 단위 개발 일정 (Milestones)

| 주차 | 목표 (Goal) | 주요 작업 내용 |
| :--- | :--- | :--- |
| **1주차** | **환경 구축 & 인증** | NestJS 초기화, Prisma 설정, 유저 인증 API 완성 |
| **2주차** | **핵심 비즈니스 로직** | 제보 등록 API, S3 연동, 위치 정보 저장 로직 |
| **3주차** | **관리자 기능 & 조회** | 대시보드용 통계 API, 상태 변경 워크플로우, 반경 검색 |
| **4주차** | **고도화 & 배포** | 알림 서비스 연동, 성능 최적화, Vercel/Cloud 배포 |

---

## 4. 개발 가이드라인 (Dev Guidelines)

- **코드 스타일**: ESLint/Prettier 엄격 준수.
- **API 문서화**: NestJS `@nestjs/swagger`를 사용하여 실시간 API 문서 자동 생성.
- **에러 핸들링**: 전역 `Exception Filter`를 구현하여 통일된 에러 응답 포맷 유지.
- **버전 관리**: Git Flow(feature, develop, main) 전략 기반의 단계별 병합.

---

## 5. 초기 설정 체크리스트 (Initial Setup)

1. [ ] `Node.js` 및 `npm` 버전 확인
2. [ ] `nest new backend-project` 프로젝트 생성
3. [ ] `PostgreSQL` 및 `PostGIS` 확장 활성화된 DB 준비
4. [ ] `.env` 파일에 DB URL, JWT Secret, AWS Key 설정

---

> [!IMPORTANT]
> **성공적인 개발을 위한 제언**: 백엔드 작업 시작 전, 프론트엔드와 **API 규격(Swagger)**을 먼저 확정하는 것이 협업 효율을 2배 이상 높일 수 있습니다. 본 기획서 승인 후 바로 프로젝트 초기화를 도와드리겠습니다.
