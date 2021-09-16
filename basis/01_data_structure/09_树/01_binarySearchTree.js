/**
 * 二叉查找树/二叉搜索树
 */
const Node = require('./node')

class BST {
    constructor() {
        this.root = null
    }

    // 插入新节点
    insert(data) {
        const newNode = new Node(data, null, null)

        // 1、检查是否有根节点
        if (!this.root) {
            this.root = newNode
            return
        }

        // 2、遍历树 - 查找新节点的插入位置
        let currNode = this.root

        while (true) {
            // dada 较小的放在左边节点，较大的放到右边节点
            if (data < currNode.data) {
                if (!currNode.left) {
                    currNode.left = newNode
                    break
                }

                // 继续往下
                currNode = currNode.left
            } else {
                if (!currNode.right) {
                    currNode.right = newNode
                    break
                }

                // 继续往下
                currNode = currNode.right
            }
        }
    }

    // 先序遍历
    preOrder() {
        if (node) {
            console.log('preOrder: ', node)
            this.preOrder(node.left)
            this.preOrder(node.right)
        }
    }


    // 中序遍历
    inOrder(node) {
        if (node) {
            this.inOrder(node.left)
            console.log('inOrder: ', node)
            this.inOrder(node.right)
        }
    }

    // 后序遍历
    postOrder() {
        if (node) {
            this.postOrder(node.left)
            this.postOrder(node.right)
            console.log('postOrder: ', node)
        }
    }

    // 查找最小值 - 找到最左边的叶子节点就行
    getMin() {
        let currNode = this.root

        while (currNode.left) {
            currNode = currNode.left
        }

        return currNode
    }

    // 查找最大值 - 找到最右边的叶子节点就行
    getMax() {
        let currNode = this.root

        while (currNode.right) {
            currNode = currNode.right
        }

        return currNode
    }
}