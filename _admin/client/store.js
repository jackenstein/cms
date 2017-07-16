import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import 'babel-polyfill';

import API from './middleware/api';
import rootReducer from './reducers';

const INITIAL_STATE = {};

const store = createStore(
    rootReducer,
    INITIAL_STATE,
    applyMiddleware(
        thunk,
        API('http://dombutik.localhost:8080/api/'),
        logger()
    )
);

export default store;