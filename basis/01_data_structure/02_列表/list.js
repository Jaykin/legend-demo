/** 
 * 列表
*/

class List {
    constructor() {
        this.listSize = 0;      // 列表的元素个数
        this.pos = 0;           // 列表的当前位置
        this.dataStore = [];    // 保存所有列表元素
    }

    /**
     * 在列表的末尾添加一个元素
     * @param {*} item - 添加进列表的数据
     * @returns {List} - 列表实例
     */
    append(item) {
        this.dataStore[this.listSize++] = item;
        return this;
    }

    /** 
     * 在列表指定位置之后插入一个元素
     * @param {*} item - 需要插入列表的元素
     * @param {Number} after - 指定列表元素的位置
    */
    insert(item, after) {
        this.dataStore.splice(after + 1, 0, item);
        this.listSize++;
    }

    /** 
     * 在列表中删除一个元素
     * @param {*} item - 需要删除的元素
     * @returns {Boolean} - 删除成功/true 删除失败/false
    */
    remove(item) {
        const foundAt = this.find(item);

        if (foundAt > -1) {
            this.dataStore.splice(foundAt, 1);
            this.listSize--;
            return true;
        }

        return false;
    }

    /** 
     * 清空列表数据
    */
    clear() {
        this.dataStore = [];
        this.listSize = 0;
        this.pos = 0;
    }

    /**
     * 查找列表中有多少元素
     */
    length() {
        return this.listSize;
    }

    /**
     * 显示列表中的所有元素
     * @param {Array} - 即存储列表数据的数组
     */
    toString() {
        return this.dataStore;
    }

    /**
     * 在列表中查找某一元素
     * @param {*} item - 需要查找的元素
     * @returns {Number} - 元素所处位置，没找到则为-1
     */
    find(item) {
        // 使用倒序迭代
        const store = this.dataStore;

        for (let i = store.length; --i;) {
            if (store[i] === item) {
                return i;
            }
        }

        return -1;
    }

    /** 
     * 判断一个值是否在列表中，感觉跟find一致，其实没必要
    */
    contains(item) {
        return this.find(item) > -1 ? true : false;
    }

    /** 
     * 获取列表的当前元素
    */
    getElement() {
        return this.dataStore[this.pos];
    }

    /** 
     * 将列表的当前位置移动到第一个元素
    */
    front() {
        this.pos = 0;
    }

    /** 
     * 将列表的当前位置移动到最后一个元素
    */
    end() {
        this.pos = this.listSize - 1;
    }

    /** 
     * 将当前位置后移一位
    */
    next() {
        if (this.pos < this.listSize - 1) {
            ++this.pos;
        }
    }

    /** 
     * 将当前位置前移一位
    */
    prev() {
        if (this.pos > 0) {
            --this.pos;
        }
    }

    /** 
     * 将当前位置移动到指定位置
    */
    moveTo(position) {
        if (position < 0 || position >= this.listSize) {
            return;
        }

        this.pos = position;
    }

    /** 
     * 获取列表的当前位置
    */
    currPos() {
        return this.pos;
    },

    // TODO 遍历接口
}