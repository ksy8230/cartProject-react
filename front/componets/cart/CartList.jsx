import { memo } from "react";
import { isEmpty } from "../FunctionalComponent";
import Link from "next/link";

const CartList = memo(({ 
    cartListState, handleCheckProduct, onClickSetOptions
}) => {
    
    return (
        <div className='cart-list'>
            {
                isEmpty(cartListState) ? <div><p>장바구니에 담긴 상품들이 없습니다. <Link href='/products'><a>담으러 가기</a></Link></p></div>
                :
                <ul>
                    {
                        cartListState.map((v, i)=> {
                            return (
                                <li key={v.id}>
                                    <div className='cover'>
                                        <div className='custom-control custom-checkbox'>
                                            <input
                                                className="custom-control-input"
                                                id={v.id} 
                                                type="checkbox"
                                                checked={v.select}
                                                onChange={() => handleCheckProduct(event, v.id)}
                                            />
                                            <label 
                                                className='custom-control-label' 
                                                htmlFor={v.id}
                                            >
                                            <img src={v.coverImage} alt=""/>
                                            </label>
                                        </div>
                                    </div>
                                    <div className='info'>
                                        <p>{v.title}</p>
                                        <p>수량 : {v.amount}</p>
                                    </div>
                                    <div className='option'>
                                        <button onClick={() => onClickSetOptions(i)}>옵션 수정</button>
                                    </div>
                                    <div className='price'>
                                        <p>{(v.price * v.amount).toLocaleString()}원</p>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>

            }
        </div>
    );
});

export default CartList;