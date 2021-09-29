import _ from 'lodash';

import './index.css';
import Icon from './icon.jpg';
import Data from './data.xml';

import printMe from './print.js';
import { cube } from './math';

function component() {
    var element = document.createElement('div');
    var btn = document.createElement('button');

    element.innerHTML = 'Hello Webpak!';
    element.classList.add('hello');

    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = printMe;
    element.appendChild(btn);

    // 将图像添加到我们现有的 div。
    var myIcon = new Image(30, 30);
    myIcon.src = Icon;
    element.appendChild(myIcon);

    return element;
}

let element = component();
document.body.appendChild(element);

// hmr
if (module.hot) {
    module.hot.accept('./print.js', function () {
        console.warn('Accepting the updated module!');
        // 更新试图
        document.body.removeChild(element);
        element = component();
        document.body.appendChild(element);
    });

    // module.hot.addStatusHandler(status => {
    //     // 响应当前状态……
    //     console.warn('status', status);
    // });
}