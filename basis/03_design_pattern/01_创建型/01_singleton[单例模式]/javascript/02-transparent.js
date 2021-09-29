


    /*
    *
    * 透明的单例模式
    *
    *
    * */
        // 需求：底部创建一个唯一的div
        // 思考：
        //      1、这个构造函数做了两件事：
                        // -创建对象并执行初始化方法
                        // -保证只有一个对象
        //      2、如果某天需要创建多个div，那么就要去掉保证一个对象的代码，这种修改是要避免的！！
        //      3、注意使用单一职责原则

// 01 --------------------------------------------------------------------
    var CreateDiv = (function () {
        var instance = null;

        return function (html) {
            if (!instance) {
                this.html = html;
                this.init();
                instance = this;
            }

            return instance;
        }
    })();

    CreateDiv.prototype.init = function () {
        var div = document.createElement('div');
        div.innerHTML = this.html;
        document.body.appendChild(div);
    }



