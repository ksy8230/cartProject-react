import Link from "next/link";

const MiniCart = ({ miniCartActive, closeMiniCart, cartList, removeMiniCart}) => {
    return (
        <div className={miniCartActive ? 'minicart-list active' : 'minicart-list'}>
            <div className='overlay' onClick={closeMiniCart}></div>
            {
                <div className='minicart-content'>
                    <strong>미니 장바구니 리스트</strong>
                    {
                        miniCartActive ? 
                        <>
                            {
                                cartList.map( v => {
                                    return (
                                        <div className='minicart-box'>
                                            <span className='subtract' onClick={() => removeMiniCart(v.id)}>x</span>
                                            <div className='cover'><img src={v.coverImage} alt=""/></div>
                                            <div className='info'>
                                                <p>{v.title}</p>
                                                <p>{v.price}원</p>
                                            </div>
                                        </div>
                                    )
                                })
                            }
                        </> 
                        : null
                    }
                    <div><button>바로 구매</button></div>
                    <div><button><Link href='/cart'><a>장바구니</a></Link></button></div>
                </div>
            }
        </div>
    );
};

export default MiniCart;