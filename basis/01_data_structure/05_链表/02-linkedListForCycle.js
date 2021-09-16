/**
 * 循环链表
*/

// 节点类
class Node {
    constructor(element, next) {
        this.element = element;     // 存储当前节点的数据
        this.next = next || null;   // 指向后继节点的引用
    }
}

// 链表类
class LinkedListForCycle {
    constructor(element) {
        this.head = new Node(element);       // 指定头节点
        this.head.next = head;
    }

    /** 
     * 遍历链表，查找指定元素的节点
     * 如 查找成功，返回该后继节点
     * 如 查找失败，返回null
    */
    find(ele) {
        let node = this.head;

        while (node.element !== ele && node.next !== this.head) {
            node = node.next;
        }

        return node;
    }

    /** 
     * 查找元素的前一个节点
    */
    findPrevious(ele) {
        let currNode = this.head;

        while (currNode !== null && currNode.next.element !== ele) {
            currNode = currNode.next
        }

        return currNode;
    }

    /** 
     * 在指定元素后插入新节点
    */
    insert(newEle, ele) {
        let newNode = new Node(newEle);
        let node = this.find(ele);

        newNode.next = node.next;
        node.next = newNode;
    }

    /** 
     * 删除指定节点
    */
    remove(ele) {
        const prevNode = this.findPrevious(ele);

        if (prevNode) {
            prevNode.next = prevNode.next.next;
        }
    }

    /** 
     * 显示链表中的元素
    */
    display() {
        let currNode = this.head;

        while (currNode.next !== null && currNode.next !== this.head) {
            console.log(currNode.next.element);
            currNode = currNode.next;
        }
    }
}

/**
 * 传说在公元 1 世纪的犹太战争中，犹太历史学家弗拉维奥·约瑟夫斯和他的 40 个同胞
被罗马士兵包围。犹太士兵决定宁可自杀也不做俘虏，于是商量出了一个自杀方案。他
们围成一个圈，从一个人开始，数到第三个人时将第三个人杀死，然后再数，直到杀光
所有人。约瑟夫和另外一个人决定不参加这个疯狂的游戏，他们快速地计算出了两个位
置，站在那里得以幸存。写一段程序将 n 个人围成一圈，并且第 m 个人会被杀掉，计算
一圈人中哪两个人最后会存活。使用循环链表解决该问题。
 */
let n = 40;
const m = 3;
let i = 1;
const cycleLinkedList = new LinkedListForCycle(i);

// 插入
let prevNode = cycleLinkedList.head;
while (i <= n) {
    const newNode = new Node(i);

    cycleLinkedList.insert(newNode, prevNode);
    prevNode = newNode;
    i++;
}

// 循环删除元素 TODO
