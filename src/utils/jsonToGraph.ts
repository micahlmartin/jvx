import { Node, Edge } from 'reactflow';

interface GraphData {
  nodes: Node[];
  edges: Edge[];
}

let nodeId = 0;
let edgeId = 0;

function getNodeId() {
  return `node_${nodeId++}`;
}

function getEdgeId() {
  return `edge_${edgeId++}`;
}

function createNode(label: string, type: 'object' | 'array' | 'value', data: any, x: number, y: number): Node {
  return {
    id: getNodeId(),
    type,
    position: { x, y },
    data: {
      label,
      type,
      ...(type === 'object' && { properties: Object.fromEntries(Object.entries(data).map(([k, v]) => [k, typeof v])) }),
      ...(type === 'array' && { items: data }),
      ...(type === 'value' && { value: data })
    }
  };
}

function processValue(parentId: string, key: string, value: any, level: number, position: number, totalPositions: number): GraphData {
  const x = position * 300 - (totalPositions - 1) * 150;
  const y = level * 150;
  
  if (value === null || value === undefined) {
    return {
      nodes: [],
      edges: []
    };
  }

  if (typeof value === 'object' && !Array.isArray(value)) {
    const node = createNode(key, 'object', value, x, y);
    const childResults = Object.entries(value).map(([childKey, childValue], index, arr) => 
      processValue(node.id, childKey, childValue, level + 1, index, arr.length)
    );

    return {
      nodes: [node, ...childResults.flatMap(r => r.nodes)],
      edges: [
        ...childResults.flatMap(r => r.edges),
        ...childResults.map(r => r.nodes[0]).filter(Boolean).map(childNode => ({
          id: getEdgeId(),
          source: node.id,
          target: childNode.id,
          label: childNode.data.label
        }))
      ]
    };
  }

  if (Array.isArray(value)) {
    const node = createNode(key, 'array', value, x, y);
    const itemResults = value.map((item, index) => 
      processValue(node.id, `[${index}]`, item, level + 1, index, value.length)
    );

    return {
      nodes: [node, ...itemResults.flatMap(r => r.nodes)],
      edges: [
        ...itemResults.flatMap(r => r.edges),
        ...itemResults.map(r => r.nodes[0]).filter(Boolean).map(childNode => ({
          id: getEdgeId(),
          source: node.id,
          target: childNode.id,
          label: childNode.data.label
        }))
      ]
    };
  }

  const node = createNode(key, 'value', value, x, y);
  return {
    nodes: [node],
    edges: []
  };
}

export function jsonToGraph(json: any): GraphData {
  nodeId = 0;
  edgeId = 0;
  
  const rootKey = 'JSON';
  const result = processValue('root', rootKey, json, 0, 0, 1);
  
  // Center the root node
  if (result.nodes[0]) {
    result.nodes[0].position = { x: 0, y: 0 };
  }
  
  return result;
} 