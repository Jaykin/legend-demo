/**
 * 字符串扩展
 * 
*/

console.log("\u0061");          // >>a
console.log('\u{20BB7}');


// for ... of
let ss = String.fromCodePoint('0x20BB7');

for (let codePoint of ss) {
    console.log(codePoint);         // >>𠮷
}


// 模板字符串
let name = 'Jay';
let time = 'today';
var tplStr = `hello ${name}, how are u ${time}!`;
console.log(tplStr);                // >>hello Jay, how are u today!