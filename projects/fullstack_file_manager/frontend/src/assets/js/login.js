// 验证是否登录
const ajax = require('./util/ajax');
function validateLogin() {
    let userInfo = JSON.parse(window.sessionStorage.getItem('$'));
    if (!userInfo || !userInfo.token) {
        // 未登录
        message.warning('请先登录！');
        window.location.href = '/#/';
    }
}

function handleRootRouter(type) {
    let idsTop = document.getElementsByClassName('ids-top')[0];
    if (type == 'enter') {
        idsTop.style.display = 'none';
    } else {
        idsTop.style.display = 'block';
    }
}