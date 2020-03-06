import { useState, useCallback } from "react";
import { useSelector } from "react-redux";

const CartCheckOut = ({ cartListState }) => {
    
    const couponsList = useSelector(state => state.product.couponsList);
    const [counponValue, setCouponValue] = useState(''); // 0.1, 10000
    const [counponTypeName, setCouponTypeName] = useState(''); // amount, rate

    const onChangeCouponOption = useCallback((e) => { // 쿠폰 type, value 선택 이벤트
        setCouponValue(e.target.value);
        setCouponTypeName(e.target.options[event.target.selectedIndex].dataset.name);
    }, [counponValue]);

    const selectedTotalAmount = (array) => { // 체크된 상품들의 총액 => 함수 컴포넌트로 빼기
        return array
        .filter(v => v.select === true)
        .map(v => v.totalPrice)
        .reduce((a,b) => a+b, 0);
    }
    const filteredForCouponTotalAmount = (array) => { // 쿠폰 적용 대상 상품의 총액 => 함수 컴포넌트로 빼기
        return array
        .filter(v => v.select === true)
        .filter(v => v.availableCoupon !== false)
        .map(v => v.totalPrice)
        .reduce((a,b) => a+b, 0);
    }
    const filteredExceptCouponTotalAmount = (array) => { // 쿠폰 적용 대상 상품의 총액 => 함수 컴포넌트로 빼기
        return array
        .filter(v => v.select === true)
        .filter(v => v.availableCoupon === false)
        .map(v => v.totalPrice)
        .reduce((a,b) => a+b, 0);
    }
    const discountAmount = (array) => { // 할인된 가격 (1000 혹은 10%)
        console.log('할인율', counponValue)
        console.log('쿠폰적용대상총액',filteredForCouponTotalAmount(array))
        if(counponTypeName === "rate") {
            return Number(filteredForCouponTotalAmount(array)) * (Number(counponValue))
        } else if (counponTypeName === "amount") {
            return Number(counponValue)
        } else {
            return 0;
        }
    }
    const finalAmount = (array) => { // 최종 가격 : 체크된 상품 총액 - 할인된 가격
        console.log('최종',selectedTotalAmount(array))
        console.log('할인된 금액 빼기',discountAmount(array))
        return selectedTotalAmount(array) - discountAmount(array);
    }
    const makeCouponsList = (array) => { // 쿠폰리스트 만들기 => 함수 컴포넌트로 빼기
        return array.map(v => {
            return (
                <option 
                    value={
                        v.type === "rate" ?  Number(v.discountRate/100) : v.type === "amount" ? Number(v.discountAmount) : null
                    }
                    data-name={v.type}
                >{v.title}</option>
            );
        });
    }

    return (
        <div className='cart-checkout'>
            <strong>주문 결산 금액</strong>
            <div className='cart-info-price'>
                <div>
                    <p>상품 금액</p>
                    <span>
                        {
                            selectedTotalAmount(cartListState).toLocaleString()
                        }원
                    </span>
                </div>
                <div>
                    <p>할인된 비용</p>
                    <span>
                        {
                            discountAmount(cartListState).toLocaleString()
                        }원
                    </span>
                </div>
                <div>
                <p>쿠폰 적용 대상 상품의 총액</p>
                    <span>
                        
                        {
                            filteredForCouponTotalAmount(cartListState).toLocaleString()
                        }원
                    </span>
                </div>
                <div>
                <p>쿠폰 적용 제외 대상 상품의 총액</p>
                    <span>
                        {
                            filteredExceptCouponTotalAmount(cartListState).toLocaleString()
                        }원
                    </span>
                </div>
                <div>
                    <p>배송비</p>
                    <span>0원</span>
                </div>
                <div>
                    {/* <p>할인비</p> */}
                    <select name="" id="" onChange={onChangeCouponOption}>
                        <option value="">할인 쿠폰 선택</option>
                        {
                            makeCouponsList(couponsList)                            
                        }
                    </select>

                </div>
                <div className='total-price'>
                    <p>총 결제 예정 금액</p>
                    <span>
                        {
                            finalAmount(cartListState).toLocaleString() 
                        }원
                    </span>
                </div>
                <button>주문하기</button>
            </div>
        </div>
    );
};

export default CartCheckOut;