import { useSelector } from "react-redux";

const CartOptionPopup = ({ currentProduct, handleAddAmountCount, handleMinusAmountCount, amountCount, onClickSubmit, onClickPopupClose, popupActive }) => {
    //const couponsList = useSelector(state => state.product.couponsList);
    return (
        popupActive ? 
        <div className='popup-wrapper cart'>
            <div className='overlay'></div>
            <div className='content'>
                <div className='popup-close-btn' onClick={() => onClickPopupClose(currentProduct.id)}>닫기</div>
                <div className='cover'><img src={currentProduct.coverImage} alt=""/></div>
                <div className='info'>
                    <strong>{currentProduct.title}</strong>
                    <div className='info_amount'>
                        <p>수량</p>
                        <span>{amountCount < 1 ? 1 : amountCount}</span>
                        <div>
                            <button onClick={() => handleMinusAmountCount(currentProduct.id)}>-</button>
                            <button onClick={() => handleAddAmountCount(currentProduct.id)}>+</button>
                        </div>
                    </div>

                    <button onClick={() => onClickSubmit(currentProduct.id)}>적용하기</button>
                </div>
            </div>
        </div>
        :null
    );
};

export default CartOptionPopup;