//import AppLayout from "../componets/AppLayout"; 헤더가 없는 경우도 존재하기 때문에 추가 안 함
import React from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import withRedux from 'next-redux-wrapper'; // App의 하이오더컴포넌트로 연결해 next가 store를 넣을 영역을 만든다
import withReduxSaga from 'next-redux-saga';
import { createStore, compose, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootSaga from '../sagas';
import { Provider } from 'react-redux';
import reducer from '../reducers';
import '../assets/styles.scss';
import "@fortawesome/fontawesome-free/css/all.min.css";
import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';

const App = ({ Component, store, pageProps }) => { // Component : next에서 넣어주는 props
    return (
        <Provider store={store}>
            <Head>
                <title>class 101</title>
                {/* css, js cdn 추가하는 곳 */}
            </Head>
            <Component {...pageProps} />
        </Provider>
    )
};

App.prototype = {
    Component : PropTypes.elementType, // page들
    store : PropTypes.object,
};

App.getInitialProps = async (context) => {
    console.log(context);
    const { ctx } = context;
    let pageProps = {};
    if (context.Component.getInitialProps) { // 페이지에 getInitialProps가 존재할 때만
        pageProps = await context.Component.getInitialProps(ctx);
    }
    return { pageProps };
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
})(withReduxSaga(App));