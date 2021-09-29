const path = require('path');
const postcss = require('postcss');

// 自定义插件
const firstPlugin = postcss.plugin('postcss-first-demo', (opts = {}) => {
    const color = opts.color;
    console.log('opts', opts);

    return (root, result) => {
        // Transform CSS AST here
        root.walkRules(rule => {
            rule.append({
                prop: 'color',
                value: color
            });
        });
    }
});

const plugins = [
    require('postcss-console'),
    firstPlugin({ color: 'white' }),    // 传入插件选项
];
const cssCode = '.a { display: none; } .b { display: block; }';

// 使用解析
// const cssAst = postcss.parse(cssCode);
// console.log(JSON.stringify(cssAst, null, 2));


// 运行插件
postcss(plugins)
    .process(cssCode)
    .then(rst => {
        console.log(rst.css)
    });