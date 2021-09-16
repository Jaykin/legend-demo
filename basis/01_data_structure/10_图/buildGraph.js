/**
 * 构建图
 */

 const Vertex = require('./vertex')
 const AlGraph = require('./alGraph')
 
 // 构建图
 function buildGraph() {
     const vertexNum = 13
     const alGraph = new AlGraph()
     const unicodeCharA = ('A').charCodeAt()
     
     // 添加顶点
     let vertexArr = (new Array(vertexNum).fill(0)).map((_, idx) => {
         const label = unescape('%u00' + (unicodeCharA + idx).toString(16))
         const vertex = new Vertex(label)
         alGraph.addVertex(vertex)
         return vertex
     })
 
     // 添加边
     alGraph.addEdge(vertexArr[0], vertexArr[1]);
     alGraph.addEdge(vertexArr[0], vertexArr[4]);
     alGraph.addEdge(vertexArr[0], vertexArr[7]);
     alGraph.addEdge(vertexArr[0], vertexArr[10]);
     alGraph.addEdge(vertexArr[1], vertexArr[2]);
     alGraph.addEdge(vertexArr[2], vertexArr[3]);
     alGraph.addEdge(vertexArr[4], vertexArr[5]);
     alGraph.addEdge(vertexArr[5], vertexArr[6]);
     alGraph.addEdge(vertexArr[7], vertexArr[8]);
     alGraph.addEdge(vertexArr[8], vertexArr[9]);
     alGraph.addEdge(vertexArr[10], vertexArr[11]);
     alGraph.addEdge(vertexArr[11], vertexArr[12]);
 
     return alGraph
 }
 
 module.exports = buildGraph