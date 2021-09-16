/** 
 * 队列（FIFO）
*/

class Queue {
    constructor() {
        this.dataStore = [];
    }

    lenght() {
        return this.dataStore.length;
    }

    /**
     * 入队
     */
    enqueue(element) {
        this.dataStore.push(element);
    }

    /**
     * 出队
     */
    dequeue() {
        this.dataStore.shift();
    }

    /**
     * 预览队首元素
     */
    front() {
        return this.dataStore[0];
    }

    /**
     * 预览队尾元素
     */
    back() {
        return this.dataStore[this.dataStore.length - 1];
    }

    /**
     * 判断队列是否空
     */
    isEmpty() {
        return this.dataStore.length <= 0;
    }

    toString() {
        let retStr = "";

        for (let i = 0; i < this.dataStore.length; ++i) {
            retStr += this.dataStore[i].toString() + "\n";
        }

        return retStr;
    }
}