// import _ from 'lodash';

import { cube } from './math';
import './index.css';

function component() {
    var element = document.createElement('div');
    var btn = document.createElement('button');

    element.innerHTML = 'Hello Webpak!';
    element.classList.add('hello');

    btn.innerHTML = 'Click me and check the console!';

    return element;
}

let element = component();
document.body.appendChild(element);