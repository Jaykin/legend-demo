


        // 继承反转


        import React from 'react';

        export default function iiHocFunc(WrappedComponent) {
            return class Enhancer extends WrappedComponent {
                constructor() {
                    super();
                    this.state = {
                        inputVal: 'input 的渲染被劫持了！'
                    }
                }

                render() {
                    console.log('---------------II-------------------');
                    console.dir(this);
                    // 01 渲染劫持

                    const eleTree = super.render();
                    let children = eleTree.props.children;
                    let newProps = {
                        value: this.state.inputVal,
                        onChange: (e) => {
                            this.setState({ inputVal: e.target.value })
                        }
                    };

                    eleTree && (children = children.map(ele => {
                        if (ele.type === 'input') {
                            return React.cloneElement(ele, newProps);
                        }

                        return ele;
                    }));

                    return React.cloneElement(eleTree, { children });
                }
            }
        }