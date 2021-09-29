import React, { Component } from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';

import { Menu, Icon } from 'antd';

import css from './sider.css';

import { sides } from '../_utils/config';

const SubMenu = Menu.SubMenu;
const MenuItemGroup = Menu.ItemGroup;


/*
* 使用示例：
*   <Sider current="1" openKeys={['sub1', 'sub2']} />
*
* */

class Sider extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openKeys: ['sub1']
        }
    }

    onOpenChange(openKeys) {
        const state = this.state;
        const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1));
        const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1));

        let nextOpenKeys = [];
        if (latestOpenKey) {
            nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
        }
        if (latestCloseKey) {
            nextOpenKeys = this.getAncestorKeys(latestCloseKey);
        }
        this.setState({ openKeys: nextOpenKeys });
    }

    getAncestorKeys(key) {
        const map = {};
        return map[key] || [];
    }

    handleClick(e) {

        console.dir(e);
        //this.props.fileUploadCompleted && this.setState({ current: e.key });
    }

    //shouldComponentUpdate(nextProps, nextState) {
    //    // 控制是否更新
    //    if (nextProps.fileUploadCompleted != this.props.fileUploadCompleted) {
    //        return false;
    //    } else {
    //        return true;
    //    }
    //}
    getCurrent() {
        const pathname = this.props.curPath;
        const subs = sides.subs;
        let current = 1;

        // 计算current值
        for (let key in subs) {
            if (subs[key].route === pathname) {
                current = subs[key].idx + 1;
            }
        }

        return current;    // number
    }

    render() {
        const { menus, subs } = sides;

        const { openKeys } = this.state;
        let current = this.getCurrent() + '';   // expected string

        return (
            <Menu
                mode="inline"
                openKeys={openKeys}
                selectedKeys={[current]}
                className="ids-sider-main"
                onOpenChange={this.onOpenChange.bind(this)}
                //onClick={(e) => this.handleClick(e)}
                >
                {
                    Object.keys(menus).map(id => {
                        let titleCpt = (
                            <span>
                                <Icon type="file-text"/>
                                <span>{menus[id].des}</span>
                            </span>
                        )

                        let MenuItems = menus[id].subs.map((subId, i) => (
                            <Menu.Item key={i + 1 + ''}>
                                <Link to={subs[subId].route}>{subs[subId].des}</Link>
                            </Menu.Item>
                        ))

                        return (
                            <SubMenu key={menus[id].id} title={titleCpt} >
                                { MenuItems }
                            </SubMenu>
                        )
                    })
                }
            </Menu>
        )
    }
}


export default Sider;