# 🚀 빠른 배포 가이드 (Quick Deploy)

## ⚡ 5분 안에 배포하기

### 1️⃣ GitHub에 업로드
```bash
# 터미널에서 실행
git init
git add .
git commit -m "Initial commit: BMI calculator"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO.git
git push -u origin main
```

### 2️⃣ Cloudflare Pages 연결
1. https://dash.cloudflare.com/pages 접속
2. `Create a project` → `Connect to Git`
3. GitHub 저장소 선택
4. 빌드 설정:
   - Build command: **(비워두기)**
   - Build output: `/`
5. `Save and Deploy` 클릭

### 3️⃣ 배포 완료! 🎉
- 1-2분 후 `https://YOUR-PROJECT.pages.dev` 에서 확인

---

## 📝 배포 후 체크리스트

### 필수 작업
- [ ] 실제 도메인으로 `sitemap.xml` 수정
- [ ] `robots.txt`의 도메인 수정
- [ ] 각 HTML 파일의 Canonical URL 수정
- [ ] Google Search Console 등록
- [ ] Google Analytics 설정

### AdSense 수익화
- [ ] Google AdSense 신청
- [ ] 승인 코드를 `<head>`에 추가
- [ ] 승인 후 광고 코드 삽입
- [ ] 광고 배치 최적화

---

## 🔄 업데이트 방법

```bash
# 코드 수정 후
git add .
git commit -m "Update calculator"
git push
```
→ Cloudflare가 자동으로 재배포합니다!

---

## 📞 문제 발생 시

### 배포가 안 되는 경우
- Cloudflare Pages 대시보드에서 빌드 로그 확인
- GitHub 저장소 권한 확인

### 광고가 안 나오는 경우
- AdSense 승인 대기 (최대 2주)
- 충분한 콘텐츠와 트래픽 필요
- 정책 위반 사항 확인

---

**다음 단계**: 나머지 7개 계산기 추가하고 트래픽 늘리기! 💪
