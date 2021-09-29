/**
 * Created by Administrator on 2017/2/7.
 */

import React from 'react';
import { render } from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import App from './containers/App';
import todoApp from './reducers/reducers';


let store = createStore(todoApp);
//console.dir(App);

let rootElement = document.getElementById('root');
render(
    <Provider store={store}>
        <App />
    </Provider>,
    rootElement
);
