
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';

import createLogger from 'redux-logger';

import { createStore, applyMiddleware } from 'redux';
import App from './containers/App';
import { todoApp } from './reducers/reducers';

import '../node_modules/todomvc-common/base.css';
import '../node_modules/todomvc-app-css/index.css'


const logger = createLogger();
const store = createStore(todoApp, applyMiddleware(logger));
window.store = store;
const rootElement = document.getElementById('todoapp');

render(
    <Provider store={store}>
        <Router history={browserHistory}>
            <Route path="/(:filter)" component={App} />
        </Router>
    </Provider>,
    rootElement
);


