
import React from 'react';
import { render } from 'react-dom';

import { createStore, applyMiddleware } from 'redux';
import { rootReducer } from './reducers/index.js';

import Root from './container/Root.js';


const store = createStore(rootReducer);

render(
    <Root store={store}/>,
    document.getElementById('root')
)