// htmp 元素（Wrapper 用来消除不同类型元素的差异）
class ElementWrapper {
    constructor(type) {
        this.root = document.createElement(type);
    }

    setAttribute(name, value) {
        if (name === 'className') {
            name = 'class';
        }

        if (name.match(/on([\s\S]+)$/)) {
            // 事件监听
            let eventName = RegExp.$1.toLowerCase();
            this.root.addEventListener(eventName, value);
        } else {
            // 其他 attrs
            this.root.setAttribute(name, value);
        }
    }

    appendChild(vchild) {
        vchild.mountTo(this.root);
    }

    mountTo(parent) {
        parent.appendChild(this.root);
    }
}

// html 文本元素
class TextWrapper {
    constructor(content) {
        this.root = document.createTextNode(content);
    }

    mountTo(parent) {
        parent.appendChild(this.root);
    }
}

// React 自定义组件
export class Component {
    constructor() {
        this.props = Object.create(null);
        this.children = [];
    }

    setAttribute(name, value) {
        if (name.match(/on([\s\S]+)$/)) {
            // TODO:Component 事件监听
            let eventName = RegExp.$1.toLowerCase();
            console.log('Component:' + eventName);
        }

        this.props[name] = value;
    }

    appendChild(vchild) {
        this.children.push(vchild);
    }

    mountTo(parent) {
        let vdom = this.render();
        vdom.mountTo(parent);
    }

    setState(state) {
        let merge = (oldState, newState) => {
            for (let p in newState) {
                if (typeof newState[p] === 'object') {
                    if (typeof oldState[p] !== 'object') {
                        oldState[p] = {};
                    }

                    merge(oldState[p], newState[p]);
                } else {
                    oldState[p] = newState[p];
                }
            }
        }

        if (!this.state && state) {
            this.state = {};
        }

        merge(this.state, state);
    }
}

export const ToyReact = {
    /**
     * @returns {Component} 组件实例
    */
    createElement(type, attrs, ...children) {
        let element;

        // 1、创建元素
        if (typeof type === 'string') {
            // html 标签名字符串
            element = new ElementWrapper(type);
        } else {
            // React 组件（类/函数）
            element = new type;

            if (!(element instanceof Component)) {
                // 函数组件，直接调用即可
                element = type(attrs);
            }
        }

        // 2、增加 attrs
        for (let name in attrs) {
            element.setAttribute(name, attrs[name]);
        }

        // 3、增加 child
        let insertChildren = (children) => {
            for (let child of children) {
                if (typeof child === 'object' && child instanceof Array) {
                    insertChildren(child);
                } else {
                    if (
                        !(child instanceof Component) &&
                        !(child instanceof ElementWrapper) &&
                        !(child instanceof TextWrapper)
                    ) {
                        child = String(child);
                    }

                    if (typeof child === "string") {
                        child = new TextWrapper(child);
                    }

                    element.appendChild(child);
                }
            }
        }
        insertChildren(children);

        return element;
    },

    // 渲染
    render(vdom, containerDom, callback) {
        vdom.mountTo(containerDom);
    }
}