



        // 定义一个函数模块：即模块输出为函数

        define(function () {
            // 这种方式是对的
            console.log('this is moduleD holding!');
            return function () {
                console.log('this is moduleC holding!');
            }
        })