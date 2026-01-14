// 메인 페이지 JavaScript
document.addEventListener('DOMContentLoaded', function() {
    console.log('Calculator Hub initialized');
    
    // 부드러운 스크롤
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });

    // 계산기 카드 애니메이션
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);

    // 모든 계산기 카드에 애니메이션 적용
    document.querySelectorAll('.calculator-card').forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(20px)';
        card.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        observer.observe(card);
    });

    // "준비중" 버튼 클릭 처리
    document.querySelectorAll('.btn-secondary').forEach(btn => {
        if (btn.textContent.includes('준비중')) {
            btn.addEventListener('click', function(e) {
                e.preventDefault();
                alert('이 계산기는 곧 제공될 예정입니다. 조금만 기다려 주세요! 😊');
            });
        }
    });

    // 페이지 로드 통계 (선택사항)
    logPageView();
});

// 페이지 뷰 로깅 (Google Analytics 또는 다른 분석 도구 연동 가능)
function logPageView() {
    const pageData = {
        url: window.location.href,
        title: document.title,
        timestamp: new Date().toISOString()
    };
    
    console.log('Page view:', pageData);
    
    // Google Analytics 연동 예시 (gtag.js 로드 필요)
    if (typeof gtag !== 'undefined') {
        gtag('event', 'page_view', {
            page_title: pageData.title,
            page_location: pageData.url,
            page_path: window.location.pathname
        });
    }
}

// 유틸리티 함수: 로컬 스토리지에 방문 기록 저장
function saveVisitHistory() {
    const visits = JSON.parse(localStorage.getItem('calculator_visits') || '[]');
    visits.push({
        page: window.location.pathname,
        timestamp: new Date().toISOString()
    });
    
    // 최근 10개만 유지
    if (visits.length > 10) {
        visits.shift();
    }
    
    localStorage.setItem('calculator_visits', JSON.stringify(visits));
}

// 초기화 시 방문 기록 저장
saveVisitHistory();
