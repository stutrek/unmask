// libraries
import React from 'react';
import { Router, Route, Redirect, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import { syncHistoryWithStore } from 'react-router-redux';

import LayoutWithHeader from './Layouts/LayoutWithHeader';

import Home from './Pages/Home';

import store from './store';

const history = syncHistoryWithStore(browserHistory, store);

const routes = (
    <Provider store={store}>
        <Router history={history}>
            <Route component={LayoutWithHeader}>
                <Route path="/" component={Home} />
            </Route>
            <Redirect from="*" to="/" />
        </Router>
    </Provider>
);

export default routes;
