/**
 * 数据结构 WeakSet
 * 
 * - WeakSet 结构与 Set 类似，也是不重复的值的集合
 * - 区别
 *      1. 成员只能是对象
 *      2. 其中的对象都是弱引用，随时可能消失，即垃圾回收机制不考虑 WeakSet 对该对象的引用
 *      3. 实例无 size 属性
 *      4. 不可遍历，因为是弱引用，其中的对象取决于不可预测的垃圾回收，故不适合引用其成员
 * - 适合临时存放一组对象
 * - 可在 Reflect Metadata 中使用
*/

// ========================================== 1、创建 WeakSet ==========================================
const ws1 = new WeakSet()
ws1.add({})

const ws2 = new WeakSet([[1, 2], [3, 4]])

// ========================================== 2、实例方法 ==========================================
// 2.1 WeakSet.prototype.add(value)                 // 向 WeakSet 实例添加一个新成员
// 2.2 WeakSet.prototype.delete(value)              // 清除 WeakSet 实例的指定成员
// 2.3 WeakSet.prototype.has(value)                 // 返回一个布尔值，表示某个值是否在 WeakSet 实例之中
// 2.4 WeakSet.prototype.clear()                    // 清空该 WeakSet 对象中的所有元素.
