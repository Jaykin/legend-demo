const parser = require('@babel/parser');
const traverse = require('@babel/traverse').default;
const generator = require('@babel/generator').default;
const t = require('@babel/types');
const template = require('@babel/template');

const code = `
    const a = 1;
    function square(n) {
        if (n === 1) return;
        return n * n;
    }`;

const ast = parser.parse(code);
// console.log(JSON.stringify(ast, null, 2));

const MyVistor = {
    Identifier(path) {
        const nodeName = path.node.name;

        if (nodeName === 'square') {
            path.node.name = 'temp';
        } else if (nodeName === 'a') {
            console.log(JSON.stringify(path.node, null, 2));
        }
        console.log(`Visiting: ${path.node.name}`);
    },
    VariableDeclaration(path) {
        if (path.node.kind === 'const') {
            path.node.kind = 'var';
        }
    }
}

traverse(ast, MyVistor);

const c = generator(ast).code;
console.log('---------------', c);


