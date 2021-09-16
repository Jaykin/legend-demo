/**
 * 数据结构 - WeakMap
 * 
 * - 与 Map 结构类似
 * - 区别
 *      1. 只接受对象作为键名（null除外）
 *      2. WeakMap 的键名所指向的对象为弱引用，不计入垃圾回收机制，但键值依然是正常引用
 *      3. 无 size 属性、无遍历操作、无法清空
*/