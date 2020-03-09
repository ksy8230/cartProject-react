import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import Link from "next/link";

const ProductsList = ({ 
    isLoading, lists, addMiniCart, clickedPost 
}) => {

    return (
        <div className='products-list'>
            {
                isLoading ? <>상품들이 로딩 중입니다.</> 
                :
                <ul ref={clickedPost}>
                    {
                        lists.map( (v, i) => {
                            return (
                                <li key={i} className='product-box' data-id={v.id}>
                                    <Link href={{ pathname: '/product', query : {id : v.id}}} as={`/product/${v.id}`}><a className='link'></a></Link>
                                    <div className='cart-btn'>
                                        <span className='add' onClick={() => addMiniCart(v.id)}><FontAwesomeIcon icon={faShoppingCart} /></span>
                                    </div>
                                    <div className='cover'><img src={v.coverImage} alt=""/></div>
                                    <div className='info'>
                                        <p>{v.title}</p>
                                        <p className='price'>{v.price.toLocaleString()}원</p>
                                    </div>
                                </li>
                            )
                        })
                    }
                </ul>
            }
        </div>
    );
};

export default ProductsList;