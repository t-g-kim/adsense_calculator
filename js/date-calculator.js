// 날짜 계산기 JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const calcTypeSelect = document.getElementById('calcType');
    const diffMode = document.getElementById('diffMode');
    const addMode = document.getElementById('addMode');
    const startDateInput = document.getElementById('startDate');
    const endDateInput = document.getElementById('endDate');
    const baseDateInput = document.getElementById('baseDate');
    const addValueInput = document.getElementById('addValue');
    const addUnitSelect = document.getElementById('addUnit');
    const calculateBtn = document.getElementById('calculateBtn');
    const resetBtn = document.getElementById('resetBtn');
    const resultContainer = document.getElementById('result');
    const resultContent = document.getElementById('resultContent');

    // 오늘 날짜 설정
    const today = new Date().toISOString().split('T')[0];
    startDateInput.value = today;
    endDateInput.value = today;
    baseDateInput.value = today;

    // 계산 유형 변경
    calcTypeSelect.addEventListener('change', function() {
        if (this.value === 'diff') {
            diffMode.style.display = 'block';
            addMode.style.display = 'none';
        } else {
            diffMode.style.display = 'none';
            addMode.style.display = 'block';
        }
    });

    calculateBtn.addEventListener('click', calculate);
    resetBtn.addEventListener('click', reset);

    function calculate() {
        if (calcTypeSelect.value === 'diff') {
            calculateDifference();
        } else {
            calculateAddition();
        }
    }

    function calculateDifference() {
        const start = new Date(startDateInput.value);
        const end = new Date(endDateInput.value);

        if (!startDateInput.value || !endDateInput.value) {
            alert('날짜를 모두 입력해주세요.');
            return;
        }

        const diffTime = Math.abs(end - start);
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        const diffWeeks = Math.floor(diffDays / 7);
        const diffMonths = Math.floor(diffDays / 30.44);
        const diffYears = Math.floor(diffDays / 365.25);

        let html = `
            <div class="date-result">
                <h4>📊 날짜 차이</h4>
                <p class="big-number">${diffDays.toLocaleString()}일</p>
                <div class="date-breakdown">
                    <p>≈ ${diffWeeks.toLocaleString()}주 ${diffDays % 7}일</p>
                    <p>≈ ${diffMonths.toLocaleString()}개월</p>
                    <p>≈ ${diffYears.toLocaleString()}년 ${Math.floor((diffDays % 365.25) / 30.44)}개월</p>
                </div>
                <div class="date-info">
                    <p><strong>시작:</strong> ${formatKoreanDate(start)}</p>
                    <p><strong>종료:</strong> ${formatKoreanDate(end)}</p>
                </div>
            </div>
        `;

        resultContent.innerHTML = html;
        showResult();
    }

    function calculateAddition() {
        const base = new Date(baseDateInput.value);
        const value = parseInt(addValueInput.value) || 0;
        const unit = addUnitSelect.value;

        if (!baseDateInput.value) {
            alert('기준 날짜를 입력해주세요.');
            return;
        }

        if (value === 0) {
            alert('더하거나 뺄 값을 입력해주세요.');
            return;
        }

        let result = new Date(base);

        switch(unit) {
            case 'days':
                result.setDate(result.getDate() + value);
                break;
            case 'weeks':
                result.setDate(result.getDate() + (value * 7));
                break;
            case 'months':
                result.setMonth(result.getMonth() + value);
                break;
            case 'years':
                result.setFullYear(result.getFullYear() + value);
                break;
        }

        const unitText = { days: '일', weeks: '주', months: '개월', years: '년' };
        const operation = value > 0 ? '더한' : '뺀';

        let html = `
            <div class="date-result">
                <h4>📅 계산된 날짜</h4>
                <p class="big-date">${formatKoreanDate(result)}</p>
                <div class="date-info">
                    <p><strong>기준:</strong> ${formatKoreanDate(base)}</p>
                    <p><strong>계산:</strong> ${Math.abs(value)} ${unitText[unit]} ${operation} 날짜</p>
                    <p><strong>요일:</strong> ${getDayOfWeek(result)}</p>
                </div>
            </div>
        `;

        resultContent.innerHTML = html;
        showResult();
    }

    function formatKoreanDate(date) {
        return date.toLocaleDateString('ko-KR', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            weekday: 'long'
        });
    }

    function getDayOfWeek(date) {
        const days = ['일요일', '월요일', '화요일', '수요일', '목요일', '금요일', '토요일'];
        return days[date.getDay()];
    }

    function showResult() {
        resultContainer.style.display = 'block';
        resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    function reset() {
        const today = new Date().toISOString().split('T')[0];
        startDateInput.value = today;
        endDateInput.value = today;
        baseDateInput.value = today;
        addValueInput.value = '';
        calcTypeSelect.value = 'diff';
        diffMode.style.display = 'block';
        addMode.style.display = 'none';
        resultContainer.style.display = 'none';
    }
});
