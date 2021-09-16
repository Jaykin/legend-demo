// 小程序端标识
exports.WEAPP_TYPES_MAP = {
    WX: 'wx',
    SWAN: 'swan',
    // ALIPAY: 'alipay',
    TT: 'tt',
    QQ: 'qq',
};

// 支持的小程序端
exports.WEAPP_TYPES = [
    exports.WEAPP_TYPES_MAP.WX,
    exports.WEAPP_TYPES_MAP.SWAN,
    exports.WEAPP_TYPES_MAP.TT,
    exports.WEAPP_TYPES_MAP.QQ,
];

// 命名空间
exports.namespace = 'nb';   // 命名规则：__${namespace}_${name}__