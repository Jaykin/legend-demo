

    // 延长作用域链--with
var variableObject = {
    a: 'a',
    b: 'b',
}

!function () {
    var aa = 'a';
    with(variableObject) {
        var show = a + aa;
    }
    console.log(show);      // 'aa'
}();


    // 延长作用域链--try-catch
try {
    throw new Error('我是try-catch测试哦');
} catch (e) {
    console.dir(e);
    var message = e.message;
}
console.log(message);   // '我是try-catch测试哦'


