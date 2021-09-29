/**
 * 集合
 */

class MySet {
    constructor() {
        this.dataStore = []
    }

    // 添加元素
    add(ele) {
        if (this.dataStore.indexOf(ele) >= 0) {
            return false
        }

        this.dataStore.push(ele)
        return true
    }

    // 删除元素
    remove(ele) {
        const pos = this.dataStore.indexOf(ele)

        if (pos < 0) {
            return false
        }

        this.dataStore.splice(pos, 1)
        return true
    }

    // 检查成员是否在集合中
    contains(ele) {
        return this.dataStore.indexOf(ele) >= 0
    }

    size() {
        return this.dataStore.length
    }

    // 并集
    union(othSet) {
        let tempSet = new MySet()

        this.dataStore.forEach((ele) => {
            tempSet.add(ele)
        })

        othSet.dataStore.forEach((ele) => {
            if (!tempSet.contains(ele)) {
                tempSet.add(ele)
            }
        })

        return tempSet
    }

    // 交集
    intersect(othSet) {
        let tempSet = new MySet()

        this.dataStore.forEach((ele) => {
            if (othSet.contains(ele)) {
                tempSet.add(ele)
            }
        })

        return tempSet
    }

    // 是否指定集合的子集
    subset(othSet) {
        if (this.size() > othSet.size()) {
            return false
        }

        for (let ele of this.dataStore) {
            if (!othSet.contains(ele)) {
                return false
            }
        }

        return true
    }

    // 补集
    difference(othSet) {
        let tempSet = new MySet()

        this.dataStore.forEach((ele) => {
            if (!othSet.contains(ele)) {
                tempSet.add(ele)
            }
        })

        return tempSet
    }

    show() {
        console.log(this.dataStore)
    }
}