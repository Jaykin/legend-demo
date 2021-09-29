const compiler = require('../index');

const code = `
    // 01、变量赋值
    /*S const hash = 'tt' S*/
    const hash = 'wx';

    // 02、语句增加 & if条件判断增加
    const a = true;
    const b = false;
    if (a && b) {
        a = 'ee';
    }

    // 03、
`

const ast = compiler.parser.parse(code);

const visitors = {
     // 变量声明
    VariableDeclaration(path) {
        if (path.node.__isReplaced) {
            delete path.node.__isReplaced;
            return;
        }
        const node = path.node;
        const comments = node.leadingComments || [];

        comments.forEach((comment) => {
            if (comment = isValidComment(comment)) {
                console.log('--- valid comment ---', `--${comment}--`);
                const newNode = compiler.template.ast(comment);
                newNode.__isReplaced = true;
                console.log(newNode);
                path.replaceWith(newNode);
            }
        });
    }
}

compiler.traverse(ast, visitors);

// console.log(JSON.stringify(ast, null, 2));
console.log('---------', compiler.generator(ast).code);

// 检验是否为有效的注释
function isValidComment(commentNode) {
    const value = commentNode.value;
    let ret = '';
    
    if (commentNode.type === 'CommentBlock' && (ret = /^S(.+)S$/.exec(value))) {
        return ret[1];
    }
}