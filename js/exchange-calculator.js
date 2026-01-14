// 환율 계산기 JavaScript
document.addEventListener('DOMContentLoaded', function() {
    const amountInput = document.getElementById('amount');
    const fromCurrencySelect = document.getElementById('fromCurrency');
    const toCurrencySelect = document.getElementById('toCurrency');
    const swapBtn = document.getElementById('swapBtn');
    const calculateBtn = document.getElementById('calculateBtn');
    const resetBtn = document.getElementById('resetBtn');
    const resultContainer = document.getElementById('result');

    // 참고용 환율 (KRW 기준)
    const exchangeRates = {
        KRW: 1,
        USD: 1300,      // 1 USD = 1,300 KRW
        EUR: 1420,      // 1 EUR = 1,420 KRW
        JPY: 8.9,       // 1 JPY = 8.9 KRW
        CNY: 179,       // 1 CNY = 179 KRW
        GBP: 1650,      // 1 GBP = 1,650 KRW
        AUD: 860,       // 1 AUD = 860 KRW
        CAD: 960,       // 1 CAD = 960 KRW
        CHF: 1480,      // 1 CHF = 1,480 KRW
        HKD: 166        // 1 HKD = 166 KRW
    };

    // 이전 입력값 복원
    restorePreviousValues();

    // 계산 버튼
    calculateBtn.addEventListener('click', calculateExchange);

    // 통화 교환 버튼
    swapBtn.addEventListener('click', swapCurrencies);

    // 초기화 버튼
    resetBtn.addEventListener('click', resetCalculator);

    // Enter 키 지원
    amountInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') calculateExchange();
    });

    // 입력값 저장
    [amountInput, fromCurrencySelect, toCurrencySelect].forEach(input => {
        input.addEventListener('input', saveInputValues);
        input.addEventListener('change', saveInputValues);
    });

    function calculateExchange() {
        const amount = parseFloat(amountInput.value);
        const fromCurrency = fromCurrencySelect.value;
        const toCurrency = toCurrencySelect.value;

        // 유효성 검사
        if (!validateInputs(amount, fromCurrency, toCurrency)) {
            return;
        }

        // 환율 계산
        // 1. 입력 통화를 KRW로 변환
        const amountInKRW = amount * exchangeRates[fromCurrency];
        
        // 2. KRW를 목표 통화로 변환
        const convertedAmount = amountInKRW / exchangeRates[toCurrency];

        // 3. 환율 정보
        const rate = exchangeRates[toCurrency] / exchangeRates[fromCurrency];

        displayResult(amount, convertedAmount, fromCurrency, toCurrency, rate);
        saveCalculationHistory(amount, fromCurrency, toCurrency, convertedAmount);
    }

    function validateInputs(amount, fromCurrency, toCurrency) {
        if (!amount || amount <= 0) {
            alert('금액을 입력해주세요.');
            amountInput.focus();
            return false;
        }

        if (fromCurrency === toCurrency) {
            alert('다른 통화를 선택해주세요.');
            return false;
        }

        return true;
    }

    function displayResult(fromAmount, toAmount, fromCurrency, toCurrency, rate) {
        // 결과 표시
        document.getElementById('fromLabel').textContent = fromCurrency;
        document.getElementById('fromAmount').textContent = formatAmount(fromAmount, fromCurrency);
        document.getElementById('toLabel').textContent = toCurrency;
        document.getElementById('toAmount').textContent = formatAmount(toAmount, toCurrency);

        // 환율 정보
        const rateText = `환율: 1 ${fromCurrency} = ${rate.toFixed(4)} ${toCurrency}`;
        document.getElementById('rateInfo').textContent = rateText;

        resultContainer.style.display = 'block';
        resultContainer.style.opacity = '0';
        setTimeout(() => {
            resultContainer.style.transition = 'opacity 0.5s ease';
            resultContainer.style.opacity = '1';
        }, 10);

        resultContainer.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }

    function formatAmount(amount, currency) {
        if (currency === 'JPY' || currency === 'KRW') {
            // 일본 엔화와 원화는 소수점 없이
            return Math.round(amount).toLocaleString('ko-KR');
        } else {
            // 기타 통화는 소수점 2자리
            return amount.toFixed(2).replace(/\B(?=(\d{3})+(?!\d))/g, ',');
        }
    }

    function swapCurrencies() {
        const temp = fromCurrencySelect.value;
        fromCurrencySelect.value = toCurrencySelect.value;
        toCurrencySelect.value = temp;
        
        saveInputValues();
        
        // 자동 재계산 (금액이 있는 경우)
        if (amountInput.value && parseFloat(amountInput.value) > 0) {
            calculateExchange();
        }
    }

    function resetCalculator() {
        amountInput.value = '1000';
        fromCurrencySelect.value = 'KRW';
        toCurrencySelect.value = 'USD';
        resultContainer.style.display = 'none';
        
        localStorage.removeItem('exchange_amount');
        localStorage.removeItem('exchange_from');
        localStorage.removeItem('exchange_to');
        
        amountInput.focus();
    }

    function saveInputValues() {
        if (amountInput.value) localStorage.setItem('exchange_amount', amountInput.value);
        localStorage.setItem('exchange_from', fromCurrencySelect.value);
        localStorage.setItem('exchange_to', toCurrencySelect.value);
    }

    function restorePreviousValues() {
        const savedAmount = localStorage.getItem('exchange_amount');
        const savedFrom = localStorage.getItem('exchange_from');
        const savedTo = localStorage.getItem('exchange_to');

        if (savedAmount) amountInput.value = savedAmount;
        if (savedFrom) fromCurrencySelect.value = savedFrom;
        if (savedTo) toCurrencySelect.value = savedTo;
    }

    function saveCalculationHistory(from, fromCurrency, toCurrency, to) {
        const history = JSON.parse(localStorage.getItem('exchange_history') || '[]');
        
        history.push({
            fromAmount: from,
            fromCurrency: fromCurrency,
            toAmount: to.toFixed(2),
            toCurrency: toCurrency,
            timestamp: new Date().toISOString(),
            date: new Date().toLocaleDateString('ko-KR')
        });

        if (history.length > 20) history.shift();
        localStorage.setItem('exchange_history', JSON.stringify(history));
    }

    // 주요 환율 표시 업데이트
    function updateRateList() {
        const rateListDiv = document.getElementById('rateList');
        const baseAmount = 1000; // KRW 기준
        
        const currencies = [
            { code: 'USD', flag: '🇺🇸' },
            { code: 'EUR', flag: '🇪🇺' },
            { code: 'JPY', flag: '🇯🇵' },
            { code: 'CNY', flag: '🇨🇳' }
        ];

        let html = '';
        currencies.forEach(currency => {
            const converted = baseAmount / exchangeRates[currency.code];
            const formattedAmount = formatAmount(converted, currency.code);
            html += `
                <div class="rate-item">
                    <span class="rate-currency">${currency.flag} ${currency.code}</span>
                    <span class="rate-value">≈ ${formattedAmount} ${currency.code}</span>
                </div>
            `;
        });

        rateListDiv.innerHTML = html;
    }

    // 초기 환율 표시 업데이트
    updateRateList();

    amountInput.focus();
});
