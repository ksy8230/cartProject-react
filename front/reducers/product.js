export const initialState = {
    productsList : [], // 상품리스트
    cartList : [], // 카트에 담긴 리스트
    loadProductsListErrorReason : '', // 상품리스트 로드 에러
    isLoadingList : true, // 상품리스트들 불러오는 중
    isAddingProduct : true, // 미니카트에 상품 담는 중
    addingProductErrorReason : '', // 미니카트에 상품 담기 에러
};

// 상품리스트 로드 액션
export const LOAD_PRODUCTS_REQUEST = 'LOAD_PRODUCTS_REQUEST';
export const LOAD_PRODUCTS_SUCCESS = 'LOAD_PRODUCTS_SUCCESS';
export const LOAD_PRODUCTS_FAILURE = 'LOAD_PRODUCTS_FAILURE';
// 미니카트에 담긴 상품 로드 액션
export const LOAD_MINICART_PRODUCT_REQUEST = 'LOAD_MINICART_PRODUCT_REQUEST';
export const LOAD_MINICART_PRODUCT_SUCCESS = 'LOAD_MINICART_PRODUCT_SUCCESS';
export const LOAD_MINICART_PRODUCT_FAILURE = 'LOAD_MINICART_PRODUCT_FAILURE';
// 미니카트에 상품 추가 액션
export const ADD_PRODUCT_MINICART_REQUEST = 'ADD_PRODUCT_MINICART_REQUEST';
export const ADD_PRODUCT_MINICART_SUCCESS = 'ADD_PRODUCT_MINICART_SUCCESS';
export const ADD_PRODUCT_MINICART_FAILURE = 'ADD_PRODUCT_MINICART_FAILURE';
// 미니카트에서 상품 삭제 액션
export const REMOVE_PRODUCT_MINICART_REQUEST = 'REMOVE_PRODUCT_MINICART_REQUEST';
export const REMOVE_PRODUCT_MINICART_SUCCESS = 'REMOVE_PRODUCT_MINICART_SUCCESS';
export const REMOVE_PRODUCT_MINICART_FAILURE = 'REMOVE_PRODUCT_MINICART_FAILURE';

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
                isLoadingList : false,
                productsList : action.data,
            }
        }
        case LOAD_PRODUCTS_FAILURE : {
            return {
                ...state,
                loadProductsListErrorReason: '',
            }
        }
        // 
        case ADD_PRODUCT_MINICART_REQUEST : {
            return {
                ...state,
            }
        }
        case ADD_PRODUCT_MINICART_SUCCESS : {
            const productsList = state.productsList;
            const targetProduct = productsList[action.data];
            return {
                ...state,
                isAddingProduct : false,
                cartList : [...state.cartList, targetProduct],
            }
        }
        case ADD_PRODUCT_MINICART_FAILURE : {
            return {
                ...state,
                addingProductErrorReason: '',
            }
        }
        //
        case REMOVE_PRODUCT_MINICART_REQUEST : {
            return {
                ...state,
            }
        }
        case REMOVE_PRODUCT_MINICART_SUCCESS : {
            return {
                ...state,
                isAddingProduct : false,
                cartList : state.cartList.filter( v => v.id !== action.data)
            }
        }
        case REMOVE_PRODUCT_MINICART_FAILURE : {
            return {
                ...state,
            }
        }
        //
        case LOAD_MINICART_PRODUCT_REQUEST : {
            return {
                ...state,
            }
        }
        case LOAD_MINICART_PRODUCT_SUCCESS : {
            return {
                ...state,
                cartList : action.data
            }
        }
        case LOAD_MINICART_PRODUCT_FAILURE : {
            return {
                ...state,
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