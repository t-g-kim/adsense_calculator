document.addEventListener('DOMContentLoaded', function() {
    // 할인 계산
    document.getElementById('calcDiscount').addEventListener('click', function() {
        const original = parseFloat(document.getElementById('originalPrice').value);
        const rate = parseFloat(document.getElementById('discountRate').value);
        
        if (isNaN(original) || isNaN(rate)) {
            alert('값을 입력해주세요.');
            return;
        }
        
        const discount = original * (rate / 100);
        const final = original - discount;
        
        document.getElementById('discountResult').innerHTML = `
            <p><strong>할인액:</strong> ${discount.toLocaleString()}원</p>
            <p><strong>최종가:</strong> ${final.toLocaleString()}원</p>
        `;
        document.getElementById('discountResult').style.display = 'block';
    });

    // 비율 계산
    document.getElementById('calcPercent').addEventListener('click', function() {
        const a = parseFloat(document.getElementById('valueA').value);
        const b = parseFloat(document.getElementById('valueB').value);
        
        if (isNaN(a) || isNaN(b) || b === 0) {
            alert('올바른 값을 입력해주세요.');
            return;
        }
        
        const percent = (a / b) * 100;
        
        document.getElementById('percentResult').innerHTML = `
            <p><strong>${a}</strong>는 <strong>${b}</strong>의 <strong>${percent.toFixed(2)}%</strong> 입니다</p>
        `;
        document.getElementById('percentResult').style.display = 'block';
    });

    // 증감률 계산
    document.getElementById('calcChange').addEventListener('click', function() {
        const before = parseFloat(document.getElementById('beforeValue').value);
        const after = parseFloat(document.getElementById('afterValue').value);
        
        if (isNaN(before) || isNaN(after) || before === 0) {
            alert('올바른 값을 입력해주세요.');
            return;
        }
        
        const change = ((after - before) / before) * 100;
        const changeText = change > 0 ? `증가` : `감소`;
        const changeIcon = change > 0 ? '📈' : '📉';
        
        document.getElementById('changeResult').innerHTML = `
            <p>${changeIcon} <strong>${Math.abs(change).toFixed(2)}%</strong> ${changeText}</p>
            <p>${before} → ${after}</p>
        `;
        document.getElementById('changeResult').style.display = 'block';
    });
});
