import { useState, useCallback } from "react";
import { useSelector } from "react-redux";
import { selectedTotalAmount, filteredForCouponTotalAmount, filteredExceptCouponTotalAmount, makeCouponsList } from "../FunctionalComponent";
import { MDBBtn } from 'mdbreact';

const CartCheckOut = ({ cartListState }) => {
    
    const couponsList = useSelector(state => state.product.couponsList);
    const [counponValue, setCouponValue] = useState(''); // ex. 0.1, 10000
    const [counponTypeName, setCouponTypeName] = useState(''); // ex. amount, rate
    
    // 쿠폰 type, value 선택 이벤트
    const onChangeCouponOption = useCallback((e) => { 
        setCouponValue(e.target.value);
        setCouponTypeName(e.target.options[event.target.selectedIndex].dataset.name);
    }, [counponValue]);

    // 할인된 가격 (counponTypeName(amount, rate)에 따라 계산될 리턴값 변경)
    const discountAmount = (array) => { 
        if(counponTypeName === "rate") {
            return Number(filteredForCouponTotalAmount(array)) * (Number(counponValue))
        } else if (counponTypeName === "amount") {
            return Number(counponValue)
        } else {
            return 0;
        }
    }

    // 최종 가격 : 체크된 상품 총액 - 할인된 가격
    const finalAmount = (array) => { 
        return selectedTotalAmount(array) - discountAmount(array); // 총 금액에서 할인된 금액 빼기
    }

    return (
        <div className='cart-checkout'>
            <strong>주문 결산 금액</strong>
            <div className='cart-info-price'>
                <div>
                    <p>총 상품 금액</p>
                    <span>{selectedTotalAmount(cartListState).toLocaleString()}원</span>
                </div>
                <div>
                <p>쿠폰 적용 대상 상품의 총액</p>
                    <span>{filteredForCouponTotalAmount(cartListState).toLocaleString()}원</span>
                </div>
                <div>
                <p>쿠폰 적용 제외 대상 상품의 총액</p>
                    <span>{filteredExceptCouponTotalAmount(cartListState).toLocaleString()}원</span>
                </div>
                <div>
                    <p>할인된 비용</p>
                    <span>- {discountAmount(cartListState).toLocaleString()}원</span>
                </div>
                <div>
                    <p>배송비</p><span>0원</span>
                </div>
                <div>
                    <select className="browser-default custom-select" name="" id="" onChange={onChangeCouponOption}>
                        <option value="">할인 쿠폰 선택</option>
                        {makeCouponsList(couponsList)}
                    </select>
                </div>
                <div className='total-price'>
                    <p>총 결제 예정 금액</p>
                    <span>{finalAmount(cartListState).toLocaleString()}원</span>
                </div>
                <MDBBtn>주문하기</MDBBtn>
            </div>
        </div>
    );
};

export default CartCheckOut;