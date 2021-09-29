



        // 生成相对于模块的url

        define(['require'], function (require) {
            var cssUrl = require.toUrl('./index.css');
            console.log(cssUrl);        // ./modules/index.css
        })