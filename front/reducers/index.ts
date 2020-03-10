import { combineReducers } from 'redux';
import product from './product';

const rootReducer = combineReducers({
    product,
});

export default rootReducer;

export type RootState = ReturnType<typeof rootReducer>;