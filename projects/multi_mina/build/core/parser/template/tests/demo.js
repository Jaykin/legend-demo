const { parse, stringify } = require('../index');

// 无引号转义
// const html = `<view wx:if="{{a === true}}"class="{{ a ? 'yes' : 'no' }}"data-s='s'id="ss"></view>`;
// 有引号转义
const html = `<view wx:if="{{a === true}}"class="{{a===true?'\\"s\\"':'ss'}}" data="{\\"type\\":\\"nopay\\"}"></view>`;
// 引号值
// const html = `<view wx:if="{{a === true}}"class="{{ a ? 'yes' : 'no' }}"data-s='"'id="ss"></view>`;
console.log(html);
// console.log(JSON.stringify(html));
// console.log(JSON.stringify(parse(html), null, 4));
console.log(stringify(parse(html)));

// console.log(html.match(/(\w+)(?=\=")|((?<=\=")[^"]+)/g));

const buffer = Buffer.from(html);
console.log('ss', buffer.toString());
