import React, { useCallback, useRef } from 'react';
import AppLayout from "../componets/AppLayout";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { LOAD_PRODUCTS_REQUEST, ADD_PRODUCT_MINICART_REQUEST, REMOVE_PRODUCT_MINICART_REQUEST, productState } from "../reducers/product";
import ProductsList from '../componets/products/ProductsList';
import MiniCart from '../componets/products/MiniCart';
import Pagination from "../componets/products/Pagination";

const products = () => {
    const dispatch = useDispatch();
    const { productsList, isLoadingList, isAddingProduct } = useSelector((state) => state.product);
    const cartList = useSelector((state) => state.product.cartList);
    const isLoading = useSelector((state) => state.product.isLoadingList);
    const [lists, setLists] = useState([]);
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 인덱스
    const [postsPerPage, setPostsPerPage] = useState(5); // 한 페이지당 나오는 포스트 수
    const [miniCartActive, setMiniCartActive] = useState(false); // 미니 카드 active
    const [pageNumberActive, setPageNumberActive] = useState(1); // 페이지네이션 개별 active

    // 현재 리스트들 가져오기(5개)
    const indexOfLastPost = currentPage * postsPerPage; // 1페이지의 경우, 1 * 5 = 5번째가 마지막 포스트 인덱스
    const indexOfFirstPost = indexOfLastPost - postsPerPage; // 1페이지의 경우 5 - 5 = 0번째가 첫번째 포스트 인덱스
    const currentPosts = lists.slice(indexOfFirstPost, indexOfLastPost);

    // 실제 화면에 렌더링될 lists 배열에 api에서 불러온 데이터 삽입
    useEffect(() => {
        setLists(productsList);
    }, [isLoadingList]);

    // 페이지 바꾸기
    const paginate = useCallback((pageNumber) => {
        setCurrentPage(pageNumber);
        setPageNumberActive(pageNumber);
    }, []);

    // 미니카드 담기
    const addMiniCart = useCallback((itemId) => {   
        const targetProductIndex = productsList.findIndex((v) => v.id === itemId); // 현재 선택한 id가 상품리스트 id랑 같은 index
        const targetCartIndex = cartList.findIndex((v) => v.id === itemId);
        setMiniCartActive(true);
        // 미니카트리스트 length가 3이상일 때 조건
        if (cartList.length > 2) {
            alert('3개까지만 담을 수 있습니다');
            return;
        } else if (targetCartIndex !== -1) {
            alert('장바구니에 이미 추가되었습니다.');
            return;
        } else {
            dispatch({
                type : ADD_PRODUCT_MINICART_REQUEST, // 상품을 미니카트에 추가하는 액션
                data : targetProductIndex
            });
        }
    }, [productsList, cartList]);

    // 미니카드에서 상품 삭제
    const removeMiniCart = useCallback((itemId) => {
        dispatch({
            type : REMOVE_PRODUCT_MINICART_REQUEST, // 상품을 미니카트에서 삭제하는 액션
            data : itemId
        });
        setMiniCartActive(true);
    }, []);
    
    // 미니카드 닫기
    const closeMiniCart = useCallback(() => {
        setMiniCartActive(false);
    }, [miniCartActive]);

    return (
        <AppLayout>
            {/* 상품리스트 영역 */}
            <div className='pages-wrap'>
                <ProductsList 
                    isLoading={isLoading} lists={currentPosts} addMiniCart={addMiniCart} removeMiniCart={removeMiniCart}
                />
                <Pagination 
                    postsPerPage={postsPerPage} totalPosts={lists.length} paginate={paginate} pageNumberActive={pageNumberActive}
                />
            </div>
            {/* 미니카드리스트 영역 */}
            <MiniCart 
                miniCartActive={miniCartActive}
                closeMiniCart={closeMiniCart}
                cartList={cartList}
                removeMiniCart={removeMiniCart}
            />
        </AppLayout>
    )
};

products.getInitialProps = async (context) => {
    context.store.dispatch({
        type : LOAD_PRODUCTS_REQUEST,
    });
};

export default products;

