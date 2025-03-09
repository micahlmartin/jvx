import { Node, Edge } from 'reactflow';

interface LayoutConfig {
  nodeWidth: number;
  nodeHeight: number;
  levelSeparation: number;
  nodeSeparation: number;
}

const DEFAULT_CONFIG: LayoutConfig = {
  nodeWidth: 280,
  nodeHeight: 120,
  levelSeparation: 200,
  nodeSeparation: 80,
};

interface LayoutNode extends Node {
  level: number;
  parentNode?: string;
}

export function calculateLayout(nodes: Node[], edges: Edge[], config: Partial<LayoutConfig> = {}): Node[] {
  console.log('Layout calculation started:', { nodes, edges });
  
  const finalConfig = { ...DEFAULT_CONFIG, ...config };
  const layoutNodes = new Map<string, LayoutNode>();
  
  // First pass: Assign levels to nodes
  nodes.forEach(node => {
    layoutNodes.set(node.id, {
      ...node,
      level: 0,
    });
  });

  // Find root nodes (nodes with no incoming edges)
  const incomingEdges = new Map<string, number>();
  edges.forEach(edge => {
    const count = incomingEdges.get(edge.target) || 0;
    incomingEdges.set(edge.target, count + 1);
    const targetNode = layoutNodes.get(edge.target);
    if (targetNode) {
      targetNode.parentNode = edge.source;
    }
  });

  const rootNodes = Array.from(layoutNodes.values())
    .filter(node => !incomingEdges.has(node.id));
  
  console.log('Root nodes:', rootNodes);

  // Assign levels through BFS
  const queue = rootNodes.map(node => node.id);
  while (queue.length > 0) {
    const nodeId = queue.shift()!;
    const node = layoutNodes.get(nodeId)!;
    const level = node.level;

    // Find child nodes
    edges
      .filter(edge => edge.source === nodeId)
      .forEach(edge => {
        const childNode = layoutNodes.get(edge.target);
        if (childNode) {
          childNode.level = level + 1;
          queue.push(childNode.id);
        }
      });
  }

  // Group nodes by level
  const nodesByLevel = new Map<number, LayoutNode[]>();
  layoutNodes.forEach(node => {
    const level = node.level;
    const nodesInLevel = nodesByLevel.get(level) || [];
    nodesInLevel.push(node);
    nodesByLevel.set(level, nodesInLevel);
  });

  // Position nodes
  nodesByLevel.forEach((nodesInLevel, level) => {
    const levelY = -((nodesInLevel.length - 1) * finalConfig.nodeSeparation) / 2;
    nodesInLevel.forEach((node, index) => {
      node.position = {
        x: level * finalConfig.levelSeparation,
        y: levelY + index * finalConfig.nodeSeparation
      };
    });
  });

  const result = Array.from(layoutNodes.values());
  console.log('Layout calculation completed:', result);
  return result;
} 