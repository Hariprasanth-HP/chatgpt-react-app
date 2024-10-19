// store.js

import { createStore, combineReducers } from 'redux';
import authReducer from './auth/reducer';

const rootReducer = combineReducers({
    user: authReducer,
});

const store = createStore(rootReducer);

export default store;
