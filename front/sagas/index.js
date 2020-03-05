import { all, call } from 'redux-saga/effects';
import axios from 'axios';
import product from './product';

export default function* rootSaga() {
    yield all([
        call(product),
    ]);
};