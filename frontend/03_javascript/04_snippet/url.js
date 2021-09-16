/**
 * URL 相关
 */

/*
* 解析一个URI链接的各部分
* @method getURI
* @param  {String} uri 传入的URI
* @return {Object}     {
    *         url : 传入的url
    *         scheme : 协议
    *         slash : 斜线
    *         host : 主机名
    *         port : 端口
    *         path : 路径
    *         query : 查询字符串
    *         hash : 锚点
    * }
*/
function getURI(url) {
    let parse_url = /^(?:([A-Za-z]+):)?(\/{0,3})([0-9.\-A-Za-z]+)(?::(\d+))?(?:\/([^?#]*))?(?:\?([^#]*))?(?:#(.*))?$/;
    let result = parse_url.exec(url);
    let re = {};
    let fields = [
        'url',
        'scheme',
        'slash',
        'host',
        'port',
        'path',
        'query',
        'hash'
    ];

    fields.forEach(function(field, i) {
        re[field] = result[i];
    });

    return re;
}

// 将url中参数字符串转化为对象
function stringToObj(str, decode = true) {
    let newstr = str.replace(/^[^\?#]*[\?#]/, '');
    let arr;
    const obj = {};
    const reg = new RegExp('(?:^|\\&)([^\\=\\&]+)(?:\\=([^\\&]*))?', 'g');
    while (arr = reg.exec(newstr)) {
        const key = decode ? decodeURIComponent(arr[1]) : arr[1];
        obj[key] = decode ? decodeURIComponent(arr[2] || '') : arr[2] || '';
    }
    return obj;
}

function getQueryObject(url) {
    let arr = url.split('?')[1].split('#')[0].split('&');

    const res = {};

    arr.forEach(e => {
        const [key, value] = e.split('=');
        if (!value) {
            res[key] = '';
        } else {
            res[key] = value;
        }
    })

    return res;
}