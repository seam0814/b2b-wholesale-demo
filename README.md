# Lumière Beauty — Global K-Beauty B2B Wholesale (데모)

위시켓 "해외 수출용 폐쇄형 글로벌 B2B 도매 웹 플랫폼" 공고에 풀커스텀(B안) 입찰 시 보여주기 위한 포트폴리오 데모입니다.

**Tech**: Next.js 16 (App Router) · React 19 · TypeScript · Tailwind CSS v4 · lucide-react

## 데모 핵심 포인트

상단 검은 바의 **데모 역할 토글**로 한 클릭에 모든 시점을 체험할 수 있습니다:

| 역할 | 무엇을 볼 수 있는가 |
|---|---|
| 비회원 | 가격 마스킹, 가입 유도 CTA |
| 가입대기 | 신청 접수 안내, 카탈로그 가격 비공개 유지 |
| Bronze / Silver / Gold | 등급별 차등 단가 자동 노출, 등급 표시 배지 |
| 관리자 | 승인 대기 처리, 회원 등급 변경, 상품/주문 통계 |

오른쪽 한국어/English 토글로 즉시 언어 전환.

## 구현 기능 매트릭스 (공고 요구사항 대응)

- ✅ **2-1. 폐쇄형 회원 가입 + 사업자 정보 + 관리자 승인** — `/signup`, `/pending`, `/admin` 승인 탭
- ✅ **2-2. 등급별 차등 단가 + 비회원 가격 비노출** — `/products`, `/products/[slug]` 가격 마스킹/공개 로직
- ✅ **2-3. 샘플 / 벌크 오더 폼** — `/sample-request`, `/bulk-order`
- ✅ **2-4. 맞춤형 배송비 산출 + PG 수수료** — `/bulk-order` 우측 견적 패널 (국가별 단가 × 무게 + 3.3% PG)
- ✅ **2-5. 관리자 페이지 (회원 승인/등급, 상품, 주문, 통계)** — `/admin`

## 로컬 실행

```bash
npm install
npm run dev
```

http://localhost:3000

## 빌드

```bash
npm run build
```

## Vercel 배포 가이드

### 1. GitHub 레포 생성
```bash
cd b2b-wholesale-demo
git add .
git commit -m "Initial demo: K-beauty B2B wholesale platform"
gh repo create b2b-wholesale-demo --public --source=. --push
# gh CLI 미사용 시: GitHub에서 빈 레포 만든 뒤 git remote add + push
```

### 2. Vercel 배포
1. https://vercel.com/new 접속
2. 방금 만든 GitHub 레포 선택 → Import
3. Framework: Next.js (자동 감지) — 환경변수 없이 그대로 Deploy 클릭
4. 배포 후 발급되는 URL을 위시켓 제안서에 첨부

> 외부 서비스 연결이 없어 환경변수가 필요하지 않습니다. 1분 안에 배포됩니다.

## 폴더 구조

```
src/
  app/
    page.tsx                # 랜딩
    login/                  # 로그인 (데모용)
    signup/                 # 가입 신청 (사업자 정보)
    pending/                # 승인 대기 안내
    products/               # 카탈로그
    products/[slug]/        # 상품 상세 (등급별 단가 비교)
    sample-request/         # 샘플 요청 폼
    bulk-order/             # 벌크 오더 + 배송비 견적
    orders/                 # 주문 내역
    admin/                  # 관리자 대시보드
  components/
    auth-provider.tsx       # 데모 역할/언어 컨텍스트 (localStorage)
    demo-bar.tsx            # 상단 역할/언어 토글
    site-header.tsx
    site-footer.tsx
    product-card.tsx
    ui/                     # button, card, input, badge
  lib/
    i18n.ts                 # KO/EN 사전
    mock-data.ts            # 상품/회원/주문/배송비 가상 데이터
    utils.ts                # cn, 통화 포맷
```

## 실제 프로젝트로 확장 시 추가/교체할 부분

데모는 `localStorage` 기반의 가상 인증입니다. 실서비스 전환 시:

| 데모 구현 | 실서비스 교체 |
|---|---|
| `auth-provider.tsx` localStorage | Supabase Auth / NextAuth + JWT 쿠키 |
| `mock-data.ts` 정적 데이터 | Supabase Postgres + RLS 정책 |
| 사업자등록증 업로드 자리만 | Supabase Storage + 국세청 API 검증 |
| 배송비 룰 테이블 | EMS/DHL/FedEx API 또는 운영자 단가표 |
| 결제 견적만 발급 | Stripe / 토스페이먼츠 / 이니시스 연동 |
| 가상 사진 (Unsplash) | 카페24 → 마이그레이션 또는 Supabase Storage |

## 데모 데이터

- 상품 8종 (세럼·크림·토너·마스크·클렌저·미스트·선케어·립)
- 회원 6명 / 승인 대기 3명 / 주문 6건
- 배송 단가 12개국
