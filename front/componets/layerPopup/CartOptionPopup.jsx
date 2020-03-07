import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

const CartOptionPopup = ({ 
    currentProduct, handleAddAmountCount, handleMinusAmountCount, amountCount, onClickSubmit, onClickPopupClose, popupActive, popupFade
}) => {

    return (
        popupActive ? 
        <div className={popupFade ? 'popup-wrapper cart-option fade-in' : 'popup-wrapper cart-option '}>
            <div className='overlay'></div>
            <div className='popup-wrapper_inner-wrapper'>
                <div className='popup-close-btn' onClick={() => onClickPopupClose(currentProduct.id)}><FontAwesomeIcon icon={faTimes} /></div>
                <div className='content'>
                    <div className='cover'><img src={currentProduct.coverImage} alt=""/></div>
                    <div className='info'>
                        <strong>{currentProduct.title}</strong>
                        <div className='info_amount'>
                            <p>수량</p>
                            
                            <div>
                                <button onClick={() => handleMinusAmountCount(currentProduct.id)}>-</button>
                                <span>{amountCount < 1 ? 1 : amountCount}</span>
                                <button onClick={() => handleAddAmountCount(currentProduct.id)}>+</button>
                            </div>
                        </div>
                        <div className='description'>
                            <p>*해당 상품에 대한 특이사항을 적습니다.</p>
                        </div>
                        <button type="button" className="btn btn-default" onClick={() => onClickSubmit(currentProduct.id)}>적용하기</button>
                    </div>
                </div>
            </div>

        </div>
        : null
    );
};

export default CartOptionPopup;