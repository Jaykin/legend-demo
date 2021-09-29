


        // 模块入口

        require([
            './moduleG'
        ], function (moduleG) {
            console.log('main holding======');
            console.dir(moduleG);
        })