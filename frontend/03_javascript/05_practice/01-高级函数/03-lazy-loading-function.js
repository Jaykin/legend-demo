

    /*
    *
    * 惰性载入函数
    *
    * */
        // 问题代码
    function createXHR01(){
        if (typeof XMLHttpRequest != "undefined"){
            return new XMLHttpRequest();
        } else if (typeof ActiveXObject != "undefined"){
            if (typeof arguments.callee.activeXString != "string"){
                var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0",
                        "MSXML2.XMLHttp"],
                    i,len;
                for (i=0,len=versions.length; i < len; i++){
                    try {
                        new ActiveXObject(versions[i]);
                        arguments.callee.activeXString = versions[i];
                        break;
                    } catch (ex){
                        //跳过
                    }
                }
            }
            return new ActiveXObject(arguments.callee.activeXString);
        } else {
            throw new Error("No XHR object available.");
        }
    }


        // 解决方案01
    function createXHR02(){
        if (typeof XMLHttpRequest != "undefined"){
            createXHR02 = function () {
                return new XMLHttpRequest();
            }
        } else if (typeof ActiveXObject != "undefined"){
            createXHR02 = function () {
                if (typeof arguments.callee.activeXString != "string"){
                    var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0",
                            "MSXML2.XMLHttp"],
                        i,len;
                    for (i=0,len=versions.length; i < len; i++){
                        try {
                            new ActiveXObject(versions[i]);
                            arguments.callee.activeXString = versions[i];
                            break;
                        } catch (ex){
                            //跳过
                        }
                    }
                }
                return new ActiveXObject(arguments.callee.activeXString);
            }
        } else {
            createXHR02 = function () {
                throw new Error("No XHR object available.");
            }
        }
        return createXHR02();
    }

        // 解决方案02
    var createXHR = (function () {
        if (typeof XMLHttpRequest != "undefined") {
            return function () {
                return new XMLHttpRequest();
            }
        } else if (typeof ActiveXObject != "undefined") {
            return function () {
                if (typeof arguments.callee.activeXString != "string"){
                    var versions = ["MSXML2.XMLHttp.6.0", "MSXML2.XMLHttp.3.0",
                            "MSXML2.XMLHttp"],
                        i,len;
                    for (i=0,len=versions.length; i < len; i++){
                        try {
                            new ActiveXObject(versions[i]);
                            arguments.callee.activeXString = versions[i];
                            break;
                        } catch (ex){
                            //跳过
                        }
                    }
                }
                return new ActiveXObject(arguments.callee.activeXString);
            }
        } else {
            return function () {
                throw new Error("No XHR object available.");
            }
        }
    })();
