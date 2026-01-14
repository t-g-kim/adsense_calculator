# 🚀 Cloudflare Pages 배포 가이드

## ✅ 완료된 작업

1. ✅ BMI 계산기 웹사이트 개발 완료
2. ✅ GitHub 저장소에 푸시 완료
3. ✅ Cloudflare Pages 설정 파일 준비 완료

## 📦 배포 단계

### 1단계: Cloudflare 대시보드 접속

1. https://dash.cloudflare.com/ 에 로그인
2. 왼쪽 메뉴에서 **"Workers & Pages"** 클릭
3. **"Create application"** 버튼 클릭
4. **"Pages"** 탭 선택
5. **"Connect to Git"** 클릭

### 2단계: GitHub 저장소 연결

1. GitHub 계정 인증 (처음 사용시)
2. 저장소 선택: **`t-g-kim/pj1`** (calculator)
3. **"Begin setup"** 클릭

### 3단계: 빌드 설정

다음과 같이 입력하세요:

```
Project name: calculator

Production branch: master

Framework preset: None
(정적 사이트이므로 프레임워크 선택 안 함)

Build command: (비워둠)
(빌드가 필요 없는 순수 정적 사이트)

Build output directory: /
(루트 디렉토리를 배포)
```

### 4단계: 배포 시작

1. **"Save and Deploy"** 버튼 클릭
2. 약 1-2분 후 배포 완료
3. 배포 완료 후 제공되는 URL 확인:
   ```
   https://calculator.pages.dev
   ```

## 🔧 배포 후 설정

### Google AdSense 광고 추가

1. **Google AdSense 계정 생성/로그인**
   - https://www.google.com/adsense/

2. **사이트 추가**
   - 배포된 Cloudflare Pages URL 등록
   - 승인 대기 (보통 1-2주)

3. **광고 코드 생성**
   - Auto Ads 또는 Display Ads 선택
   - 광고 단위 생성

4. **코드 삽입**
   - `index.html`의 4개 광고 영역에 코드 추가
   - `bmi-calculator.html`의 사이드바에 코드 추가
   - Git에 커밋 및 푸시하면 자동 재배포

### 커스텀 도메인 설정 (선택사항)

1. Cloudflare Pages 대시보드에서 프로젝트 선택
2. **"Custom domains"** 탭 클릭
3. **"Set up a custom domain"** 클릭
4. 본인 소유 도메인 입력 (예: `bmicalculator.com`)
5. DNS 레코드 설정 안내에 따라 CNAME 추가
6. 도메인 연결 완료 (약 24시간 소요 가능)

### SEO 설정 업데이트

배포 후 실제 URL로 다음 파일들을 업데이트하세요:

**index.html:**
```html
<meta property="og:url" content="https://your-actual-domain.pages.dev">
<meta property="og:image" content="https://your-actual-domain.pages.dev/images/og-image.jpg">
```

**bmi-calculator.html:**
```html
<meta property="og:url" content="https://your-actual-domain.pages.dev/bmi-calculator.html">
```

**robots.txt:**
```
Sitemap: https://your-actual-domain.pages.dev/sitemap.xml
```

**sitemap.xml:**
모든 `<loc>` 태그의 URL을 실제 도메인으로 변경

## 📊 배포 확인

배포 완료 후 다음 사항들을 확인하세요:

- [ ] 홈페이지가 정상적으로 로드되는지
- [ ] BMI 계산기가 작동하는지
- [ ] 모바일에서 반응형 디자인이 잘 적용되는지
- [ ] 보안 헤더가 적용되었는지 (개발자 도구 → Network 탭)
- [ ] robots.txt 접근 가능 (https://your-domain.pages.dev/robots.txt)
- [ ] sitemap.xml 접근 가능 (https://your-domain.pages.dev/sitemap.xml)

## 🔄 자동 배포

이제 GitHub에 코드를 푸시할 때마다 Cloudflare Pages가 자동으로 배포합니다:

```bash
# 코드 수정 후
git add .
git commit -m "Update: [변경 내용 설명]"
git push origin master

# 1-2분 후 자동 배포 완료!
```

## 📈 Google Search Console 등록

1. https://search.google.com/search-console/ 접속
2. **"속성 추가"** 클릭
3. 배포된 URL 입력
4. 소유권 확인 (HTML 태그 또는 DNS 인증)
5. sitemap.xml 제출:
   ```
   https://your-domain.pages.dev/sitemap.xml
   ```

## 🎯 성능 최적화 팁

1. **이미지 최적화**
   - 웹 최적화 포맷 사용 (WebP)
   - 적절한 크기로 리사이징

2. **캐싱 활용**
   - _headers 파일이 이미 설정되어 있음
   - Cloudflare CDN이 자동으로 캐싱

3. **분석 도구 추가**
   - Google Analytics 4 설정
   - Cloudflare Web Analytics 사용

## 📞 문제 해결

### 배포가 실패하는 경우
- Cloudflare Pages 대시보드에서 빌드 로그 확인
- 브랜치 이름 확인 (master vs main)

### 페이지가 로드되지 않는 경우
- _headers 파일 문법 오류 확인
- 브라우저 캐시 삭제 후 재시도

### 광고가 표시되지 않는 경우
- AdSense 승인 대기 상태 확인
- 광고 코드가 올바르게 삽입되었는지 확인
- ads.txt 파일 추가 고려

## 🎉 배포 완료!

축하합니다! BMI 계산기 웹사이트가 성공적으로 배포되었습니다.

**다음 단계:**
1. Google AdSense 신청 및 광고 코드 추가
2. Google Search Console 등록
3. 사용자 피드백 수집
4. 추가 계산기 개발 (대출, 환율 등)

---

**저장소:** https://github.com/t-g-kim/pj1
**배포 URL:** Cloudflare Pages에서 확인
