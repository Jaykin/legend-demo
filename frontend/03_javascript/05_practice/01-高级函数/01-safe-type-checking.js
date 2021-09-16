
    /*
    *
    * 安全的类型检测
    *
    * */

    function isArray(value) {
        return Object.prototype.toString.call(value) === '[object Array]';
    }

    function isRegExp(value) {
        return Object.prototype.toString.call(value) === '[object RegExp]';
    }

    function isFunction(value) {
        return Object.prototype.toString.call(value) === '[object Function]';
    }

    function isNativeJSON(value) {
        window.JSON && Object.prototype.toString.call(value) === '[object JSON]';
    }

