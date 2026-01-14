// BMI 계산기 JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const heightInput = document.getElementById('height');
    const weightInput = document.getElementById('weight');
    const calculateBtn = document.getElementById('calculateBtn');
    const resetBtn = document.getElementById('resetBtn');
    const resultContainer = document.getElementById('result');
    const bmiValueElement = document.getElementById('bmiValue');
    const bmiStatusElement = document.getElementById('bmiStatus');
    const bmiAdviceElement = document.getElementById('bmiAdvice');

    // 이전 입력값 복원 (로컬 스토리지)
    restorePreviousValues();

    // 계산 버튼 클릭
    calculateBtn.addEventListener('click', calculateBMI);

    // 초기화 버튼 클릭
    resetBtn.addEventListener('click', resetCalculator);

    // Enter 키로 계산
    heightInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') calculateBMI();
    });

    weightInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') calculateBMI();
    });

    // 입력값 변경 시 로컬 스토리지에 저장
    heightInput.addEventListener('input', saveInputValues);
    weightInput.addEventListener('input', saveInputValues);

    // BMI 계산 함수
    function calculateBMI() {
        const height = parseFloat(heightInput.value);
        const weight = parseFloat(weightInput.value);

        // 유효성 검사
        if (!validateInputs(height, weight)) {
            return;
        }

        // BMI 계산: 체중(kg) / (신장(m))^2
        const heightInMeters = height / 100;
        const bmi = weight / (heightInMeters * heightInMeters);

        // 결과 표시
        displayResult(bmi);

        // 결과를 로컬 스토리지에 저장
        saveCalculationHistory(height, weight, bmi);

        // 결과 영역으로 부드럽게 스크롤
        resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    // 입력값 유효성 검사
    function validateInputs(height, weight) {
        if (!height || !weight) {
            alert('키와 몸무게를 모두 입력해주세요.');
            return false;
        }

        if (height < 50 || height > 250) {
            alert('키는 50cm에서 250cm 사이의 값을 입력해주세요.');
            heightInput.focus();
            return false;
        }

        if (weight < 20 || weight > 300) {
            alert('몸무게는 20kg에서 300kg 사이의 값을 입력해주세요.');
            weightInput.focus();
            return false;
        }

        return true;
    }

    // 결과 표시 함수
    function displayResult(bmi) {
        // BMI 값 표시 (소수점 1자리)
        bmiValueElement.textContent = bmi.toFixed(1);

        // 아시아-태평양 기준으로 상태 판정
        const status = getBMIStatus(bmi);

        // 상태 표시
        const statusBadge = bmiStatusElement.querySelector('.status-badge');
        const statusText = bmiStatusElement.querySelector('.status-text');

        statusBadge.textContent = status.category;
        statusBadge.style.backgroundColor = status.color;
        statusBadge.style.color = 'white';

        statusText.textContent = status.description;
        bmiStatusElement.style.backgroundColor = status.lightColor;

        // 조언 표시
        const adviceText = bmiAdviceElement.querySelector('.advice-text');
        adviceText.textContent = status.advice;

        // 결과 컨테이너 표시
        resultContainer.style.display = 'block';

        // 애니메이션 효과
        resultContainer.style.opacity = '0';
        resultContainer.style.transform = 'translateY(20px)';
        setTimeout(() => {
            resultContainer.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            resultContainer.style.opacity = '1';
            resultContainer.style.transform = 'translateY(0)';
        }, 10);
    }

    // BMI 상태 판정 (아시아-태평양 기준)
    function getBMIStatus(bmi) {
        if (bmi < 18.5) {
            return {
                category: '저체중',
                color: '#3b82f6',
                lightColor: '#dbeafe',
                description: 'BMI가 정상 범위보다 낮습니다. 영양 상태를 점검해보세요.',
                advice: '균형 잡힌 식사와 적절한 운동으로 건강한 체중을 만들어가세요. 필요시 영양사와 상담하시는 것을 권장합니다.'
            };
        } else if (bmi >= 18.5 && bmi < 23.0) {
            return {
                category: '정상',
                color: '#10b981',
                lightColor: '#d1fae5',
                description: '건강한 체중 범위입니다. 훌륭합니다! 🎉',
                advice: '현재의 건강한 생활 습관을 유지하세요. 균형 잡힌 식사와 규칙적인 운동을 계속하시면 좋습니다.'
            };
        } else if (bmi >= 23.0 && bmi < 25.0) {
            return {
                category: '과체중',
                color: '#f59e0b',
                lightColor: '#fef3c7',
                description: '정상 범위를 약간 벗어났습니다. 주의가 필요합니다.',
                advice: '식습관 개선과 규칙적인 운동을 시작하세요. 작은 변화부터 시작하여 건강한 체중으로 돌아가는 것을 목표로 하세요.'
            };
        } else if (bmi >= 25.0 && bmi < 30.0) {
            return {
                category: '비만 1단계',
                color: '#f97316',
                lightColor: '#fed7aa',
                description: '비만 1단계입니다. 건강 관리가 필요합니다.',
                advice: '체중 감량을 위해 식이요법과 운동 계획을 세우세요. 전문의와 상담하여 개인에게 맞는 건강 관리 방법을 찾는 것이 좋습니다.'
            };
        } else {
            return {
                category: '비만 2단계',
                color: '#ef4444',
                lightColor: '#fecaca',
                description: '고도 비만 상태입니다. 적극적인 건강 관리가 필요합니다.',
                advice: '건강상 위험이 높은 상태입니다. 반드시 의료 전문가와 상담하여 체계적인 체중 관리 프로그램을 시작하시기 바랍니다.'
            };
        }
    }

    // 계산기 초기화
    function resetCalculator() {
        heightInput.value = '';
        weightInput.value = '';
        resultContainer.style.display = 'none';
        heightInput.focus();

        // 로컬 스토리지에서 입력값 제거
        localStorage.removeItem('bmi_height');
        localStorage.removeItem('bmi_weight');
    }

    // 입력값 저장
    function saveInputValues() {
        if (heightInput.value) {
            localStorage.setItem('bmi_height', heightInput.value);
        }
        if (weightInput.value) {
            localStorage.setItem('bmi_weight', weightInput.value);
        }
    }

    // 이전 입력값 복원
    function restorePreviousValues() {
        const savedHeight = localStorage.getItem('bmi_height');
        const savedWeight = localStorage.getItem('bmi_weight');

        if (savedHeight) {
            heightInput.value = savedHeight;
        }
        if (savedWeight) {
            weightInput.value = savedWeight;
        }
    }

    // 계산 히스토리 저장
    function saveCalculationHistory(height, weight, bmi) {
        const history = JSON.parse(localStorage.getItem('bmi_history') || '[]');
        
        history.push({
            height: height,
            weight: weight,
            bmi: bmi.toFixed(1),
            timestamp: new Date().toISOString(),
            date: new Date().toLocaleDateString('ko-KR')
        });

        // 최근 20개만 유지
        if (history.length > 20) {
            history.shift();
        }

        localStorage.setItem('bmi_history', JSON.stringify(history));
    }

    // Google Analytics 이벤트 트래킹 (선택사항)
    function trackCalculation(bmi) {
        if (typeof gtag !== 'undefined') {
            gtag('event', 'bmi_calculation', {
                event_category: 'Calculator',
                event_label: 'BMI',
                value: Math.round(bmi)
            });
        }
    }

    // 페이지 로드 시 포커스
    heightInput.focus();
});

// 히스토리 조회 함수 (콘솔에서 테스트용)
function showBMIHistory() {
    const history = JSON.parse(localStorage.getItem('bmi_history') || '[]');
    console.table(history);
    return history;
}

// 히스토리 삭제 함수
function clearBMIHistory() {
    localStorage.removeItem('bmi_history');
    console.log('BMI calculation history cleared');
}
