/**
 * redux工具函数
*/
    /**
     * 浅复制对象
     * @param { Object } oldObj -- 需要被覆盖的对象
     * @param { Object } newVal -- 用来覆盖的对象
    */
export function updateObject(oldObj, newObj) {
    return Object.assign({}, oldObj, newObj);
}

    /**
     * 克隆数组
     * @param { Array } -- 被克隆的数组
     * @return { Array } -- 新数组
    */
export function cloneArray(array) {
    return [].concat(array)
}    

    /**
     * 遍历对象
     * @param { Object } obj -- 需要遍历的对象
     * @param { Function } callback -- 针对每个key执行的函数
     * 
    */
export function eachObject(obj, callback) {
    Object.keys(obj).forEach(callback);

    return obj;
}    

    /**
     * 生成actionCreater
    */
export function makeActionCreater(type, ...argNames) {
    return function (...args) {
        let action = { type };

        argNames.forEach((arg, idx) => {
            action[arg] = args[idx];
        });

        return action;
    }
}
