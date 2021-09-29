/**
 * 链表反转
 */
const list = {
    head: {
        value: 1,
        next: {
            value: 2,
            next: {
                value: 3,
                next: {
                    value: 4,
                    next: null
                }
            }
        }
    }
}

/**
 * 迭代反转法
 */
function reverseList01(list) {
    let prev = null         // 前一个节点
    let curr = list.head    // 当前节点
    let next = null         // 后一个节点

    while (curr) {
        // 初始 prev curr->next

        // 先断 next：prev curr next
        next = curr.next
        // 指向 prev：prev <- curr next
        curr.next = prev
        // 指针依次向后移动
        prev = curr
        curr = next
    }

    list.head = prev

    return list
}
// console.log(JSON.stringify(reverseList01(list), null, 2))


/**
 * 递归反转法
 */
function reverseList02(head) {
    if (head === null || head.next === null) {
        return head
    }

    let newHead = reverseList02(head.next)

    // 转换新 head 的指针
    head.next.next = head
    head.next = null

    return newHead
}
// console.log(JSON.stringify(reverseList02(list.head), null, 2))


/**
 * 头插法
 */
function reverseList03(list) {
    let head = list.head
    let newHead = null
    let temp = null

    while (head) {
        temp = head
        head = head.next
        temp.next = newHead
        newHead = temp
    }

    return { head: newHead }
}
// console.log(JSON.stringify(reverseList03(list), null, 2))

/**
 * 就地逆置法
 */
function reverseList04(list) {
    let head = list.head // 头节点指针
    let begin = head
    let next = begin.next

    while (next) {
        begin.next = next.next
        next.next = head
        head = next
        next = begin.next
    }

    list.head = head
    return list
}
console.log(JSON.stringify(reverseList04(list), null, 2))