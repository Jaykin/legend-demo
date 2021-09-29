/**
 * 顶点
 */

class Vertex {
    constructor(label) {
        this.label = label // 标识顶点
        this.adjList = [] // 邻接表
    }

    toString() {
        return this.label || 'anonymous vertex'
    }
}

module.exports = Vertex