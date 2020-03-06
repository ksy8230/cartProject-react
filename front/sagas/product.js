import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import { LOAD_PRODUCTS_REQUEST, LOAD_PRODUCTS_SUCCESS, LOAD_PRODUCTS_FAILURE, ADD_PRODUCT_MINICART_REQUEST, ADD_PRODUCT_MINICART_SUCCESS, ADD_PRODUCT_MINICART_FAILURE, REMOVE_PRODUCT_MINICART_REQUEST, REMOVE_PRODUCT_MINICART_SUCCESS, REMOVE_PRODUCT_MINICART_FAILURE, LOAD_MINICART_PRODUCT_REQUEST, LOAD_MINICART_PRODUCT_SUCCESS, LOAD_MINICART_PRODUCT_FAILURE, LOAD_COUPONS_REQUEST, LOAD_COUPONS_SUCCESS, LOAD_COUPONS_FAILURE } from '../reducers/product';

function loadProducsListAPI() {
    return axios.get('http://localhost:3001/productlist');
}
function* loadProducsList(action) {
    try {
        const result = yield call(loadProducsListAPI, action.data);
        yield put({
            type : LOAD_PRODUCTS_SUCCESS,
            data : result.data,
        })
    } catch(e) {
        yield put({
            type : LOAD_PRODUCTS_FAILURE,
            error : e,
        })
    }
}
function* watchloadProducsList() {
    yield takeLatest(LOAD_PRODUCTS_REQUEST, loadProducsList);
}
//
function* addProduct(action) {
    try {
        yield put({
            type : ADD_PRODUCT_MINICART_SUCCESS,
            data : action.data,
        })
    } catch(e) {
        yield put({
            type : ADD_PRODUCT_MINICART_FAILURE,
            error : e.response,
        })
    }
}
function* watchlAddProduct() {
    yield takeLatest(ADD_PRODUCT_MINICART_REQUEST, addProduct);
}
//
function* removeProduct(action) {
    try {
        yield put({
            type : REMOVE_PRODUCT_MINICART_SUCCESS,
            data : action.data,
        })
    } catch(e) {
        yield put({
            type : REMOVE_PRODUCT_MINICART_FAILURE,
            error : e.response,
        })
    }
}
function* watchlRemoveProduct() {
    yield takeLatest(REMOVE_PRODUCT_MINICART_REQUEST, removeProduct);
}
//
function* loadMiniCartProductsList(action) {
    console.log(action.data)
    try {
        yield put({
            type : LOAD_MINICART_PRODUCT_SUCCESS,
            data : action.data,
        })
    } catch(e) {
        yield put({
            type : LOAD_MINICART_PRODUCT_FAILURE,
            error : e.response,
        })
    }
}
function* watchlLoadMiniCartProductsList() {
    yield takeLatest(LOAD_MINICART_PRODUCT_REQUEST, loadMiniCartProductsList);
}
//
function loadCouponsListAPI() {
    return axios.get('http://localhost:3001/coupon');
}
function* loadCouponsList(action) {
    try {
        const result = yield call(loadCouponsListAPI, action.data);
        yield put({
            type : LOAD_COUPONS_SUCCESS,
            data : result.data,
        })
    } catch(e) {
        yield put({
            type : LOAD_COUPONS_FAILURE,
            error : e.response,
        })
    }
}
function* watchlLoadCouponsList() {
    yield takeLatest(LOAD_COUPONS_REQUEST, loadCouponsList);
}
export default function* productSaga() {
    yield all([
        fork(watchloadProducsList),
        fork(watchlAddProduct),
        fork(watchlRemoveProduct),
        fork(watchlLoadMiniCartProductsList),
        fork(watchlLoadCouponsList),
    ]);
};