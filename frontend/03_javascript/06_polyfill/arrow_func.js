/**
 * 箭头函数
 */
const show = () => {
    console.log(this)
}


// 普通函数
var _this = this
const show1 = function () {
    console.log(_this)
}