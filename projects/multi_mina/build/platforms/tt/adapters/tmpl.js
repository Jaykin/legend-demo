// 模板相关

module.exports = {
    // 数据绑定
    dataBinding: '{{x}}',       // 普通数据绑定
    duplexDataBinding: false,   // 双向数据绑定

    // 模板指令 if: false 表示不支持
    directive: {
        // 条件
        if: 'tt:if',
        elseif: 'tt:elif',
        else: 'tt:else',
        // 循环
        for: 'tt:for',
        foritem: 'tt:for-item',
        forindex: 'tt:for-index',
        forkey: 'tt:key',
    },

    // 特殊标签
    scriptTag: '',   // 模板脚本标签

    // 事件绑定（绑定方式 和 事件类型无差异）
    event: {},
};