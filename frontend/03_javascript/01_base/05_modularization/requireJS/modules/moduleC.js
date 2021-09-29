



        // 存在依赖的函数式定义

        defined(['require', './moduleA', './moduleB'], function (require, moduleA, moduleB) {
            require('./moduleF');
            console.log('this is moduleC holding!');
            console.group('MA--MB');
            console.dir(moduleA);
            console.dir(moduleB);
            console.groupEnd('MA--MB');

            return {
                color: 'blue',
                size: '100',
                state: 'C'
            }
        })