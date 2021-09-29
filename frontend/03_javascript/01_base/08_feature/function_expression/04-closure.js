/**
 * Created by Administrator on 2017/2/13.
 */
/*
*
* 闭包
*
* */

    // 1.0 闭包与变量
function createFuncs01() {
    var result = [];

    for (var i = 0; i < 10; i++) {
        result[i] = function () {
            return i;
        }
    }

    return result;
}

var result01 = createFuncs01()[2]();
console.log(result01);              // 10


function createFuncs02() {
    var result = [];

    for (var i = 0; i < 10; i++) {
        result[i] = function (num) {
            return function () {
                return num;
            }
        }(i)
    }

    return result;
}

var result02 = createFuncs02()[2]();
console.log(result02);              // 2


    // this 对象
var name = 'The window';

var object = {
    name: 'My object',
    getGlobalNameFunc: function () {
        return function () {
            return this.name;
        }
    },
    getMyNameFunc: function () {
        var that = this;
        return function () {
            return that.name;
        }
    },
    getName: function () {
        return this.name;
    }
}

console.log(object.getGlobalNameFunc()());    // ‘The window’
console.log(object.getMyNameFunc()());    // ‘My object’

console.log(object.getName());      // 'The object'
console.log((object.getName)());    // 'The object'
console.log((object.getName = object.getName)());   // 'The window'




