


    /*
    *
    * 怪癖检测
    *
    * */

    // 1.0 IE8-中，如果某个实例属性与[[Enumerable]]标记为 false 的某个原型属性同名，
    //     那么该实例属性将不会出现在fon-in 循环当中。

    var hasDontEnumQuirk = function () {
        var o = { toString: function () {} };
        for (var prop in o) {
            if (prop === 'toString') {
                return false;
            }
        }
        return true;
    }();


    // 2.0 是 Safari 3 以前版本会枚举被隐藏的属性
    // 如果浏览器存在这个 bug，那么使用 for-in 循环枚举带有自定义的 toString()方法的对象，就
    // 会返回两个 toString 的实例
    var hasEnumShadowsQuirk = function(){
        var o = { toString : function(){} };
        var count = 0;
        for (var prop in o){
            if (prop == "toString"){
                count++;
            }
        }
        return (count > 1);
    }();