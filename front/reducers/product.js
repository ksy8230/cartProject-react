export const initialState = {
    productsList : [], // 상품리스트
    cartList : [], // 카트에 담긴 리스트
    loadProductsListErrorReason : '', // 상품리스트 로드 에러
};

// 상품리스트 로드 액션
export const LOAD_PRODUCTS_REQUEST = 'LOAD_PRODUCTS_REQUEST';
export const LOAD_PRODUCTS_SUCCESS = 'LOAD_PRODUCTS_SUCCESS';
export const LOAD_PRODUCTS_FAILURE = 'LOAD_PRODUCTS_FAILURE';

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case LOAD_PRODUCTS_REQUEST : {
            return {
                ...state,
            }
        }
        case LOAD_PRODUCTS_SUCCESS : {
            return {
                ...state,
                productsList : action.data,
            }
        }
        case LOAD_PRODUCTS_FAILURE : {
            return {
                ...state,
                loadProductsListErrorReason: '',
            }
        }
        default : {
            return {
                ...state,
            }
        }
    }
};

export default reducer;