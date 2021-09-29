
function _new(func, ...args) {
    const ctx = Object.create(func.prototype)
    const rst = func.apply(ctx, args)

    return rst !== null && typeof rst === 'object' ? rst : ctx
}