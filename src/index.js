import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';

import InternalLinkRouter from 'internal-link-router';

import store from './store';
import routes from './routes';

import './styles/vars.css';

const container = document.getElementById('app-container');

ReactDOM.render((
    <Provider store={store}>
        <InternalLinkRouter>
            { routes }
        </InternalLinkRouter>
    </Provider>
), container);
