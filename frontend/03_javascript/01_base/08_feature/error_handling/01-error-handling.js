

    /*
    *
    * try-catch-finally
    *
    * */
        // 1.0
    try {
        window.noneFunc();
    } catch(error) {
        alert(error.message);
        console.dir(error);
    }

        // 2.0 finally子句
    var result = function () {
        try {
            //return 'try';
            return a;
        } catch(error) {
            console.dir(error);
            return 'catch';
        } finally {
            return 'finally';
        }
    }();
    console.log(result);        // ‘finally’


        // 3.0 错误类型
    var item01 = new Array(-20);    // Uncaught RangeError: Invalid array length
    var item02 = new Array(Number.MAX_VALUE);   // Uncaught RangeError: Invalid array length

    var resultError = function () {
    try {
        return b;
    } catch(error) {
        if (error instanceof TypeError) {
            return 'TypeError';
        } else if (error instanceof ReferenceError) {
            return 'ReferenceError';
        } else {
            return 'error';
        }
    }
    }();
    console.log(resultError);       // ReferenceError


        // 4.0 抛出错误
    try {
        throw new TypeError('类型错误');
        throw 'hello';
        throw { message: 'hello' }
    } catch(error) {
        console.dir(error);
    }
    setTimeout(function () {
        console.log('yibu');        // 这里仍会执行
    }, 1000);

            // 自定义错误类型
    function CustomError(message) {
        this.name = 'CustomError';
        this.message = message;
    }
    CustomError.prototype = Object.create(Error.prototype, {
        constructor: {
            value: CustomError
        }
    });

    try { throw new CustomError('自定义错误类型') }
    catch(error) { console.dir(error) }

            // 自定义错误应用
    function process(values){
        if (!(values instanceof Array)) {
            throw new Error('process()：Arguments must be an array.');
        }

        values.sort();
        for (var i=0, len=values.length; i < len; i++){
            if (values[i] > 100){
                return values[i];
            }
        }
        return -1;
    }



        // 5.0 错误事件
            // 注意：chrome的console里无效果，可以用http://jsfiddle.net/PWSDF/运行
    window.onerror = function (errorMsg, url, lineNumber) {
        console.dir(errorMsg);
        console.dir(url);
        console.dir(lineNumber);
        return false;
    };
    throw new Error('this is a error.');


        // 6.0 记录浏览器错误到服务器
    function logError(sev, msg) {
        var img = new Image();
        img.src = 'log.php?sev=' + encodeURIComponent(sev) + '&msg=' + encodeURIComponent(msg);
        img.onload = img.onerror = function () {
            console.log('log done.');
        }
    }
