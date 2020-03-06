import { useSelector } from "react-redux";

const CartList = ({ 
    cartListState, handleCheckProduct, 
    currentIndex, onClickSetOptions, 
    setCartListState, amountCount,
    currentOptionIndex
}) => {
    return (
        <div className='cart-list'>
            <ul>
                {
                    cartListState.map((v, i)=> {
                        return (
                            <li key={i}>
                                <div className='cover'>
                                    <div className='input-box'>
                                        <label>
                                            <input 
                                                name="isGoing"
                                                type="checkbox"
                                                checked={v.select}
                                                /*onChange={(event) => {
                                                    let checked = event.target.checked;
                                                    setCartListState(
                                                        cartListState.map(data => {
                                                            if(data.id === v.id) {
                                                                data.select = checked
                                                            }
                                                            return data;
                                                        })
                                                    )
                                                }}*/
                                                onChange={() => handleCheckProduct(event, v.id)}
                                            />
                                            <img src={v.coverImage} alt=""/>
                                        </label>

                                    </div>
                                    
                                </div>
                                <div className='info'>
                                    <p>{v.title}</p>
                                    <p>수량 : 
                                        {v.amount}
                                    </p>
                                </div>
                                <div className='option'>
                                    <button onClick={() => onClickSetOptions(i)}>옵션 적용</button>
                                </div>
                                <div className='price'>
                                    <p className='price'>
                                        {(v.price * v.amount).toLocaleString()}원
                                    </p>
                                </div>
                            </li>
                        )
                    })
                }
            </ul>
        </div>
    );
};

export default CartList;