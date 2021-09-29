/**
 * 字典
 */

class Dictionary {
    constructor() {
        /**
         * 1、数组可存储键，用来排序
         * 2、Array 也是 Object，值可放在其属性上
         */
        this.dataStore = new Array();
    }

    add(key, value) {
        // this.dataStore.push(key);
        this.dataStore[key] = value;
    }

    find(key) {
        return this.dataStore[key];
    }

    remove() {
        try {
            delete this.dataStore[key];
            return true;
        } catch (err) {
            console.error(err);
            return false;
        }
    }
}