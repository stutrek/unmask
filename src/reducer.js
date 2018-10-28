import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

import image from './reducers/image';

export default combineReducers({
    routing: routerReducer,
    appConfig: () => window.appConfig,
    image
});
