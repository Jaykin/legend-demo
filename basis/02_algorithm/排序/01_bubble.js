/**
 * 冒泡排序
 * 
 * - 最慢、最容易实现
 * - 数据值会像气泡一样从数组的一端漂至另一端
*/

function bubbleSort(array) {
    let len = array.length

    // 外循环遍历未确定位置的项(每次内循环都能确定末尾的项)，直至最后一项
    for (let i = len - 1; i >= 1; i--) {
        // 内循环对未确定位置的项进行相邻排序规则验证，每次循环会交换一次元素
        for (let j = 0; j <= i; j++) {
            // 升序
            if (array[j] > array[j + 1]) {
                // 交换元素
                let temp = array[j]
                array[j] = array[j + 1]
                array[j + 1] = temp
            }
        }

        // 输出排序流程
        console.log(array.join(', '))
    }
}

module.exports = bubbleSort