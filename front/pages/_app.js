//import AppLayout from "../componets/AppLayout"; 헤더가 없는 경우도 존재하기 때문에 추가 안 함
import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper'; // App의 하이오더컴포넌트로 연결해 next가 store를 넣을 영역을 만든다
import { createStore, compose, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';
import { Provider } from 'react-redux';
import reducer from '../reducers';
import '../assets/styles.scss';

const App = ({ Component, store }) => { // Component : next에서 넣어주는 props
    return (
        <Provider store={store}>
            <Head>
                <title>class 101</title>
                {/* css, js cdn 추가하는 곳 */}
            </Head>
            <Component />
        </Provider>
    )
};

App.prototype = {
    Component : PropTypes.elementType,
    store : PropTypes.object,
};

export default withRedux((initialState) => { // 리듀서의 초기 state들에 접근
    const sagaMiddleware = createSagaMiddleware();
    const middlewares = [sagaMiddleware, (store) => (next) => (action) => {
        console.log(action);
        next(action);
    }];
    const enhancer = composeWithDevTools(
        applyMiddleware(...middlewares)
    );
    const store = createStore(reducer, initialState, enhancer); // state+reducer = store
    store.sagaTask = sagaMiddleware.run(rootSaga);
    return store;
})(App);