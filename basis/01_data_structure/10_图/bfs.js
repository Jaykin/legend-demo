/**
 * 广度优先遍历
 */
const buildGraph = require('./buildGraph')

function bfs(vertex, visitedArr) {
    // 存储已访问过的顶点
    let visitedArr = []

    // 存储每一层的顶点
    let queue = []
    queue.push(vertex)

    // 遍历
    while (queue.length) {
        const currVertex = queue.pop()

        currVertex.adjList.forEach((adjVertex) => {
            // 未访问过
            if (visitedArr.indexOf(adjVertex) < 0) {
                visitedArr.push(adjVertex)
                console.log('vertex ' + adjVertex.label + ' visited')

            }
        })
    }
}
 
 let graph = buildGraph()
 graph.showGraph()
 console.log('==========================================')
 bfs(graph.vertexArr[0])