// core imports
import { createStore, applyMiddleware } from 'redux';
// import { routerMiddleware } from 'react-router-redux';

import rootReducer from './reducer'
// middleware
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';

let store;

// const createdRouterMiddleware = routerMiddleware(browserHistory);

if (!localStorage.getItem('logs')) {
    store = createStore(
        rootReducer,
        // initialState,
        applyMiddleware(
            thunk,
            // createdRouterMiddleware,
        )
    );
} else {
    // compose allow store to use middleware, devTools and other utils
    store = createStore(
        rootReducer,
        // initialState,
        applyMiddleware(
            thunk,
            // createdRouterMiddleware,
            createLogger(),
        )
    );
}

export default store;
