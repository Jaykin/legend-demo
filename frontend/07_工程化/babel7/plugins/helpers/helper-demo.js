// helper
const helpers = require('@babel/helpers');
const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generator = require('@babel/generator').default;
const t = require('@babel/types');

// 1、源代码
const code = `
    function square(n) {
        if (typeof n === 'string') return;
        return n * n;
    }`;

// 2、生成 AST
const ast = parser.parse(code);

// 3、定义 visitor，用来处理节点
const visitors = {
    Program(path) {
        // 使用 babel 的 helper
        const typeofHelper = helpers.get('typeof');
        path.insertAfter(typeofHelper.nodes[0]);
        // console.log(JSON.stringify(typeofHelper, null, 2));
        // console.log(path);
    }
}
traverse(ast, visitors);

// 4、生成目标代码
console.log('----------------------------');
console.log(generator(ast).code);