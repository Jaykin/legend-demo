// 斐波那契数列：每项数据是由前两项数值相加而得

function recurFib(n) {
    if (n < 2) {
        return n
    }

    return recurFib(n - 1) + recurFib(n - 2)
}

function dynFib(n) {
    if (n <= 0) {
        return n
    }

    if (n <= 2) {
        return 1
    }

    let vals = (new Array(n)).fill(0) // 存储子问题解
    vals[1] = 1
    vals[2] = 2

    for (let i = 3; i <= n; i++) {
        vals[i] = val(i - 1) + val(i - 2)
    }

    return vals[n]
}

function iterFib(n) {
    let last = 1
    let nextLast = 1
    let result = 1

    for (let i = 2; i < n; i++) {
        result = last + nextLast
        nextLast = last
        last = result
    }

    return result
}

/**
 * 有 n 件物品和一个容量为 v 的背包。第 i 件物品的容量是 c[i]，价值是 w[i]。求解将哪些物品装入背包可使价值总和最大
 * 1、问题分解
 *      - 问题复杂度是因为：可选项较多
 *      - 子问题：可选项少的情况
 *      - 思想：由简证繁；一生二(一般情况)，二生三(证明三)，三生万物(类推万物)
 *      - f[i][v]表示前i件物品恰放入一个容量为v的背包可以获得的最大价值
 *      num = 0: return 0
 *      num = 1：i = 1; return c[1] > v ? 0 : w[1]
 *      num = 2(重点)：i = 2; return max(f[1][v], f[1][v - c[2]] + w[2])
 *      num = 3：i = 3; return max(f[2][v], f[2][v - c[3]] + w[3])
 *      num = 4：
 *      num = 5：
 *      - 递归公式：f[i][v] = max{f[i-1][v], f[i - 1][v - c[i]] + w[i]}
 * 2、停止的边界条件
 *      - 容量不足
 */
const sizes = [3, 4, 7, 8, 9]
const values = [4, 5, 10, 11, 13]
const num = sizes.length
const capacity = 16

function recurBackpack(capacity, sizes, values, num) {
    let rst = 0
    console.log('recurBackpack start: ', capacity, num, sizes[num - 1], values[num - 1], rst)

    // num 为 0
    if (num === 0 || capacity === 0) {
        rst = 0
    } else if (sizes[num - 1] > capacity) {
        // 容量不足
        rst = recurBackpack(capacity, sizes, values, num - 1)
    } else {
        // 取 【最后一项】 与 【前项最大组合】 的最大值
        rst = Math.max(
            recurBackpack(capacity, sizes, values, num - 1),
            recurBackpack(capacity - sizes[num - 1], sizes, values, num - 1) + values[num - 1]
        )
    }

    console.log('recurBackpack end: ', capacity, num, sizes[num - 1], values[num - 1], rst)
    return rst
}

function dynBackpack(capacity, sizes, values, num) {
    let rst = []

    for (let i = 0; i <= num; i++) {
        for (let j = 0; j <= capacity; j++) {
            if (i === 0 || j === 0) {
                rst[i][j] = 0
            } else if (sizes[i - 1] <= j) {
                rst[i][j] = Math.max(
                    values[i - 1] + rst[i - 1][j - sizes[i - 1]],
                    rst[i - 1][j]
                )
            } else {
                rst[i][j] = rst[i - 1][j]
            }
        }
    }
    
    return rst[i][capacity]
}