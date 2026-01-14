// 대출 계산기 JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const loanAmountInput = document.getElementById('loanAmount');
    const interestRateInput = document.getElementById('interestRate');
    const loanPeriodInput = document.getElementById('loanPeriod');
    const repaymentTypeSelect = document.getElementById('repaymentType');
    const calculateBtn = document.getElementById('calculateBtn');
    const resetBtn = document.getElementById('resetBtn');
    const resultContainer = document.getElementById('result');

    // 이전 입력값 복원
    restorePreviousValues();

    // 계산 버튼
    calculateBtn.addEventListener('click', calculateLoan);

    // 초기화 버튼
    resetBtn.addEventListener('click', resetCalculator);

    // Enter 키 지원
    [loanAmountInput, interestRateInput, loanPeriodInput].forEach(input => {
        input.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') calculateLoan();
        });
    });

    // 입력값 저장
    [loanAmountInput, interestRateInput, loanPeriodInput, repaymentTypeSelect].forEach(input => {
        input.addEventListener('input', saveInputValues);
    });

    function calculateLoan() {
        const loanAmount = parseFloat(loanAmountInput.value);
        const annualRate = parseFloat(interestRateInput.value);
        const years = parseInt(loanPeriodInput.value);
        const repaymentType = repaymentTypeSelect.value;

        // 유효성 검사
        if (!validateInputs(loanAmount, annualRate, years)) {
            return;
        }

        const monthlyRate = annualRate / 100 / 12;
        const months = years * 12;

        let monthlyPayment, totalPayment, totalInterest;

        if (repaymentType === 'equal-payment') {
            // 원리금균등 방식
            monthlyPayment = calculateEqualPayment(loanAmount, monthlyRate, months);
            totalPayment = monthlyPayment * months;
            totalInterest = totalPayment - loanAmount;
        } else {
            // 원금균등 방식
            const result = calculateEqualPrincipal(loanAmount, monthlyRate, months);
            monthlyPayment = result.firstPayment;
            totalPayment = result.totalPayment;
            totalInterest = result.totalInterest;
        }

        displayResult(monthlyPayment, totalPayment, totalInterest, repaymentType, months);
        saveCalculationHistory(loanAmount, annualRate, years, repaymentType, monthlyPayment, totalInterest);
    }

    // 원리금균등 계산
    function calculateEqualPayment(principal, monthlyRate, months) {
        if (monthlyRate === 0) {
            return principal / months;
        }
        return principal * (monthlyRate * Math.pow(1 + monthlyRate, months)) / 
               (Math.pow(1 + monthlyRate, months) - 1);
    }

    // 원금균등 계산
    function calculateEqualPrincipal(principal, monthlyRate, months) {
        const principalPayment = principal / months;
        let totalPayment = 0;
        let firstPayment = 0;

        for (let i = 0; i < months; i++) {
            const remainingPrincipal = principal - (principalPayment * i);
            const interestPayment = remainingPrincipal * monthlyRate;
            const monthlyPayment = principalPayment + interestPayment;
            
            if (i === 0) {
                firstPayment = monthlyPayment;
            }
            
            totalPayment += monthlyPayment;
        }

        return {
            firstPayment: firstPayment,
            totalPayment: totalPayment,
            totalInterest: totalPayment - principal
        };
    }

    function validateInputs(loanAmount, annualRate, years) {
        if (!loanAmount || !annualRate || !years) {
            alert('모든 항목을 입력해주세요.');
            return false;
        }

        if (loanAmount < 1000000 || loanAmount > 10000000000) {
            alert('대출 금액은 100만원에서 100억원 사이여야 합니다.');
            loanAmountInput.focus();
            return false;
        }

        if (annualRate < 0.1 || annualRate > 30) {
            alert('이자율은 0.1%에서 30% 사이여야 합니다.');
            interestRateInput.focus();
            return false;
        }

        if (years < 1 || years > 50) {
            alert('대출 기간은 1년에서 50년 사이여야 합니다.');
            loanPeriodInput.focus();
            return false;
        }

        return true;
    }

    function displayResult(monthlyPayment, totalPayment, totalInterest, repaymentType, months) {
        document.getElementById('monthlyPayment').textContent = formatCurrency(Math.round(monthlyPayment));
        document.getElementById('totalPayment').textContent = formatCurrency(Math.round(totalPayment));
        document.getElementById('totalInterest').textContent = formatCurrency(Math.round(totalInterest));

        let detailText = '';
        if (repaymentType === 'equal-payment') {
            detailText = `원리금균등 방식으로 ${months}개월 동안 매월 ${formatCurrency(Math.round(monthlyPayment))}을 상환합니다.`;
        } else {
            const lastPayment = parseFloat(loanAmountInput.value) / months;
            detailText = `원금균등 방식으로 첫 달 ${formatCurrency(Math.round(monthlyPayment))}부터 시작하여 점차 감소합니다. 마지막 달에는 약 ${formatCurrency(Math.round(lastPayment))}을 상환합니다.`;
        }
        document.getElementById('detailInfo').textContent = detailText;

        resultContainer.style.display = 'block';
        resultContainer.style.opacity = '0';
        setTimeout(() => {
            resultContainer.style.transition = 'opacity 0.5s ease';
            resultContainer.style.opacity = '1';
        }, 10);

        resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    function formatCurrency(value) {
        return value.toLocaleString('ko-KR') + '원';
    }

    function resetCalculator() {
        loanAmountInput.value = '';
        interestRateInput.value = '';
        loanPeriodInput.value = '';
        repaymentTypeSelect.selectedIndex = 0;
        resultContainer.style.display = 'none';
        
        localStorage.removeItem('loan_amount');
        localStorage.removeItem('loan_rate');
        localStorage.removeItem('loan_period');
        localStorage.removeItem('loan_type');
        
        loanAmountInput.focus();
    }

    function saveInputValues() {
        if (loanAmountInput.value) localStorage.setItem('loan_amount', loanAmountInput.value);
        if (interestRateInput.value) localStorage.setItem('loan_rate', interestRateInput.value);
        if (loanPeriodInput.value) localStorage.setItem('loan_period', loanPeriodInput.value);
        localStorage.setItem('loan_type', repaymentTypeSelect.value);
    }

    function restorePreviousValues() {
        const savedAmount = localStorage.getItem('loan_amount');
        const savedRate = localStorage.getItem('loan_rate');
        const savedPeriod = localStorage.getItem('loan_period');
        const savedType = localStorage.getItem('loan_type');

        if (savedAmount) loanAmountInput.value = savedAmount;
        if (savedRate) interestRateInput.value = savedRate;
        if (savedPeriod) loanPeriodInput.value = savedPeriod;
        if (savedType) repaymentTypeSelect.value = savedType;
    }

    function saveCalculationHistory(amount, rate, years, type, monthly, interest) {
        const history = JSON.parse(localStorage.getItem('loan_history') || '[]');
        
        history.push({
            amount: amount,
            rate: rate,
            years: years,
            type: type,
            monthlyPayment: Math.round(monthly),
            totalInterest: Math.round(interest),
            timestamp: new Date().toISOString(),
            date: new Date().toLocaleDateString('ko-KR')
        });

        if (history.length > 20) history.shift();
        localStorage.setItem('loan_history', JSON.stringify(history));
    }

    loanAmountInput.focus();
});
