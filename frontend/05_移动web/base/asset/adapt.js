// 01 利用scale进行适配
// 能解决适配 和 retina屏的1px问题
//var scale = 1 / window.devicePixelRatio;
//var metaVp = '<meta name="viewport" content="user-scalable=no, initial-scale=' + scale + '" />';
//document.head.innerHTML = document.head.innerHTML + metaVp;
//
//var deviceCssWidth = document.documentElement.clientWidth;
//
//if (deviceCssWidth > 750 * (1 / scale)) deviceCssWidth = 750 * (1 / scale);
//
//document.documentElement.style.fontSize = deviceCssWidth / 7.5 + 'px';




var htmlDom = document.documentElement;
var deviceCssWidth = htmlDom.clientWidth;
console.log(deviceCssWidth);
if (deviceCssWidth > 750) {
    // 避免超出设计稿的大小
    deviceCssWidth = 750;
}

htmlDom.style.fontSize = 100 * deviceCssWidth / 750 + 'px';