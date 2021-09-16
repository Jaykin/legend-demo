/**
 * 散列表/哈希表
 * - 开链发
 * - 线性探测法
 */

class HashTable {
    constructor() {
        this.table = new Array(137)
        this._buildChain()
    }

    // 插入数据
    put(key, data) {
        const pos = this.hash(key)
        let index = 0

        while (this.table[pos][index] != undefined) {
            index++
        }

        this.table[pos][index] = key        // 保存键值
        this.table[pos][index + 1] = data   // 保存数据
    }

    // 读取数据
    get(key) {
        const pos = this.hash(key)
        const len = this.table[pos].length
        let index = 0

        while (index < len && this.table[pos][index] != key) {
            index += 2
        }

        if (index === len) {
            return undefined
        } else {
            return this.table[pos][index + 1]
        }
    }

    // 散列函数 TODO
    hash(data) {

    }

    // 创建链
    _buildChain() {
        for (let i = 0; i < this.table.length; ++i) {
            this.table[i] = new Array();
        }
    }
}