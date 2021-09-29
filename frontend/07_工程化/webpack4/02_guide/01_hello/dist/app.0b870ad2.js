(window["webpackJsonp"] = window["webpackJsonp"] || []).push([[1],[
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(1);
/* harmony import */ var lodash__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(lodash__WEBPACK_IMPORTED_MODULE_0__);
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(4);
/* harmony import */ var _index_css__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(_index_css__WEBPACK_IMPORTED_MODULE_1__);
/* harmony import */ var _icon_jpg__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(5);
/* harmony import */ var _icon_jpg__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(_icon_jpg__WEBPACK_IMPORTED_MODULE_2__);
/* harmony import */ var _data_xml__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(6);
/* harmony import */ var _data_xml__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_data_xml__WEBPACK_IMPORTED_MODULE_3__);
/* harmony import */ var _print_js__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(7);
/* harmony import */ var _math__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(8);









function component() {
    var element = document.createElement('div');
    var btn = document.createElement('button');

    element.innerHTML = 'Hello Webpak!';
    element.classList.add('hello');

    btn.innerHTML = 'Click me and check the console!';
    btn.onclick = _print_js__WEBPACK_IMPORTED_MODULE_4__["default"];
    element.appendChild(btn);

    // 将图像添加到我们现有的 div。
    var myIcon = new Image(30, 30);
    myIcon.src = _icon_jpg__WEBPACK_IMPORTED_MODULE_2___default.a;
    element.appendChild(myIcon);

    return element;
}

let element = component();
document.body.appendChild(element);

// hmr
if (false) {}

/***/ }),
/* 1 */,
/* 2 */,
/* 3 */,
/* 4 */
/***/ (function(module, exports, __webpack_require__) {

// extracted by mini-css-extract-plugin

/***/ }),
/* 5 */
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "icon.jpg";

/***/ }),
/* 6 */
/***/ (function(module, exports) {

module.exports = {"note":{"to":["Mary"],"from":["John"],"heading":["Reminder"],"body":["Call Cindy on Tuesday"]}}

/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "default", function() { return printMe; });
function printMe() {
  console.log('Updating print.js...');
}

if (false) {}

/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
__webpack_require__.r(__webpack_exports__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "square", function() { return square; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "cube", function() { return cube; });
function square(x) {
    console.log('square');
    return x * x;
}

function cube(x) {
    console.log('cube');
    return x * x * x;
}

/***/ })
],[[0,0,2]]]);