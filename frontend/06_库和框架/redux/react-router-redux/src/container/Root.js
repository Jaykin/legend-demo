
    // 设置主路由
import React, { PropTypes } from 'react';

import { Router, Route, browserHistory } from 'react-router';
import { Provider } from 'react-redux';

import App from './App.js';


    const Root = ({store}) => (
        <Provider store={store}>
            <Router history={browserHistory}>
                <Route path='/(:filter)' component={App}/>
            </Router>
        </Provider>
    )

    Root.propTypes = {
        store: PropTypes.object.isRequired,
    };

export default  Root;