// AST 节点操作
const compiler = require('../index');

compiler.traverse(compiler.parser.parse(`
    const a = 1 * 2;
    a * 2;
`), {
    BinaryExpression(path) {
        // console.log(path.node);
        // 1、获取子节点的Path
        // console.log(path.get('left'));

        // 2、检查节点类型 及 属性值
        // console.log(compiler.t.isNumericLiteral(path.node.left));
        // console.log(compiler.t.isNumericLiteral(path.node.right, { value: 2, start: 19 }));
    },

    Identifier(path) {
        // console.log(path.node);
        // 3、检查标识符是否被引用
        // console.log(compiler.t.isReferenced(path.node, path.parent));
        // console.log(path.isReferencedIdentifier());
    }
});

// 4、获取同级路径
compiler.traverse(compiler.parser.parse(`
    var a = 1;  // pathA path.key=0
    var b = 2;  // pathB path.key=1
    var c = 3;  // pathC path.key=2
`), {
    VariableDeclaration(path) {
        // if (path.key !== 0) {
        //     return;
        // }
        // console.log(path.inList);
        // console.log(path.listKey);
        // console.log(path.key);
        // console.log(path.getSibling(0));
        // console.log(path.container);

        // 5、停止遍历
        // path.skip();     // 停止遍历当前路径的子节点
        // path.stop();     // 完全停止遍历
    }
});

// 5、替换节点
let ast = ''
compiler.traverse(ast = compiler.parser.parse(`
    function square(n) {
        return n * n;
    }
`), {
    // 单节点 替换 单节点
    BinaryExpression(path) {
        console.log('Enter BinaryExpression Visitor');
        const { left, operator, right } = path.node;
        if (compiler.t.isIdentifier(left, { name: 'n' }) && compiler.t.isIdentifier(right, { name: 'n' }) && operator === '*') {
            path.replaceWith(compiler.t.binaryExpression('**', path.node.left, compiler.t.numericLiteral(2)));
        }
    },
    // 多节点 替换 单节点
    ReturnStatement(path) {
        console.log('Enter ReturnStatement Visitor');
        path.replaceWithMultiple([
            path.node,
            compiler.t.expressionStatement(compiler.t.stringLiteral("Is this the real life?")),
            compiler.t.expressionStatement(compiler.t.stringLiteral("Is this just fantasy?")),
            compiler.t.expressionStatement(compiler.t.stringLiteral("(Enjoy singing the rest of the song in your head)"))
        ]);
    },
    // 用字符串源码替换节点
    FunctionDeclaration(path) {
        console.log('Enter FunctionDeclaration Visitor');
        path.replaceWithSourceString(`
            function add(a, b) {
                return a + b;
            }
        `);
    }
});
console.log(compiler.generator(ast).code);