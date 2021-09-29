function argsToArr(args) {
    var len = args.length,
        argArr = new Array(len)

    for (var i = 0; i < len; i++) {
        argArr[i] = args[i]
    }

    return argArr
}

/**
 * 参数透传
 *      - eval，有限制
 *      - 函数式？
 * */ 

Function.prototype.apply = function (ctx, args) {
    // 确认 ctx
    ctx = ctx ? Object(ctx) : void 0

    // 改变 this 指向
    const fnSymbol = Symbol('fn') // 避免命名冲突
    ctx[fnSymbol] = this

    // 调用函数
    let rst
    if (args && args.length) {
        // 参数透传 TODO
        // rst = eval(`ctx[fnSymbol](${args.join(',')})`)

        rst = eval(`ctx[fnSymbol](${args.join(',')})`)
    } else {
        rst = ctx[fnSymbol]()
    }

    // 删除临时属性
    delete ctx[fnSymbol]

    // 返回函数调用结果
    return rst
}

// 依赖 apply
Function.prototype.call = function (ctx) {
    const args = Array.prototype.slice.apply(arguments, [1])

    // 确认 ctx
    ctx = ctx ? Object(ctx) : void 0

    // 改变 this 指向
    const fnSymbol = Symbol('fn') // 避免命名冲突
    ctx[fnSymbol] = this

    // 调用函数
    const rst = ctx[fnSymbol].apply(ctx, args)

    // 删除临时属性
    delete ctx[fnSymbol]

    // 返回函数调用结果
    return rst
}

// 依赖 call、apply
Function.prototype.bind = function (ctx) {
    const slice = Array.prototype.slice
    const args = slice.call(arguments, 1)
    const caller = this

    return function () {
        return caller.apply(ctx, args.concat(slice.call(arguments)))
    }
}