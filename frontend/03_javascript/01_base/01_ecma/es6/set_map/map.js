/**
 * 数据结构 - Map
 * 
 * - 类似对象，是键值对的集合，但各种类型的值都可以当作键，是一种更完善的 Hash 结构
 * - 对同一个键多次赋值，后面的值将覆盖前面的值
 * - 读取一个未知的键，则返回 undefined
 * - Map 的键实际上是跟内存地址绑定的，只要内存地址不一样，就视为两个键
 * - NaN 是一个键
 * - Map 的遍历顺序就是插入顺序
 * - Map 结构的默认遍历器接口（Symbol.iterator属性），就是 entries 方法
 * 
 * 实例结构
 * |-- [[Entries]]
 *      |-- 0: {}
 *          |-- key: <key>
 *          |-- value: <value>
 *      |-- size: <size>
 * |-- __ptoto__
*/

// ========================================== 1、创建 Map ==========================================
// 1.1 set
const m1 = new Map()
const oKey = { p: 'Hi' }
m1.set(oKey, 'value')

// 1.2 二维可遍历结构，每个子项是数组定义 key 和 value
const s1 = new Set([
    ['name', 'Jay'],
    ['title', 'Man']
])
const m2 = new Map(s1)

// ========================================== 2、实例属性/方法 ==========================================
// 2.1 Map.prototype.size                   返回 Map 结构的成员总数
// 2.2 Map.prototype.set(key, value)        设置键名key对应的键值为value，然后返回整个 Map 结构,如果key已经有值，则键值会被更新，否则就新生成该键
// 2.3 Map.prototype.get(key)               读取key对应的键值，如果找不到key，返回undefined
// 2.4 Map.prototype.has(key)               返回一个布尔值，表示某个键是否在当前 Map 对象之中
// 2.5 Map.prototype.delete(key)            删除某个键，返回true。如果删除失败，返回false
// 2.6 Map.prototype.clear()                清除所有成员，没有返回值

// 2.7 Map.prototype.keys()                 返回键名的遍历器
// 2.8 Map.prototype.values()               返回键值的遍历器
// 2.9 Map.prototype.entries()              返回所有成员的遍历器
// 2.10 Map.prototype.forEach()             遍历 Map 的所有成员
const m3 = new Map([
    ['F', 'no'],
    ['T', 'yes']
])
for (let [key, value] of m3.entries()) {
    console.log(key, value)
}
for (let [key, value] of m3) {
    console.log(key, value)
}

// ========================================== 3、扩展 ==========================================
// 3.1 Map 转 Array
const m4 = new Map([
    [1, 'one'],
    [2, 'two'],
    [3, 'three']
])
[...m4.keys()]          // [1, 2, 3]
[...m4.values()]        // ['one', 'two', 'three']

// 3.2 借用数组方法 map、filter
const m5 = new Map(
    [...m4].map(([k, v]) => [k * 2, '_' + v])
)
console.log(m5)         // { 2 => '_one', 4 => '_two', 6 => '_three' }