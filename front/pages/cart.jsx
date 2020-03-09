import { useSelector, useDispatch } from "react-redux";
import { useState, useCallback, useEffect } from "react";
import { LOAD_COUPONS_REQUEST } from "../reducers/product";
import CartOptionPopup from "../componets/layerPopup/CartOptionPopup";
import CartList from "../componets/cart/CartList";
import CartCheckOut from "../componets/cart/CartCheckOut";

const Cart = () => {
    const dispatch = useDispatch();
    let cartList = useSelector(state => state.product.cartList);
    const [cartListState, setCartListState] = useState([]); // 카트 상태값
    
    // 체크박스 state
    const [currentOptionIndex, setCurrentOptionIndex] = useState(''); // 클릭한 옵션의 상품 index
    // 옵션 팝업에 들어갈 정보 state
    const [currentProduct, setCurrentProduct] = useState(''); // 선택된 상품 객체
    const [amountCount, setAmountCount] = useState(1);
    // 팝업 열기 닫기 
    const [popupActive, setPopupActive] = useState(false);
    const [popupFade, setPopupFade] = useState(false);
    // 체크박스 유무에 사용될 select 옵션을 cartListState에 추가
    useEffect(() => {
        const insertSelectCartList = cartList.map(v => { 
            console.log('다른 state가 추가된 카트 리스트', v)
            return {
                select : false,
                amount : 1,
                totalPrice : v.price,
                id : v.id,
                title : v.title,
                coverImage : v.coverImage,
                price : v.price,
                score : v.score,
                availableCoupon : v.availableCoupon && v.availableCoupon,
            }
        });
        setCartListState(insertSelectCartList);
        // 할인 쿠폰 state 불러오기
        dispatch({
            type : LOAD_COUPONS_REQUEST
        });
    }, []);

    // 선택한 박스만 체크 핸들러
    const handleCheckProduct = (event, id) => {
        let checked = event.target.checked;
        setCartListState(
            cartListState.map(data => {
                if (data.id == id) {
                    data.select = checked;
                }
                return data;
            })
        )
    };
    // 옵션 버튼 클릭 이벤트
    const onClickSetOptions = useCallback((index) => {
        console.log(index)
        setPopupActive(true);
        const currentProduct = cartListState[index]; // 옵션 선택 상품
        setCurrentProduct(currentProduct);
        setAmountCount(currentProduct.amount); // 현재 선택한 옵션 상품의 amount 유지
        setCartListState(
            cartListState.map(data => {
                if (data.id == index) {
                    data.amount = currentProduct.amount;
                }
                return data;
            })
        );
        setTimeout(() => {
            setPopupFade(true);
        }, 500);
    }, [cartListState, currentProduct, amountCount, popupActive]);

    // 옵션 갯수 추가 핸들러
    const handleAddAmountCount = (index) => {
        setAmountCount(amountCount+1);
        setCartListState(
            cartListState.map(data => {
                if (data.id == index) {
                    data.amount = amountCount + 1;
                    data.totalPrice = data.price * (amountCount + 1);
                }
                return data;
            })
        );
        
    };
    // 옵션 갯수 빼기 핸들러
    const handleMinusAmountCount = (index) => {
        if(amountCount < 2) {
            setAmountCount(1);
        }else {
            setAmountCount(amountCount-1);
            setCartListState(
                cartListState.map(data => {
                    if (data.id == index) {
                        data.amount = amountCount - 1;
                        data.totalPrice = data.price * (amountCount - 1);
                    }
                    return data;
                })
            )
        }
    };
    // 옵션 설정 적용하기 이벤트
    const onClickSubmit = (index) => {
        setCartListState(
            cartListState.map(data => {
                if (data.id == index) {
                    data.amount = amountCount;
                }
                return data;
            })
        )
        setPopupActive(false); // 팝업 비활성
        setPopupFade(false); // 팝업 페이드인 비활성
    };

    return (
        <div className='pages-wrap wid1280'>
            <div className='pages-wrap_title'>
                <h2>장바구니</h2>
                <p>{cartList.length}개 상품</p>
            </div>

            <div className='cart-container'>
                {/* 카드에 담긴 상품들 디테일 정보 */}
                <CartList 
                    cartListState={cartListState} 
                    setCartListState={setCartListState}
                    handleCheckProduct={handleCheckProduct} // 선택된 상품의 체크박스 활성
                    onClickSetOptions={onClickSetOptions} // 옵션 적용 팝업 열기
                    amountCount={amountCount} // 적용된 수량
                />
                {/* 카트에 담긴 상품들 가격 정보 */}
                <CartCheckOut 
                    cartListState={cartListState}
                />
            </div>
            {/* 상품 옵셥 지정 팝업 */}
            <CartOptionPopup 
                currentProduct={currentProduct} // 현재 팝업에 뜰 상품 정보 객체
                amountCount={amountCount} // 수량 state
                handleAddAmountCount={handleAddAmountCount} // 수량 올리기
                handleMinusAmountCount={handleMinusAmountCount} // 수량 내리기
                onClickSubmit={onClickSubmit} // 적용하기
                popupActive={popupActive} // 팝업 활성 유무 state
                popupFade={popupFade} // 팝업 페이드인으로 보이기
            />
        </div>
    )
};

export default Cart;