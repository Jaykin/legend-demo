/**
 * 深度优先遍历
 */
const buildGraph = require('./buildGraph')

/**
 * 时间复杂度：O(2n) n 为边的数量
*/
function dfs(vertex, visitedArr) {
    // 访问顶点
    console.log('vertex ' + vertex.label + ' visited')
    visitedArr.push(vertex)

    // 遍历邻接表
    vertex.adjList.forEach((adjVertex) => {
        if (visitedArr.indexOf(vertex) < 0) {
            dfs(adjVertex, visitedArr)
        } else {
            // 已被访问过
            // console.log('vertex ' + vertex.label + ' had visited')
        }
    })
}

let graph = buildGraph()
let visitedArr = [] // 存储已访问过的顶点
graph.showGraph()
console.log('==========================================')
dfs(graph.vertexArr[0], visitedArr)