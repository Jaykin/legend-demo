/**
 * Created by Administrator on 2017/2/13.
 */
/*
*
* 函数表达式类型
*
* */
var func01 = function foo01() {}
new function foo02() { return null; }
(function foo03() {});
!function () {}
~function () {}
+function () {}
function foo() {
    return function () {
        // 这也是函数表达式形式
    }
}



// 作用域优先级
var ff = function ff(ff) {     // No3-形参 No4-函数表达式名===No5-定义的变量ff
    var ff = 2;             // No1
    function ff() {
        console.log(1);     // No2-函数声明提升
    }
    console.log(ff);
}
ff('ff');


// 有名字的函数表达式
(function() {
    var f = function f() {
        console.log(f);// function f()
        f = 1;          // 严格模式下：会报错Uncaught TypeError: Assignment to constant variable.
        console.log(f);// function f()
    }
    f();
    console.log(f);// function f()
})();

