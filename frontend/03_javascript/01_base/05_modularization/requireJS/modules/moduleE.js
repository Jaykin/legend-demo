



        // 包装CommonJS模块

        define(function (require, exports, module) {
            var moduleD = require('./moduleD');
            var moduleA = require('./moduleA');

            console.log('this is moduleE holding!');
            console.dir(moduleA);
            console.dir(moduleD);

            return {
                color: 'green',
                size: '150',
                state: 'E'
            }
        })