


    // 01 使用命名空间

    Object.prototype.createNamespace = function (name) {
        var parts = name.split( '.' );
        var current = this;
        var item;

        for ( var i in parts ) {
            item = parts[i];

            if (parts.hasOwnProperty(i)) {
                if (!current[item]) {
                    current[item] = {};
                }
                current = current[item];
            }
        }
    };

    var myApp = {};

    myApp.createNamespace('event');
    myApp.createNamespace('dom.style.width');

    console.dir(myApp);


    // 02 使用闭包隐藏私有变量

    var user = (function () {
        var _name = 'jay',
            _age = '19';

        return {
            getUserInfo: function () {
                return _name + '-' + _age;
            }
        }
    })();

    console.log(user.getUserInfo());