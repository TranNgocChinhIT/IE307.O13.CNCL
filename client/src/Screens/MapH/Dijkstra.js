// utils.js

import * as turf from '@turf/turf';

export const parseData = (data) => {
  const nodes = {};
  const edges = [];

  data.features.forEach((feature) => {
    const coordinates = feature.geometry.coordinates;

    if (feature.geometry.type === "LineString") {
      for (let i = 0; i < coordinates.length - 1; i++) {
        const start = coordinates[i];
        const end = coordinates[i + 1];
        const startId = `${start[0]},${start[1]}`;
        const endId = `${end[0]},${end[1]}`;

        nodes[startId] = start;
        nodes[endId] = end;

        const distance = turf.distance(start, end);
        edges.push({ start: startId, end: endId, distance });
      }
    }
  });

  return { nodes, edges };
};

class PriorityQueue {
  constructor() {
    this.collection = [];
  }

  enqueue(element) {
    if (this.isEmpty()) {
      this.collection.push(element);
    } else {
      let added = false;
      for (let i = 1; i <= this.collection.length; i++) {
        if (element[1] < this.collection[i - 1][1]) {
          this.collection.splice(i - 1, 0, element);
          added = true;
          break;
        }
      }
      if (!added) {
        this.collection.push(element);
      }
    }
  }

  dequeue() {
    return this.collection.shift();
  }

  isEmpty() {
    return this.collection.length === 0;
  }
}

export const dijkstra = (startNode, endNode, nodes, edges) => {
  let distances = {};
  let prev = {};
  let pq = new PriorityQueue();

  distances[startNode] = 0;
  pq.enqueue([startNode, 0]);

  Object.keys(nodes).forEach(node => {
    if (node !== startNode) {
      distances[node] = Infinity;
    }
    prev[node] = null;
  });

  while (!pq.isEmpty()) {
    let [currentNode, currentDistance] = pq.dequeue();

    if (currentNode === endNode) {
      let path = [];
      let lastNode = endNode;

      while (lastNode) {
        path.unshift(nodes[lastNode]);
        lastNode = prev[lastNode];
      }
      return path;
    }

    edges.forEach(edge => {
      if (edge.start === currentNode) {
        let neighbor = edge.end;
        let newDist = currentDistance + edge.distance;

        if (newDist < distances[neighbor]) {
          distances[neighbor] = newDist;
          prev[neighbor] = currentNode;
          pq.enqueue([neighbor, newDist]);
        }
      }
    });
  }

  return [];
};
