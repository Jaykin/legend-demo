/** 
 * 链表
*/

// 节点类
class Node {
    constructor(element) {
        this.element = element;     // 存储当前节点的数据
        this.next = null;           // 指向后继节点的引用
    }
}

// 链表类
class LinkedList {
    constructor() {
        this.head = new Node('head');       // 指定头节点
    }

    /** 
     * 遍历链表，查找指定元素的节点
     * 如 查找成功，返回该后继节点
     * 如 查找失败，返回null
    */
    find(ele) {
        let node = this.head;

        while (node && node.element !== ele) {
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

        while (currNode.next !== null) {
            console.log(currNode.next.element);
            currNode = currNode.next;
        }
    }
}