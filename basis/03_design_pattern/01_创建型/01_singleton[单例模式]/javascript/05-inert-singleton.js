


    /*
    *
    * 惰性单例
    *
    *
    * */


    var getSingle = function (callback) {
        var result;

        return function () {
            return result || (result = callback.apply(this, arguments));
        }
    }

    var createLoginLayer = function () {
        var div = document.createElement( 'div' );
        div.innerHTML = '我是登录浮窗';
        div.style.display = 'none';
        document.body.appendChild( div );
        return div;
    }

    var getLoginLayer = getSingle(createLoginLayer);

    console.dir(getLoginLayer() === getLoginLayer());