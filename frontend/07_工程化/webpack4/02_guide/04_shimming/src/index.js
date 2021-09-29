import { file } from './globals';

function component() {
    var element = document.createElement('div');
    // 1、shimming 全局变量
    // element.innerHTML = _.join(['Hello', 'webpack'], ' ');
    element.innerHTML = _join(['Hello', 'webpack4'], ' ');

    // 2、细粒度 shimming
    // this.alert('This is a Alert');      // this => window

    // 3、全局 exports
    console.log(file);      // file is a global var from globals

    return element;
}

document.body.appendChild(component());