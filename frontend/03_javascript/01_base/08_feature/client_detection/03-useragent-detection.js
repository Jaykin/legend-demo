    // chrome
//Mozilla/5.0 (Windows NT 6.1; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2924.87 Safari/537.36
//Mozilla版本号        操作系统信息                  Apple Webkit版本号(呈现引擎)           浏览器版本号

    // FireFox
//Mozilla/5.0 (Windows NT 6.1; WOW64; rv:48.0) Gecko/20100101 Firefox/48.0

    // oprea

    // ie (有出入)
//Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; .NET4.0C; .NET4.0E; InfoPath.2; rv:11.0) like Gecko

    // qq浏览器（兼容模式）
// Mozilla/5.0 (Windows NT 6.1; WOW64; Trident/7.0; SLCC2; .NET CLR 2.0.50727; .NET CLR 3.5.30729; .NET CLR 3.0.30729; .NET4.0C; .NET4.0E; InfoPath.2; Core/1.53.2141.400 QQBrowser/9.5.10219.400; rv:11.0) like Gecko


/*
*
* 用户代理检测
*
* */
        // 使用模块模式封装
    var client = function () {
        var ua = navigate.userAgent;

        // 1、检测呈现引擎及版本号
        var engine = {
                // 呈现引擎的版本（数值）
            ie: 0,
            gecko: 0,
            webkit: 0,
            khtml: 0,
            opera: 0,
                // 引擎的具体版本号（字符串）
            ver: null
        }
        // 2、检测具体浏览器
        var browser = {
            // 浏览器
            ie: 0,
            firefox: 0,
            konq: 0,
            opera: 0,
            chrome: 0,
            // 具体的版本号
            ver: null
        }
        // 3、检测平台
        var system = {
            win: false,
            mac: false,
            xll: false,
            // 移动设备
            iphone: false,
            ipod: false,
            ipad: false,
            ios: false,
            android: false,
            nokiaN: false,
            winMobile: false,
            // 游戏系统
            wii: false,
            ps: false
        }

            // 1.0 opera
        if (window.opera) {
            engine.ver = browser.ver = window.opera.version();
            engine.opera = browser.opera = parseFloat(engine.ver);
        } else if (/AppleWebKit\/(\S+)/.test(ua)) {
            // 2.0 webkit
                // "AppleWebKit"是独一无二的
            engine.ver = RegExp['$1'];
            engine.webkit = parseFloat(engine.ver);
                // 确定是chrome or safari
            if (/Chrome\/(\S+)/.test(ua)) {
                    // chrome
                browser.ver = RegExp['$1'];
                browser.chrome = parseFloat(browser.ver);
            } else if (/Version\/(\S+)/.test(ua)) {
                    // safari3+
                browser.ver = RegExp['$1'];
                browser.safari = parseFloat(browser.ver);
            } else {
                    // safari3-
                var safariVersion = 1;
                if (engine.webkit < 100) {
                    safariVersion = 1
                } else if (engine.webkit < 312) {
                    safariVersion = 1.2;
                } else if (engine.webkit < 412) {
                    safariVersion = 1.3;
                } else {
                    safariVersion = 2;
                }
                browser.ver = browser.safari = safariVersion;
            }
        } else if (/KHTML\/(\S+)/.test(ua) || /Konqueror\/([^;]+)/.test(ua)) {
            // 3.0 khtml
            engine.ver = browser.ver = RegExp["$1"];
            engine.khtml = browser.konq = parseFloat(engine.ver);
        } else if (/rv:([^\)]+)\) Gecko\/\d{8}/.test(ua)) {
            // 4.0 gecko
            engine.ver = RegExp["$1"];
            engine.gecko = parseFloat(engine.ver);
                // 确定是否为FireFox
            if (/FireFox\/(\S+)/.test(ua)) {
                browser.ver = RegExp['$1'];
                browser.firefox = parseFloat(browser.ver);
            }
        } else if (/MSIE ([^;]+)/.test(ua)) {
            // 5.0 ie
            engine.ver = browser.ver = RegExp["$1"];
            engine.ie = browser.ie = parseFloat(engine.ver);
        }


        // 检测平台
        var platform = navigator.platform;
        system.win = platform.indexOf('Win') === 0;
        system.mac = platform.indexOf('Mac') === 0;
        system.xll = (platform.indexOf('Xll') === 0) || (platform.indexOf('Linux') === 0);
            // 移动设备
        system.iphone = ua.indexOf('iPhone') > -1;
        system.ipod = ua.indexOf('iPod') > -1;
        system.ipad = ua.indexOf('iPad') > -1;
        system.nokiaN = ua.indexOf("NokiaN") > -1;
            // 游戏系统
        system.wii = ua.indexOf("Wii") > -1;
        system.ps = /playstation/i.test(ua);

            // 进一步检测windows的版本信息
        if (system.win) {
            if (/Win(?:dows )?([^do]{2})\s?(\d+\.\d+)?/.test(ua)){
                if (RegExp["$1"] == "NT"){
                    switch(RegExp["$2"]){
                        case "5.0":
                            system.win = "2000";
                            break;
                        case "5.1":
                            system.win = "XP";
                            break;
                        case "6.0":
                            system.win = "Vista";
                            break;
                        case "6.1":
                            system.win = "7";
                            break;
                        default:
                            system.win = "NT";
                            break;
                    }
                } else if (RegExp["$1"] == "9x"){
                    system.win = "ME";
                } else {
                    system.win = RegExp["$1"];
                }
            }
        }

            // 检测ios版本
        if (system.mac && ua.indexOf("Mobile") > -1){
            if (/CPU (?:iPhone )?OS (\d+_\d+)/.test(ua)){
                system.ios = parseFloat(RegExp.$1.replace("_", "."));
            } else {
                system.ios = 2; //不能真正检测出来，所以只能猜测
            }
        }
            //检测 Android 版本
        if (/Android (\d+\.\d+)/.test(ua)){
            system.android = parseFloat(RegExp.$1);
        }
            //检测windows mobile
        if (system.win == "CE"){
            system.winMobile = system.win;
        } else if (system.win == "Ph"){
            if(/Windows Phone OS (\d+.\d+)/.test(ua)){;
                system.win = "Phone";
                system.winMobile = parseFloat(RegExp["$1"]);
            }
        }



        return {
            engine: engine,
            browser: browser,
            system: system
        }
    }();


