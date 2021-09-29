'use strict'

/**
 * 模板引擎
*/


/**
 * 01、ES6模板字符串实现
*/
const template01 = data => `
    <p>name: ${data.name}</p>
    <p>age: ${data.age}</p>
    <ul>
        ${data.skills.map(skill => `
            <li>${skill}</li>
        `).join('')}
    </ul>
`

const data = {
    name: 'Jay',
    age: 18,
    skills: ['JavaScript', 'NodeJS', 'CSS', 'HTML']
}

// console.log(template(data));



/**
 * 02、基于字符串替换
*/
var tpl = `
    <p>name: {{ name }}</p>
    <p>age: {{ age }}</p>
`;

function template02(tpl, data) {
    var reg = /\{\{\s*([a-zA-Z\.\_0-9]+)\s*\}\}/,
        match,
        code = ['var ret = [];'],
        idx,
        fn,
        pushCode = function (text) {
            code.push('ret.push(\'' + text.replace(/\s/g, '') + '\');')
        };

    while(match = reg.exec(tpl)) {
        idx = match.index;
        idx > 0 && pushCode(tpl.slice(0, idx));         
        code.push('ret.push(this.' + match[1] + ');');
        tpl = tpl.substring(match.index + match[0].length);
    }

    tpl && pushCode(tpl);
    code.push('return ret.join("");')
    fn = new Function(code.join(''));

    return fn.call(data);
}

// var html = template02(tpl, { name: 'Jay', age: '18' });
// console.log(html);


/**
 * 03、基于DOM
*/
function TemplateDOM(options) {
    this.dom = document.querySelector(options.el);
    this.data = options.data || {};
    this.render(this.dom);
}

TemplateDOM.prototype._data = {
    sTag: '{{',
    eTag: '}}'
}

TemplateDOM.prototype._injectData = function (node) {
    var _this = this,
        sTag = _this._data.sTag,
        eTag = _this._data.eTag,
        matchs = node.textContent.split(sTag),
        i = 0,
        len = matchs.length,
        match, ret = '';

    if (len) {
        for (; i < len; i++) {
            match = matchs[i].split(eTag);

            if (match.length == 1) {
                ret += matchs[i];
            } else {
                ret = _this.data[match[0].replace(/\s/g, '')];
            }
        }

        node.textContent = ret;
    } 
}

TemplateDOM.prototype.render = function (dom) {
    var attrs = dom.attributes || [],
        nodes = dom.childNodes || [],
        _this = this;

    Array.prototype.forEach.call(attrs, function (attr) {
        _this._injectData(attr)
    });

    Array.prototype.forEach.call(nodes, function (node) {
        if (node.nodeType === 1) {
            _this._injectData(node);
        } else {
            _this.render(node);
        }
    })
}

// var app = new TemplateDOM({
//     el: '#app',
//     data: {
//         name: 'Jay',
//         age: 18
//     }
// });