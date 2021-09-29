



        // 函数式定义

        define(function (require, exports, module) {
            require('./moduleD');
            console.log('this is moduleB holding!');
            //console.dir(require);
            //console.dir(exports);
            //console.dir(module);

            module.exports =  {
                color: 'red',
                size: '50',
                state: 'B'
            }
        })