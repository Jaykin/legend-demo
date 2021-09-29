// 模板相关

module.exports = {
    // 数据绑定
    dataBinding: '{{x}}',       // 普通数据绑定
    duplexDataBinding: '{=x=}',   // 双向数据绑定

    // 模板指令 if: false 表示不支持
    directive: {
        // 条件
        if: 's-if',
        elseif: 's-elif',
        else: 's-else',
        // 循环
        for: 's-for',
        foritem: 's-for-item',
        forindex: 's-for-index',
        forkey: 's-key',
    },

    // 事件绑定（绑定方式 和 事件类型无差异）
    event: {},
};