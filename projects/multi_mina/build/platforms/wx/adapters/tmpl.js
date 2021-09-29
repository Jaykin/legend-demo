// 模板相关

module.exports = {
    // 数据绑定
    dataBinding: '{{x}}',       // 普通数据绑定
    duplexDataBinding: false,   // 双向数据绑定

    // 模板指令
    directive: {
        // 条件
        if: 'wx:if',
        elseif: 'wx:elif',
        else: 'wx:else',
        // 循环
        for: 'wx:for',
        foritem: 'wx:for-item',
        forindex: 'wx:for-index',
        forkey: 'wx:key',
    },

    // 特殊标签
    scriptTag: 'wxs',   // 模板脚本标签

    // 事件绑定（绑定方式 和 事件类型无差异）
    event: {},
};