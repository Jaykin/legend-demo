/**
 * 双向链表
*/

// 节点类
class Node {
    constructor(element) {
        this.element = element;     // 存储当前节点的数据
        this.next = null;           // 指向后继节点的引用
        this.previous = null;           // 指向前驱节点的引用
    }
}

class LList {
    constructor() {
        this.head = new Node('head');
    }

    /**
     * 查找指定元素的节点
    */
    find(ele) {
        let currNode = this.head;

        while (currNode && currNode.element !== ele) {
            currNode = currNode.next;
        }

        return currNode;
    }

    /**
     * 在指定节点后插入新节点
    */
    insert(newEle, tarEle) {
        const newNode = new Node(newEle);
        const tarNode = this.find(tarEle);

        if (tarNode) {
            newNode.previous = tarNode;
            newNode.next = tarNode.next
            tarNode.next = newNode;
        }
    }

    /**
     * 显示链表中的元素
    */
    display() {
        let currNode = this.head;

        while (currNode.next !== null) {
            console.log(currNode.element);
            currNode = currNode.next;
        }
    }

    /**
     * 删除节点
     * - 头节点不能删
    */
    remove(ele) {
        const node = this.find(ele);

        if (node && node.previous !== null) {
            node.previous.next = node.next;

            if (node.next) {
                node.next.previous = node.previous;
            }

            node.next = node.previous = null;
        }
    }

    /**
     * 查找链表的最后一个节点
    */
    findLast() {
        let currNode = this.head;

        while (currNode.next !== null) {
            currNode = currNode.next;
        }

        return currNode;
    }

    /**
     * 反向展示链表
    */
    displayReverse() {
        let currNode = this.findLast();

        while (currNode.previous !== null) {
            console.log(currNode.element);
            currNode = currNode.previous;
        }
    }
}