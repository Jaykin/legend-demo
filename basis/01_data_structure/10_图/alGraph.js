/**
 * 邻接表
 */
const Vertex = require('./vertex')

class AlGraph {
    constructor() {
        // 顶点的数量
        this.vertices = 0

        // 边的数量
        this.edges = 0

        // 存储所有边的信息【与顶点有边的其他顶点（二维数组）】
        this.vertexArr = []
    }

    // 添加顶点
    addVertex(v) {
        this.vertexArr.push(v)
        this.vertices++
    }

    // 添加边
    addEdge(v1, v2) {
        let v1Idx = this.vertexArr.indexOf(v1)
        if (v1Idx < 0) {
            this.addVertex(v1)
            v1Idx = this.vertices - 1
        }

        let v2Idx = this.vertexArr.indexOf(v2)
        if (v2Idx < 0) {
            this.addVertex(v2)
            v2Idx = this.vertices - 1
        }

        this.vertexArr[v1Idx].adjList.push(v2)
        this.vertexArr[v2Idx].adjList.push(v1)
        this.edges++
    }

    // 展示图
    showGraph() {
        this.vertexArr.forEach((vertex) => {
            let str = vertex.label + ' -> '

            vertex.adjList.forEach((adjVertex) => {
                str += adjVertex.label + ' '
            })

            console.log(str)
        })
    }
}

module.exports = AlGraph;