/**
 * 装饰者模式
 * 
 * 概述：可以动态的给某个对象添加一些额外的职责，而不会影响从这个类中派生的其他对象；
 *      在不改变对象自身的基础上，在程序运行期间给对象动态的添加职责；
 *      跟继承相比，装饰者是一种更轻便灵活的做法；
*/

// 装饰对象 - easy
let plane = {
    fire: function () {
        console.log( '发射普通子弹' ); 
    }
};
const missileDecorator = function(){
    console.log( '发射导弹' );
}
const atomDecorator = function(){
    console.log( '发射原子弹' );
} 

const fire1= plane.fire;
plane.fire = function () {
    fire1();
    missileDecorator();
}

// 装饰函数
let aFunc = function () {
    console.log('aFunc');
};

function addBeforeFunc(fn, beforeFn) {
    return function () {
        beforeFn.apply(this, arguments);

        return fn.apply(this, arguments);
    }
}

function addAfterFunc(fn, afterFn) {
    return function () {    
        const ret = fn.apply(this, arguments);
        afterFn.apply(this, arguments);
        return ret;
    }
}

aFunc = addBeforeFunc(aFunc, function () {
    console.log('before aFunc');
});