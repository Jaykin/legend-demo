/**
 * 二分查找
 */

function binSearch(arr, data) {
    let upper = arr.length - 1 // 递减
    let lower = 0   // 递增

    while (lower <= upper) {
        const midx = Math.floor((upper + lower) / 2)

        if (arr[mid] < data) {
            lower = mid + 1
        } else if (arr[mid] > data) {
            upper = mid - 1
        } else {
            return midx
        }
    }

    return -1
}

// 统计重复次数
function count(arr, data) {
    const pos = binSearch(arr, data)

    if (pos < 0) {
        return 0
    }

    let count = 1
    // 向前遍历
    for (let i = pos - 1; i > 0; --i) {
        if (arr[i] === data) {
            ++count
        } else {
            break
        }
    }

    // 向后遍历
    for (let i = pos + 1; i < arr.length; ++i) {
        if (arr[i] === data) {
            ++count
        } else {
            break
        }
    }

    return count
}