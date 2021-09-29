/**
 * 选择排序
*/

function selectionSort(array) {
    const maxIdx = array.length - 1

    // 只需执行到倒数第二个元素即表示排序完成
    for (let i = 0; i <= maxIdx - 1; i++) {
        let min = i

        // 找到本次循环中最小的元素
        for (let j = i + 1; j <= maxIdx; j++) {
            // 升序
            if (array[min] > array[j]) {
                min = j
            }
        }

        // 将最小值交换到头部
        let temp = array[i]
        array[i] = array[min]
        array[min] = temp

        // 输出排序流程
        console.log(array.join(', '))
    }
}

module.exports = selectionSort