import { useSelector } from "react-redux";

const ProductsList = ({ lists, addMiniCart, removeMiniCart, clickedPost }) => {
    return (
        <ul ref={clickedPost}>
            {
                lists.map( (v, i) => {
                    return (
                        <li key={i} className='product-box' data-id={v.id}>
                            <div className='cart-btn'>
                                <span className='add' onClick={() => addMiniCart(v.id)}>장바구니 아이콘</span>
                                {/* <span className='subtract' onClick={() => removeMiniCart(v.id, i)}>빼기</span> */}
                            </div>
                            <div className='cover'><img src={v.coverImage} alt=""/></div>
                            <div className='info'>
                                <p>{v.title}</p>
                                <p className='price'>{v.price}원</p>
                            </div>
                        </li>
                    )
                })
            }

        </ul>
    );
};

export default ProductsList;