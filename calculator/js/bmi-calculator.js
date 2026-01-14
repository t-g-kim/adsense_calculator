// BMI 계산기 JavaScript

document.addEventListener('DOMContentLoaded', function() {
    // DOM 요소 가져오기
    const heightInput = document.getElementById('height');
    const weightInput = document.getElementById('weight');
    const calculateBtn = document.getElementById('calculateBtn');
    const resetBtn = document.getElementById('resetBtn');
    const resultSection = document.getElementById('resultSection');
    const bmiValue = document.getElementById('bmiValue');
    const statusBadge = document.getElementById('statusBadge');
    const statusMessage = document.getElementById('statusMessage');
    const chartIndicator = document.getElementById('chartIndicator');

    // Enter 키 입력 시 계산 실행
    heightInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            weightInput.focus();
        }
    });

    weightInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            calculateBMI();
        }
    });

    // 계산 버튼 클릭 이벤트
    calculateBtn.addEventListener('click', calculateBMI);

    // 초기화 버튼 클릭 이벤트
    resetBtn.addEventListener('click', function() {
        heightInput.value = '';
        weightInput.value = '';
        resultSection.style.display = 'none';
        heightInput.focus();
    });

    // BMI 계산 함수
    function calculateBMI() {
        const height = parseFloat(heightInput.value);
        const weight = parseFloat(weightInput.value);

        // 입력 유효성 검사
        if (!height || !weight) {
            alert('키와 몸무게를 모두 입력해주세요.');
            return;
        }

        if (height < 50 || height > 250) {
            alert('키는 50cm ~ 250cm 사이로 입력해주세요.');
            return;
        }

        if (weight < 20 || weight > 300) {
            alert('몸무게는 20kg ~ 300kg 사이로 입력해주세요.');
            return;
        }

        // BMI 계산 (키를 미터로 변환)
        const heightInMeters = height / 100;
        const bmi = weight / (heightInMeters * heightInMeters);

        // 결과 표시
        displayResult(bmi);

        // 결과 섹션으로 스크롤
        resultSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // 결과 표시 함수
    function displayResult(bmi) {
        // BMI 값 표시 (소수점 1자리)
        bmiValue.textContent = bmi.toFixed(1);

        // BMI 분류 및 상태 메시지 결정 (아시아-태평양 기준)
        let status, statusClass, message, chartPosition;

        if (bmi < 18.5) {
            status = '저체중';
            statusClass = 'underweight';
            message = '현재 저체중 상태입니다. 균형 잡힌 식단으로 건강한 체중 증가가 필요합니다.';
            chartPosition = (bmi / 18.5) * 20; // 0-20%
        } else if (bmi < 23) {
            status = '정상';
            statusClass = 'normal';
            message = '정상 체중입니다! 현재 건강 상태를 유지하세요. 꾸준한 운동과 균형 잡힌 식단을 권장합니다.';
            chartPosition = 20 + ((bmi - 18.5) / (23 - 18.5)) * 20; // 20-40%
        } else if (bmi < 25) {
            status = '과체중';
            statusClass = 'overweight';
            message = '과체중 상태입니다. 가벼운 운동과 식단 조절로 건강한 체중 관리를 시작하세요.';
            chartPosition = 40 + ((bmi - 23) / (25 - 23)) * 20; // 40-60%
        } else if (bmi < 30) {
            status = '비만';
            statusClass = 'obese';
            message = '비만 상태입니다. 건강을 위해 체중 감량이 필요합니다. 전문가와 상담하여 체계적인 관리를 시작하세요.';
            chartPosition = 60 + ((bmi - 25) / (30 - 25)) * 20; // 60-80%
        } else {
            status = '고도비만';
            statusClass = 'severe-obese';
            message = '고도비만 상태입니다. 건강에 심각한 위험이 있을 수 있으니 반드시 의료 전문가와 상담하세요.';
            chartPosition = 80 + Math.min(((bmi - 30) / 10) * 20, 20); // 80-100%
        }

        // 상태 배지 업데이트
        statusBadge.textContent = status;
        statusBadge.className = 'status-badge ' + statusClass;

        // 상태 메시지 업데이트
        statusMessage.textContent = message;

        // 차트 인디케이터 위치 업데이트
        chartIndicator.style.left = chartPosition + '%';

        // 결과 섹션 표시
        resultSection.style.display = 'block';

        // 애니메이션 효과
        resultSection.style.opacity = '0';
        setTimeout(() => {
            resultSection.style.transition = 'opacity 0.5s ease';
            resultSection.style.opacity = '1';
        }, 10);

        // Google Analytics 이벤트 추적 (GA4가 설치된 경우)
        if (typeof gtag !== 'undefined') {
            gtag('event', 'calculate_bmi', {
                'event_category': 'Calculator',
                'event_label': status,
                'value': Math.round(bmi)
            });
        }
    }

    // 페이지 로드 시 포커스
    heightInput.focus();

    // 저장된 값이 있으면 불러오기 (선택사항)
    loadSavedValues();

    // 값 변경 시 로컬 스토리지에 저장 (선택사항)
    heightInput.addEventListener('input', saveValues);
    weightInput.addEventListener('input', saveValues);

    function saveValues() {
        if (heightInput.value && weightInput.value) {
            localStorage.setItem('bmi_height', heightInput.value);
            localStorage.setItem('bmi_weight', weightInput.value);
        }
    }

    function loadSavedValues() {
        const savedHeight = localStorage.getItem('bmi_height');
        const savedWeight = localStorage.getItem('bmi_weight');
        
        // 자동으로 채우지 않음 (사용자가 직접 입력하도록)
        // 필요시 아래 코드 주석 해제
        /*
        if (savedHeight) heightInput.value = savedHeight;
        if (savedWeight) weightInput.value = savedWeight;
        */
    }
});

// 페이지 가시성 변경 시 이벤트 (사용자 참여도 추적)
document.addEventListener('visibilitychange', function() {
    if (document.hidden) {
        // 페이지를 떠날 때
        if (typeof gtag !== 'undefined') {
            gtag('event', 'page_hidden', {
                'event_category': 'Engagement'
            });
        }
    } else {
        // 페이지로 돌아올 때
        if (typeof gtag !== 'undefined') {
            gtag('event', 'page_visible', {
                'event_category': 'Engagement'
            });
        }
    }
});
