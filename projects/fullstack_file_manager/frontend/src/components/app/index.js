
import React, { Component } from 'react';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';

/** main */
import DataList from '../datalist';
import TypeManage from '../typemanage';
import SecManage from '../secmanage';
import FileUpload from '../fileupload';

// common
import Sider from '../sider';
import Position from '../position';

import './app.css';

import { positions, paths } from '../_utils/config';

class App extends Component {
    render() {
        const { pathname } = this.props.location;
        const { items, routes } = positions[pathname];

        return (
            <div className="ids-app-wrap">
                <Sider curPath={pathname} />
                <div className="ids-app-nav">
                    <Position opts={{ items, routes }} />
                </div>
                <div className="ids-app-main">
                    { this.props.children }
                </div>
            </div>
        )
    }
}

const Root = () => (
    <Router history={hashHistory}>
        <Route path="/" component={App}>
            <IndexRoute component={DataList} />
            <Route path={paths.ROUTE_DATALIST.route} component={DataList} />
            <Route path={paths.ROUTE_TYPEMANAGE.route} component={TypeManage} />
            <Route path={paths.ROUTE_SECMANAGE.route} component={SecManage} />
            <Route path={paths.ROUTE_FILEUPLOAD.route} component={FileUpload} />
        </Route>
    </Router>
);

export default Root;
