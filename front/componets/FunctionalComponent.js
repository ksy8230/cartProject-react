
// 장바구니 > select === true인 상품들의 총액 구하기
export const selectedTotalAmount = (array) => { 
    return array
    .filter(v => v.select === true)
    .map(v => v.totalPrice)
    .reduce((a,b) => a+b, 0);
}

// 장바구니 > 쿠폰 적용 대상 상품의 총액 구하기
export const filteredForCouponTotalAmount = (array) => { 
    return array
    .filter(v => v.select === true)
    .filter(v => v.availableCoupon !== false)
    .map(v => v.totalPrice)
    .reduce((a,b) => a+b, 0);
}

// 장바구니 > 쿠폰 적용 '제외' 대상 상품의 총액 구하기
export const filteredExceptCouponTotalAmount = (array) => { 
    return array
    .filter(v => v.select === true)
    .filter(v => v.availableCoupon === false)
    .map(v => v.totalPrice)
    .reduce((a,b) => a+b, 0);
}

// 장바구니 > 쿠폰리스트 만들기
export const makeCouponsList = (array) => { 
    return array.map((v, i) => {
        return (
            <option key={i}
                value={
                    v.type === "rate" ?  Number(v.discountRate/100) : v.type === "amount" ? Number(v.discountAmount) : null
                }
                data-name={v.type}
            >{v.title}</option>
        );
    });
}

// 빈 배열 체크하기
export const isEmpty = (array) => {
    if(array === "" || array === null || array === undefined || 
    (array !== null && typeof array === 'object' && !Object.keys(array).length)) {
        return true;
    } else {
        return false;
    };
}

// 페이지네이션 넘버링 만들기
export const paginationArray = (totalValue, setPerValue, array) => {
    for (let i = 1; i <= Math.ceil(totalValue / setPerValue); i++) {
        array.push(i);
    };
    return array;
}

