# Mixin 混合模式
>一种不用继承就可以复用的技术，即将一个对象的全部或部分拷贝到另一个对象上去，即添加组合过的属性   
>常用的复用技术是继承，子类会获得父类的所有属性（可能会继承多余的属性），如果只想复用现有对象的一些属性，mixin 是最好的选择

## Mixin Object 混合对象
>即组合对象的属性
```javascript
let obj = {
    a: 1,
    b: () => {}
}
const initMixin = {
    c: 'c',
    init: function () {}
}

function useMixin(target, mixin, opt = {}) {
    const { cover = true } = opt;

    Object.keys(mixin).forEach((key) => {
        if (!(key in target) || cover) {
            target[key] = mixin[key];
        }
    });
}

useMixin(obj, initMixin);
```

## Mixin Class 混合类
>即扩充类的原型
```javascript
function KlassA() {}
KlassA.prototype.isInit = false;
KlassA.prototype.init = () => {};

const helloMixin = {
    sayHello: function () {
        console.log('Hello!');
    }
};

function useMixin(target, mixin, opt) {
    const { cover = true } = opt;

    Object.keys(mixin).forEach((key) => {
        if (!target.prototype.hasOwnProperty(key) || cover) {
            target.prototype[key] = mixin[key];
        }
    });
}

useMixin(KlassA, helloMixin);
```