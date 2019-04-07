// babel 插件

module.exports = function ({ types: t }) {
    return {
        visitor: {
            BinaryExpression(path) {
                console.log('BinaryExpression');
                if (path.node.operator !== '===') {
                    return;
                }

                path.node.left = t.ididentifier('sedmck');
                path.node.right = t.identifier("dork");
            }
        }
    }
}