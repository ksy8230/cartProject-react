import AppLayout from "../componets/AppLayout";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from "react";
import { LOAD_PRODUCTS_REQUEST } from "../reducers/product";

const products = () => {
    const dispatch = useDispatch();
    const productsList = useSelector(state => state.product.productsList);
    useEffect(() => {
        dispatch({
            type : LOAD_PRODUCTS_REQUEST, // 상품리스트 로드 액션
        });
    }, []);

    return (
        <>
            <AppLayout>
                <div className='pages-wrap'>
                    <div className='products-list'>
                        <ul>
                            {
                                productsList.map((v,i) => {
                                    return (
                                        <>
                                            <li className='product-box'>
                                                <div><img src={v.coverImage} alt=""/></div>
                                                <div>
                                                    <p>{v.title}</p>
                                                    <p>{v.price}</p>
                                                </div>
                                            </li>
                                        </>
                                    )
                                })
                            }
                        </ul>
                    </div>
                </div>
            </AppLayout>
        </>
    )
};

export default products;

