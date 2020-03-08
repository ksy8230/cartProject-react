import React from 'react'
import productReducer, * as productActions from '../reducers/product';
import { initialState } from '../reducers/product';
import ProductsSource from '../source/productItems';

describe('Products', () => {
    describe('actions', () => {
        it('should create actions', () => {
            const expectedActions =[
                'LOAD_PRODUCTS_REQUEST',
                'LOAD_PRODUCTS_SUCCESS',
            ];
            const actions = [
                productActions.LOAD_PRODUCTS_REQUEST,
                productActions.LOAD_PRODUCTS_SUCCESS,
            ];
            expect(actions).toEqual(expectedActions);
        });
    });

    describe('reducers', () => {
        it('should return the initialState', () => {
            expect(productReducer(undefined, initialState)).toEqual(initialState);
        });
        it('should handle LOAD_PRODUCTS_REQUEST', () => {
            const requestAction = {
                type: productActions.LOAD_PRODUCTS_REQUEST
            };
            expect(productReducer({}, requestAction)).toEqual({"isLoadingList": true});
        });
        it('should handle LOAD_PRODUCTS_SUCCESS', () => {
            const successAction = {
                type: productActions.LOAD_PRODUCTS_SUCCESS,
                data: ProductsSource, 
            };
            expect(productReducer({}, successAction)).toHaveProperty('productsList', ProductsSource); // ProductsSource : 상품리스트 데이터
        });
    });
});

/* 추후 사용될 수 있는 코드들 (비동기, 리액트 리덕스를 사용하는 컴포넌트에 접근하는 방법에 관련)
import { render, fireEvent, waitForElement } from '@testing-library/react';
import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import { render, wait } from '@testing-library/react';
import Provider from 'react-redux';
import { createStore } from 'redux';
import { renderHook } from '@testing-library/react-hooks';

    function renderWithRedux(
        ui,
        { initialState, store = createStore(productReducer, initialState) } = {}
        ) {
        return {
            ...render(<Provider store={store}>{ui}</Provider>),
            store,
        }
    }
    const mock = new MockAdapter(axios, { delayResponse: 200 });
    const getPostMock = mock.onGet('hhttp://localhost:3001/productlist').reply(200, ProductsSource);
     describe('rendered page', () => {
         const mock = new MockAdapter(axios, { delayResponse: 200 });
         mock.onGet('http://localhost:3001/productlist').reply(200, ProductsSource);
        
         it('calls', async () => {
            const { getByText } = renderWithRedux(<Products />, {
                initialState: { isLoading: false }
              });
            await waitForElement(() => getByText('상품들이 로딩 중입니다.')); 
        })
    })
*/