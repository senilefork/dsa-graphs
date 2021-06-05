class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex)
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for(let vertex of vertexArray){
      this.nodes.add(vertex)
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    this.nodes.delete(vertex);

    for(node of this.nodes){
      if(node.adjacent.has(vertex)){
        node.adjacent.delete(vertex)
      }
    }
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    let stack = [start];
    let values = [];
    let nodesVisited = new Set();
    nodesVisited.add(start)
    let curr;

    while(stack.length){
      curr = stack.pop();
      values.push(curr.value)

      for(let i = 0; i < curr.adjacent.length; i++){
        if(!nodesVisited.has(curr.adjacent[i])){
          stack.push(curr.adjacent[i]);
          nodesVisited.add(curr.adjacent[i]);
        }     
      }
    }
    return values;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    let queue = [start];
    let values = [];
    let nodesVisited = new Set();
    nodesVisited.add(start)
    let curr;

    while(queue.length){
      curr = queue.shift();
      values.push(curr.value)

      for(let i = 0; i < curr.adjacent.length; i++){
        if(!nodesVisited.has(curr.adjacent[i])){
          queue.push(curr.adjacent[i]);
          nodesVisited.add(curr.adjacent[i]);
        }     
      }
    }
    return values;
  }
}

module.exports = {Graph, Node}