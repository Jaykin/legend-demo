/**
 * 插入排序
*/

function insertionSort(array) {
    const len = array.length

    // 外循环用来选定需要排序的元素，从 1 开始是因为第一个元素是已经排好序的
    for (let i = 1; i <= len - 1; i++) {
        let temp = array[i]
        // 已排序元素的最大索引，需往前遍历与 temp 比较
        let j = i

        // 已排序元素从后往前逐个与 temp 比较
        while (j > 0 && temp < array[j - 1]) {
            // 后移已排序元素
            array[j] = array[j - 1]
            j--
        }

        // 插入选定元素
        array[j] = temp

        // 输出排序流程
        console.log(array.join(', '))
    }
}

module.exports = insertionSort