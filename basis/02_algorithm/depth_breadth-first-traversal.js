
/**
 * JS深度优先、广度优先遍历算法
*/

var one = {
    key: 'one',
    value: '1',
    children: [{
        key: 'one-one',
        value: '1-1',
        children: [{
            key: 'one-one-one',
            value: '1-1-1',
            children: []
        }, {
            key: 'one-one-two',
            value: '1-1-2',
            children: []
        }]
    }, {
        key: 'one-two',
        value: '1-2',
        children: [{
            key: 'one-two-one',
            value: '1-2-1',
            children: []
        }]
    }]
}

var two = {
    key: 'two',
    value: '2',
    children: []
}

var three = {
    key: 'three',
    value: '3',
    children: [{
        key: 'three-one',
        value: '3-1',
        children: []
    }, {
        key: 'three-two',
        value: '3-2',
        children: [{
            key: 'three-two-one',
            value: '3-2-1',
            children: []
        }, {
            key: 'three-two-two',
            value: '3-2-2',
            children: []
        }]
    }]
}

var source = {
    one: one,
    two: two,
    three: three
}

var log = '';

// 广度优先搜索
function breadthFirstTraversal(source, goal) {
    // 深拷贝原始数据
    var dataSource = JSON.parse(JSON.stringify(source)),
        key, i,
        queue = [];     // 待搜索队列（动态增加长度 -- 即动态增长待搜索队列）

    for (key in dataSource) queue.push(dataSource[key]);

    for (i = 0; i < queue.length; i++) {
        var current = queue[i], result = [];
        
        if (current.value === goal) {
            // 匹配成功 -- 递归往上获取父节点数据
            return (function findParent(data) {
                result.unshift(data.key);
                if (data.parent) return findParent(data.parent);
                return result;
            })(current)
        }

        log += (current.value + '==>');
        
        if (current.children.length) {
            // 有子节点 -- 则将子节点先加入待搜索队列末端，从而动态改变queue长度，使其能一直遍历
            queue.push.apply(queue, current.children.map(function (child) {
                child.parent = current;
                return child;
            }));
        }
    }

    // 无搜索结果
    return [];
}
console.log('01、广度优先搜索开始.....');
var prevTime = +new Date;
console.log(breadthFirstTraversal(source, '3-2-2'));
console.log(+new Date - prevTime);
console.log(log + '3-2-2');
console.log('01、广度优先搜索结束.....');

log = '';
// 深度优先搜索
function depthFirstTraversal(source, goal) {
    var dataSource = JSON.parse(JSON.stringify(source)),
        stack = [],     // 待搜索栈
        key, i;

    for (key in dataSource) stack.push(dataSource[key]);
    
    while (stack.length) {
        var current = stack.shift(), result = [];

        if (current.value === goal) {
            // 匹配成功
            return (function findParent(data) {
                result.unshift(data.key);
                if (data.parent) return findParent(data.parent);
                return result;
            })(current)
        }

        log += (current.value + '==>');

        if (current.children.length) {
            // 有子节点
            stack.unshift.apply(stack, current.children.map(function (child) {
                child.parent = current;
                return child;
            }))
        }
    }

    // 无搜索结果
    return [];
}

console.log('02、深度优先搜索开始.....');
var prevTime = +new Date;
console.log(depthFirstTraversal(source, '3-2-2'));
console.log(+new Date - prevTime);
console.log(log + '3-2-2');
console.log('02、深度优先搜索结束.....');