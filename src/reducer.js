import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import images from './reducers/images';

export default combineReducers({
    routing: routerReducer,
    appConfig: () => window.appConfig,
    images
});
