import React, { useCallback, useRef } from 'react';
import Link from 'next/link';
import AppLayout from "../componets/AppLayout";
import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { LOAD_PRODUCTS_REQUEST, ADD_PRODUCT_MINICART_REQUEST, REMOVE_PRODUCT_MINICART_REQUEST, LOAD_MINICART_PRODUCT_REQUEST } from "../reducers/product";
import ProductsList from '../componets/ProductsList';
import Pagination from "../componets/Pagination";
import MiniCart from '../componets/MiniCart';

const products = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch({
            type : LOAD_PRODUCTS_REQUEST, // 상품리스트 로드 액션
        });
    }, []);
    const productsList = useSelector(state => state.product.productsList);
    const cartList = useSelector(state => state.product.cartList);
    const isLoading = useSelector(state => state.product.isLoadingList);
    const [lists, setLists] = useState(productsList);
    const [currentPage, setCurrentPage] = useState(1); // 현재 페이지 인덱스
    const [postsPerPage, setPostsPerPage] = useState(5); // 한 페이지당 나오는 포스트 수
    const [miniCartActive, setMiniCartActive] = useState(false); // 미니 카드 active

    const clickedPost = useRef(); // 현재 클릭한 상품 => *사용 안 할 예정

    // 현재 리스트들 가져오기(5)
    const indexOfLastPost = currentPage * postsPerPage; // 1페이지의 경우, 1 * 5 = 5번째가 마지막 포스트 인덱스
    const indexOfFirstPost = indexOfLastPost - postsPerPage; // 1페이지의 경우 5 - 5 = 0번째가 첫번째 포스트 인덱스
    const currentPosts = lists.slice(indexOfFirstPost, indexOfLastPost);

    // 페이지 바꾸기
    const paginate = useCallback((pageNumber) => {
        setCurrentPage(pageNumber);
    }, [cartList, productsList]);

    // 미니카드 담기
    const addMiniCart = useCallback((itemId) => {
        console.log(itemId)        
        const targetProductIndex = productsList.findIndex( v => v.id === itemId); // 현재 선택한 id가 상품리스트 id랑 같은 index
        const targetCartIndex = cartList.findIndex(v => v.id === itemId);

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
                type : ADD_PRODUCT_MINICART_REQUEST,
                data : targetProductIndex
            });
            // 현재 선택한 element 찾기
            /*const postElementsList = Array.prototype.slice.call(clickedPost.current.childNodes);
            const clickedElement = postElementsList.find(v => v.dataset.id === itemId);
            clickedElement.classList.add('selected');*/
        }
    }, [cartList]);
    // 미니카드에서 상품 삭제
    const removeMiniCart = useCallback((itemId) => {
        dispatch({
            type : REMOVE_PRODUCT_MINICART_REQUEST,
            data : itemId
        });
        setMiniCartActive(true);
        // 현재 선택한 element 찾기
        /*const postElementsList = Array.prototype.slice.call(clickedPost.current.childNodes);
        const clickedElement = postElementsList.find(v => v.dataset.id === itemId);
        clickedElement.classList.remove('selected');*/
    }, []);
    // 미니카드 닫기
    const closeMiniCart = () => {
        setMiniCartActive(false);
    };

    return (
        <>
            <AppLayout>
                {/* 상품리스트 영역 */}
                <div className='pages-wrap'>
                    <div className='products-list'>
                        <div>
                            {
                                isLoading ? <>상품들이 로딩 중입니다.</> 
                                :
                                <ProductsList 
                                    lists={currentPosts} addMiniCart={addMiniCart} removeMiniCart={removeMiniCart} clickedPost={clickedPost}
                                />
                            }
                        </div>
                    </div>
                    <Pagination 
                        postsPerPage={postsPerPage} totalPosts={lists.length} paginate={paginate}
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
        </>
    )
};

export default products;

