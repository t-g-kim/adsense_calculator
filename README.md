# 🧮 Calculator Hub - BMI 계산기 웹사이트

무료 온라인 계산기 모음 웹사이트입니다. 현재 BMI 계산기를 제공하며, 추가 계산기들이 준비 중입니다.

## ✨ 주요 기능

- **BMI 계산기**: 아시아-태평양 기준 체질량지수 계산
- **반응형 디자인**: 모바일, 태블릿, 데스크톱 최적화
- **SEO 최적화**: Schema.org, Open Graph 메타 태그
- **AdSense 준비**: 4개 광고 영역 사전 배치
- **개인정보 보호**: 클라이언트 사이드 계산, 서버 전송 없음
- **로컬 스토리지**: 입력값 및 계산 기록 저장

## 📁 프로젝트 구조

```
webapp/
├── index.html                 # 메인 페이지 (8개 계산기 카드)
├── bmi-calculator.html        # BMI 계산기 페이지
├── css/
│   └── style.css             # 반응형 스타일시트
├── js/
│   ├── main.js               # 메인 페이지 스크립트
│   └── bmi-calculator.js     # BMI 계산 로직
├── _headers                   # Cloudflare Pages 보안 헤더
├── _redirects                 # 리다이렉트 규칙
├── robots.txt                 # 검색엔진 크롤링 설정
├── sitemap.xml               # 사이트맵
└── README.md                 # 이 파일
```

## 🚀 Cloudflare Pages 배포 가이드

### 1. GitHub 저장소 생성

1. GitHub에 로그인
2. 새 저장소 생성: `calculator-hub` (또는 원하는 이름)
3. 저장소를 Public 또는 Private으로 설정

### 2. 로컬 Git 설정 및 푸시

```bash
# Git 초기화 (이미 되어있다면 생략)
git init

# 파일 추가
git add .

# 커밋
git commit -m "Initial commit: BMI Calculator website"

# GitHub 저장소 연결 (YOUR_USERNAME과 REPO_NAME을 실제 값으로 변경)
git remote add origin https://github.com/YOUR_USERNAME/REPO_NAME.git

# 메인 브랜치로 푸시
git branch -M main
git push -u origin main
```

### 3. Cloudflare Pages 설정

1. **Cloudflare 대시보드 접속**
   - https://dash.cloudflare.com/ 로그인
   - "Workers & Pages" 메뉴 선택

2. **Pages 프로젝트 생성**
   - "Create application" 클릭
   - "Pages" 탭 선택
   - "Connect to Git" 클릭

3. **GitHub 연동**
   - GitHub 계정 연결
   - 저장소 선택: `calculator-hub`
   - "Begin setup" 클릭

4. **빌드 설정**
   ```
   Project name: calculator-hub (또는 원하는 이름)
   Production branch: main
   Build command: (비워둠 - 정적 사이트)
   Build output directory: / (루트 디렉토리)
   ```

5. **환경 변수** (필요 없음 - 정적 사이트)

6. **배포 시작**
   - "Save and Deploy" 클릭
   - 1-2분 후 배포 완료

### 4. 배포 완료 후 확인

배포가 완료되면 다음과 같은 URL이 생성됩니다:
```
https://calculator-hub.pages.dev
```

## 🔧 커스터마이징

### Google AdSense 광고 추가

1. Google AdSense 가입 및 승인 대기
2. 광고 코드 생성
3. 다음 파일들의 광고 플레이스홀더 영역에 코드 삽입:
   - `index.html`: 4개 광고 영역
   - `bmi-calculator.html`: 사이드바 광고 영역

광고 영역 위치:
```html
<div class="ad-placeholder">
    <!-- 여기에 Google AdSense 코드 삽입 -->
</div>
```

### 도메인 커스터마이징

1. Cloudflare Pages 대시보드에서 "Custom domains" 선택
2. 본인 소유의 도메인 추가
3. DNS 설정에 CNAME 레코드 추가

### SEO 메타 정보 수정

다음 파일들에서 도메인 URL 수정:
- `index.html`: `og:url`, `og:image`, Schema.org URL
- `bmi-calculator.html`: 동일
- `robots.txt`: Sitemap URL
- `sitemap.xml`: 모든 `<loc>` URL

## 📊 BMI 계산 기준

본 계산기는 **WHO 아시아-태평양 기준**을 사용합니다:

| 분류 | BMI 범위 |
|------|----------|
| 저체중 | < 18.5 |
| 정상 | 18.5 - 22.9 |
| 과체중 | 23.0 - 24.9 |
| 비만 1단계 | 25.0 - 29.9 |
| 비만 2단계 | ≥ 30.0 |

## 🔒 보안 및 개인정보

- 모든 계산은 클라이언트 사이드에서 수행
- 서버로 개인 데이터 전송 없음
- 입력값은 브라우저 로컬 스토리지에만 저장
- HTTPS를 통한 안전한 통신 (Cloudflare 자동 제공)

## 🌐 브라우저 지원

- Chrome (최신 버전)
- Firefox (최신 버전)
- Safari (최신 버전)
- Edge (최신 버전)
- 모바일 브라우저 (iOS Safari, Chrome Mobile)

## 📈 향후 계획

- [ ] 대출 계산기
- [ ] 환율 계산기
- [ ] 날짜 계산기
- [ ] 전기요금 계산기
- [ ] 칼로리 계산기
- [ ] 투자수익 계산기
- [ ] 퍼센트 계산기
- [ ] 다크 모드 지원
- [ ] 다국어 지원 (영어, 일본어 등)

## 🤝 기여

개선 사항이나 버그 리포트는 GitHub Issues를 통해 제출해주세요.

## 📄 라이선스

MIT License - 자유롭게 사용, 수정, 배포 가능합니다.

## 📞 문의

- GitHub: [Your GitHub Profile]
- Email: your-email@example.com

---

**© 2024 Calculator Hub. All rights reserved.**
