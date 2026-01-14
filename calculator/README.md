# 🧮 계산기 모음 - Cloudflare Pages 배포

Cloudflare Pages + GitHub 연동으로 배포하는 양산형 계산기 웹사이트입니다.  
AdSense 수익화를 위한 SEO 최적화 및 반응형 디자인이 적용되어 있습니다.

## 📋 프로젝트 개요

- **프로젝트명**: 계산기 모음 (Calculator Collection)
- **목적**: AdSense 수익화를 위한 양산형 웹사이트
- **타겟**: 일반 사용자 (BMI, 칼로리, 대출 등 다양한 계산 필요)
- **배포 플랫폼**: Cloudflare Pages
- **버전 관리**: GitHub

## ✨ 현재 완료된 기능

### 1. BMI 계산기 ✅
- **URL**: `/bmi-calculator.html`
- **기능**:
  - 키(cm)와 몸무게(kg) 입력으로 BMI 계산
  - 아시아-태평양 기준 BMI 분류 (저체중/정상/과체중/비만/고도비만)
  - 시각적 차트로 현재 상태 표시
  - 건강 조언 및 상세 정보 제공
  - 로컬 스토리지 지원 (입력값 저장)
  - Google Analytics 이벤트 추적
- **SEO**:
  - Schema.org 구조화된 데이터 적용
  - Open Graph 메타태그
  - 키워드: BMI계산기, 체질량지수, 비만도계산

### 2. 메인 페이지 ✅
- **URL**: `/index.html` (홈)
- **기능**:
  - 8개 계산기 카드 레이아웃
  - BMI 계산기 활성화 (나머지는 "준비중")
  - 반응형 그리드 디자인
  - 부드러운 애니메이션 효과

## 🚀 Cloudflare Pages 배포 가이드

### Step 1: GitHub 저장소 생성

```bash
# 1. 로컬에서 Git 초기화
git init

# 2. 모든 파일 추가
git add .

# 3. 첫 커밋
git commit -m "Initial commit: BMI calculator with Cloudflare Pages setup"

# 4. GitHub 저장소 생성 후 연결 (GitHub에서 저장소 생성 먼저 진행)
git remote add origin https://github.com/YOUR_USERNAME/calculator-site.git

# 5. 푸시
git branch -M main
git push -u origin main
```

### Step 2: Cloudflare Pages 연동

1. **Cloudflare 대시보드 접속**
   - https://dash.cloudflare.com/ 로그인
   - `Pages` 메뉴 클릭

2. **프로젝트 생성**
   - `Create a project` 클릭
   - `Connect to Git` 선택
   - GitHub 계정 연동 및 저장소 선택

3. **빌드 설정**
   ```
   Project name: calculator-site (또는 원하는 이름)
   Production branch: main
   Build command: (비워두기 - 정적 사이트)
   Build output directory: /
   ```

4. **배포 시작**
   - `Save and Deploy` 클릭
   - 1-2분 후 배포 완료!

### Step 3: 커스텀 도메인 연결 (선택사항)

1. Cloudflare Pages 대시보드에서 프로젝트 선택
2. `Custom domains` 탭 클릭
3. `Set up a custom domain` 클릭
4. 도메인 입력 및 DNS 설정

## 📁 프로젝트 구조

```
calculator-site/
├── index.html              # 메인 페이지
├── bmi-calculator.html     # BMI 계산기
├── css/
│   └── style.css          # 전역 스타일 (반응형, AdSense 최적화)
├── js/
│   ├── main.js            # 메인 JavaScript
│   └── bmi-calculator.js  # BMI 계산 로직
├── _headers               # Cloudflare 헤더 설정 (보안, 캐싱)
├── _redirects             # Cloudflare 리다이렉트 설정
├── robots.txt             # 검색엔진 크롤링 설정
├── sitemap.xml            # 사이트맵
├── .gitignore             # Git 제외 파일
└── README.md              # 프로젝트 문서
```

## 💰 Google AdSense 설정 가이드

### 1. AdSense 계정 생성 및 승인
1. https://www.google.com/adsense 접속
2. 계정 생성 및 웹사이트 등록
3. 승인 코드를 `<head>` 태그에 추가

### 2. 광고 코드 삽입 위치

#### 고수익 광고 배치 전략:

```html
<!-- 1. 상단 광고 (Above the fold) - 가장 높은 수익 -->
<div class="ad-space ad-top">
  <!-- AdSense 코드 (728x90 또는 반응형) -->
</div>

<!-- 2. 사이드바 광고 (데스크톱 전용) -->
<div class="ad-space ad-sidebar">
  <!-- AdSense 코드 (300x600) -->
</div>

<!-- 3. 인피드 광고 (콘텐츠 중간) -->
<div class="ad-space ad-infeed">
  <!-- AdSense 코드 (반응형) -->
</div>

<!-- 4. 하단 광고 -->
<div class="ad-space ad-bottom">
  <!-- AdSense 코드 (728x90 또는 반응형) -->
</div>
```

### 3. AdSense 코드 적용 방법

**index.html** 및 **bmi-calculator.html**의 `<head>` 태그에 추가:

```html
<!-- Google AdSense -->
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID"
     crossorigin="anonymous"></script>
```

각 광고 영역에 AdSense 코드 삽입:

```html
<div class="ad-space ad-top">
  <ins class="adsbygoogle"
       style="display:block"
       data-ad-client="ca-pub-YOUR_PUBLISHER_ID"
       data-ad-slot="YOUR_AD_SLOT_ID"
       data-ad-format="auto"
       data-full-width-responsive="true"></ins>
  <script>
       (adsbygoogle = window.adsbygoogle || []).push({});
  </script>
</div>
```

## 📊 Google Analytics 설정

### GA4 추적 코드 추가

**모든 HTML 파일**의 `<head>` 태그에 추가:

```html
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=G-YOUR_MEASUREMENT_ID"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());
  gtag('config', 'G-YOUR_MEASUREMENT_ID');
</script>
```

### 이미 구현된 이벤트 추적

- ✅ BMI 계산 이벤트 (`calculate_bmi`)
- ✅ 페이지 뷰 추적
- ✅ 사용자 참여도 추적
- ✅ 이탈 이벤트 추적

## 🎯 추가 예정 기능 (양산 계획)

### Phase 2: 기본 계산기 (다음 구현)
- [ ] 칼로리 계산기
- [ ] 대출 이자 계산기
- [ ] 환율 계산기
- [ ] 단위 변환기

### Phase 3: 고급 계산기
- [ ] D-Day 계산기
- [ ] 나이 계산기
- [ ] 퍼센트 계산기
- [ ] 표준체중 계산기

### Phase 4: 특화 계산기
- [ ] 적금 계산기
- [ ] 주식 수익률 계산기
- [ ] 임신 주차 계산기
- [ ] 학점 계산기

## 🔧 개발 환경 설정

### 로컬 개발 서버 실행

```bash
# Python을 사용한 간단한 서버
python3 -m http.server 8000

# 또는 Node.js의 http-server
npx http-server -p 8000
```

브라우저에서 `http://localhost:8000` 접속

### 코드 수정 후 배포

```bash
# 변경사항 커밋
git add .
git commit -m "Add new calculator feature"
git push origin main
```

→ Cloudflare Pages가 자동으로 감지하고 배포 (약 1-2분 소요)

## 📈 SEO 최적화 체크리스트

- ✅ 시맨틱 HTML 구조
- ✅ 메타 태그 최적화 (description, keywords)
- ✅ Open Graph 태그 (SNS 공유)
- ✅ Schema.org 구조화된 데이터
- ✅ robots.txt 설정
- ✅ sitemap.xml 생성
- ✅ 모바일 반응형 디자인
- ✅ 페이지 로딩 속도 최적화
- ✅ 접근성 (ARIA) 고려
- ⏳ Canonical URL (도메인 연결 후)
- ⏳ 구글 서치 콘솔 등록

## 🔒 보안 헤더 설정

`_headers` 파일에 다음 보안 헤더가 적용되어 있습니다:

- `X-Frame-Options`: 클릭재킹 방지
- `X-Content-Type-Options`: MIME 타입 스니핑 방지
- `X-XSS-Protection`: XSS 공격 방지
- `Referrer-Policy`: Referrer 정보 제어
- `Permissions-Policy`: 불필요한 브라우저 기능 제한

## 📝 할 일 목록

### 즉시 해야 할 일
1. ✅ GitHub 저장소 생성 및 코드 푸시
2. ⏳ Cloudflare Pages 프로젝트 생성 및 연동
3. ⏳ 배포 후 실제 도메인으로 테스트
4. ⏳ `sitemap.xml` 및 `robots.txt`의 도메인 수정
5. ⏳ Google AdSense 신청 및 승인 대기

### AdSense 승인 후
1. ⏳ AdSense 코드를 모든 페이지에 삽입
2. ⏳ Google Analytics 설정
3. ⏳ 광고 배치 최적화 테스트

### 트래픽 증가 전략
1. ⏳ 나머지 7개 계산기 구현 (우선순위 높음)
2. ⏳ 네이버 서치어드바이저 등록
3. ⏳ 구글 서치 콘솔 등록
4. ⏳ 블로그/커뮤니티에 홍보
5. ⏳ SNS 공유 버튼 추가
6. ⏳ 관련 계산기 간 내부 링크 강화

## 🌐 배포된 URL

- **Production**: `https://calculator-site.pages.dev` (Cloudflare 기본 도메인)
- **Custom Domain**: (연결 후 업데이트)

## 📞 문의 및 지원

프로젝트 관련 문의사항이 있으면 GitHub Issues에 등록해주세요.

---

## 📚 추가 참고 자료

- [Cloudflare Pages 공식 문서](https://developers.cloudflare.com/pages/)
- [Google AdSense 도움말](https://support.google.com/adsense)
- [Google Analytics 4 가이드](https://support.google.com/analytics/answer/10089681)
- [Schema.org 문서](https://schema.org/)

---

**마지막 업데이트**: 2026-01-14  
**버전**: 1.0.0  
**상태**: BMI 계산기 완료, 배포 준비 완료 ✅
