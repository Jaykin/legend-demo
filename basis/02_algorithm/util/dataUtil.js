/**
 * 测试数组数据生成工具
*/
class TArray {
    constructor(length) {
        this.store = []                 // 存储集合
        this.pos = 0                    // 当前索引
        this.length = length            // 元素数量
        this.setData()
        console.log(this.store.join(', '))
    }

    // 填充随机数据
    setData() {
        const len = this.length

        for (let i = 0; i < len; i++) {
            this.store[i] = Math.floor(Math.random() * (len + 1))
        }
    }

    // TODO 插入元素
    insert(el) {
        this.store[this.pos++] = el
        this.length++
    }

    // 清除元素值
    clear() {
        this.store = this.store.map(() => 0)
    }

    // 将数据输出为格式化的字符串
    toString() {
        let str = ''
        this.store.forEach((el, i) => {
            str += el + ''
            // 换行
            if (i > 0 && (i % 10 === 0)) {
                str += '\n'
            }
        })
    }

    // 交换数组元素
    swap(i1, i2) {
        let arr = this.store
        const temp = arr[i1]
        arr[i1] = arr[i2]
        arr[i2] = temp
    }
}

module.exports = TArray