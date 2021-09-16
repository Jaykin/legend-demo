/**
 * 数据结构 - Set
 * 
 * - 类似数组，但成员值唯一(会自动去重)
 * - 向 Set 加入值时，不会发生类型转换
 * - Set 的遍历顺序就是插入顺序
 * - Set 无键名，其键名与键值相同
*/

// ========================================== 1、创建 Set ==========================================
// 1.1 add() 
const s1 = new Set()
s1.add(1)
s1.add(2)

// 1.2 接收具有 iterable 接口的数据结构
const s2 = new Set([1, 2, 3, 1, 2])     // Set({1,2,3})
s2.size                                 // 3

// ========================================== 2、去重 ==========================================
// 内部用 Same-value-zero equality 算法判断两个值是否相等，类似严格相等，不同的是 Set 认为 NaN 等于自身
const s3 = new Set('abcdabcd')          // Set({a,b,c,d})
const s4 = new Set([NaN, NaN])          // Set({NaN})

function dedupe(array) {
    // Array.from 可将 Set 转为 Array
    return Array.from(new Set(array))
}

// ========================================== 3、实例属性 ==========================================
// 3.1 Set.prototype.constructor    构造函数
// 3.2 Set.prototype.size   返回 Set 实例的成员总数

// ========================================== 4、实例方法 ==========================================
// 4.1 操作方法 - Set.prototype.add(value)      添加某个值，返回 Set 结构本身
// 4.2 操作方法 - Set.prototype.delete(value)   删除某个值，返回一个布尔值，表示删除是否成功
// 4.3 操作方法 - Set.prototype.has(value)      返回一个布尔值，表示该值是否为Set的成员
// 4.4 操作方法 - Set.prototype.clear(value)    清除所有成员，没有返回值

// 遍历 - Set 无键名，只有键值，so 键名就是键值（两者是同一个值）
// 4.5 遍历方法 - Set.prototype.keys()          返回键名的遍历器
// 4.6 遍历方法 - Set.prototype.values()        返回键值的遍历器
// 4.7 遍历方法 - Set.prototype.entries()       返回键值对的遍历器
// 4.8 遍历方法 - Set.prototype.forEach()       使用回调函数遍历每个成员


// ========================================== 5、遍历 ==========================================
// 扩展运算符(...)、for...of 均可遍历
// 5.1 ...
const arr1 = [...new Set([1, 2, 3])]                    // [1, 2, 3]

// 5.2 for...of
const s5 = new Set([1, 2, 3])
for (let v of s5) {
    console.log(v)
}

// 5.3 Array.prototype.map/Array.prototype.filter/Array.from 可在遍历中改变原 Set
let s6 = new Set([1, 2, 3])
s6 = new Set([...s6].map(x => x * 2))                   // Set({2, 4, 6})

let s7 = new Set([1, 2, 3, 4])
s7 = new Set([...s7].filter(x => (x % 2) === 0))        // Set({2, 4})

let s8 = new Set([1, 2, 3])
s8 = new Set(Array.from(s8, x => x * 2))                // Set({2, 4, 6})

// 5.4 并集、交集、差集
const s9 = new Set([1, 2, 3])
const s10 = new Set([4, 3, 2])
const union = new Set([...s9, ...s10])
const intersect = new Set([...s9].filter(x => s10.has(x)))
const diff = new Set([...s9].filter(x => !s10.has(x)))
