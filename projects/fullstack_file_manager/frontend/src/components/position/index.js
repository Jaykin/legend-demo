

import React from 'react';
import {Link} from 'react-router';

import { Icon } from 'antd';

import './position.css';

/*
 * @使用示例：
 *   <Position opts={{
 *       items: ["汽修资料库", "汽修资料列表"],
 *       routes：["/datalist", "/datalist"]
 *   }} />
 *
 * */

const Position = ({ opts }) => (
    <div className="ids-position-main">
        {
            opts.items.map((item, index, array) => (
                <div key={index} className="ids-position-item">
                    <Link to={opts.routes[index]}>{item}</Link>
                    {
                        index === array.length - 1 ? '' : <Icon type="right" />
                    }
                </div>
            ))
        }
    </div>
)


export default Position

