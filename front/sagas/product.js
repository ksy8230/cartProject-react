import { all, fork, put, takeLatest, call } from 'redux-saga/effects';
import axios from 'axios';
import { LOAD_PRODUCTS_REQUEST, LOAD_PRODUCTS_SUCCESS, LOAD_PRODUCTS_FAILURE } from '../reducers/product';

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

export default function* productSaga() {
    yield all([
        fork(watchloadProducsList),
    ]);
};