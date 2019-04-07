/**
 * 实现虚拟DOM算法
*/

var _utils = {
    isString: function (data) {
        return Object.prototype.toString.call(data) === '[object String]'
    },

    // 设置DOM节点的属性
    setAttribute: function (node, key, value) {
        switch (key) {
            case 'style':
              node.style.cssText = value;
              break
            case 'value':
              var tagName = node.tagName || '';

              tagName = tagName.toLowerCase();

              if (
                tagName === 'input' || tagName === 'textarea'
              ) {
                node.value = value
              } else {
                node.setAttribute(key, value);
              }
              break
            default:
              node.setAttribute(key, value);
              break
        }
    }
}

(function (context) {
/**
 * 1.0、创建JS DOM 对象
 * */ 
    function Element(tagName, props, children) {
        var count = 0;

        this.tagName = tagName;
        this.props = props;
        this.children = children || [];
        this.key = props.key || void 666;

        // this.children.forEach(function (child, idx) {
        //     if(child instanceof Element) {
        //         count += child.count;
        //     } else {
        //         children[idx] = '' + child;
        //     }

        //     count++;
        // });

        // this.count = count;
    }

        // 将JS对象渲染为真实DOM
    Element.prototype.render = function () {
        var el = document.createElement(this.tagName),
            props = this.props,
            children = this.children || [],
            propName;

        // 设置节点属性
        for (propName in props) {
            _utils.setAttribute(el, propName, props[propName])
        }

        // 创建子节点
        children.forEach(function (child) {
            var childEl = (child instanceof Element) ? child.render() : document.createTextNode(child);

            el.appendChild(childEl);
        });

        return el;
    }

    function createElement(tagName, props, children) {
        return new Element(tagName, props, children);
    } 


/**
 * 2.0、比较虚拟DOM树的差异
 * */
        // 差异类型数据结构
    var patchType = {
        TEXT: '1',          // 文本节点内容变更
        REPLACE: '2',       // 替换节点
        PROPS: '3',         // 节点属性变化
        REORDER: '4'
    }

        // 对比两颗虚拟DOM树 
    function diffDomTree(oldTree, newTree) {
        var index = 0,      // 当前节点的标志
            patches = {};   // 用来记录每个节点差异的对象
        
        // 深度优先遍历
        dfsWalk(oldTree, newTree, index, patches);

        return patches;
    }

        // 对比props
    function diffProps(oldProps, newProps) {
        var key, prop, propsPatches = {}, isSame = true;

            // 找出不同的prop
        for (key in oldProps) {
            prop = oldProps[key];

            if (newProps[key] !== prop) {
                propsPatches[key] = newProps[key];
                isSame = false;
            }
        }

            // 找出新的prop
        for (key in newProps) {
            prop = newProps[key];

            if (!oldProps.hasOwnProperty(key)) {
                propsPatches[key] = newProps[key];
                isSame = false;
            }
        }

        // prop都相同，返回null
        if (isSame) return null; 

        // props有不同，返回patchs
        return propsPatches;
    }

        // 对比children
    function diffChildren(oldChildren, newChildren, index, patchs, currentPatch) {
        var diffs = diff(oldChildren, newChildren, 'key'),
            reorderPatch, newChild,
            leftNode = null;

        newChildren = diffs.children;

        if (diffs.moves.length) {
            reorderPatch = { type: patchType.REORDER, moves: diffs.moves }
            currentPatch.push(reorderPatch);
        }

        oldChildren.forEach(function (child, idx) {
            newChild = newChildren[idx];
            index = (leftNode && leftNode.count)
                ? index + leftNode.count + 1
                : index + 1;

            dfsWalk(child, newChild, index, patches);
            leftNode = child;
        });
    }

        // 深度优先遍历搜索
    function dfsWalk(oldNode, newNode, index, patches) {
        var currentPatch = [];

        if(newNode === null) {
            // 节点已删除，do nothing
        } else if (isString(oldNode) && isString(newNode)) {
            // 文本节点，则替换文本即可
            newNode !== oldNode && currentPatch.push({ type: patchType.TEXT, content: newNode });
        } else if (
            oldNode.tagName === newNode.tagName &&
            oldNode.key === newNode.key
        ) {
            // 节点标签名和key值相同，则比较props和children
            // 1.0、diff props
            var propsPatches = diffProps(oldNode.props, newNode.props);

            propsPatches && currentPatch.push({ type: patchType.PROPS, props: propsPatches });

            // 2.0、diff children，如果有ignore属性，则不用diff children
            newNode.props && 
            newNode.props.hasOwnProperty('ignore') &&
            diffChildren(oldNode.children, newNode.children, index, patchs, currentPatch);

        } else {
            // 节点完全不同，则直接用新节点替换旧节点
            currentPatch.push({ type: patchType.REPLACE, node: newNode })
        }

        // 添加patch
        if (currentPatch.length) patches[index] = currentPatch;
    }


/**
 * 3.0、把记录的差异应用到真正的DOM树上
*/



    // 定义对外的接口
    context.VDOM = {
        createElement: createElement,
    }
})(this);