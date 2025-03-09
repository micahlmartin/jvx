import { Edge, Node } from 'reactflow';
import { ObjectNodeData } from '@/components/nodes/ObjectNode';

interface NodeProperty {
  key: string;
  type: string;
  value: any;
}

interface GraphData {
  nodes: Node<ObjectNodeData>[];
  edges: Edge[];
}

function getValueType(value: any): string {
  if (value === null) return 'null';
  if (Array.isArray(value)) return 'array';
  return typeof value;
}

function createNode(id: string, label: string, properties: NodeProperty[]): Node<ObjectNodeData> {
  return {
    id,
    type: 'object',
    position: { x: 0, y: 0 },
    data: {
      label,
      type: 'object',
      properties
    }
  };
}

function processObject(obj: any, parentId: string | null = null): GraphData {
  const nodes: Node<ObjectNodeData>[] = [];
  const edges: Edge[] = [];
  let currentId = parentId || 'root';

  // Extract properties that aren't objects
  const properties: NodeProperty[] = [];
  const childObjects: Record<string, any> = {};

  Object.entries(obj).forEach(([key, value]) => {
    const valueType = getValueType(value);
    
    if (valueType === 'object' && value !== null) {
      childObjects[key] = value;
    } else {
      properties.push({
        key,
        type: valueType,
        value: valueType === 'array' ? JSON.stringify(value) : value
      });
    }
  });

  // Create node for current object with its properties
  nodes.push(createNode(currentId, currentId === 'root' ? 'Root' : currentId, properties));

  // Process child objects
  Object.entries(childObjects).forEach(([key, value], index) => {
    const childId = `${currentId}-${key}`;
    const { nodes: childNodes, edges: childEdges } = processObject(value, childId);
    
    nodes.push(...childNodes);
    edges.push(...childEdges);
    
    // Connect parent to child
    edges.push({
      id: `${currentId}-${childId}`,
      source: currentId,
      target: childId,
      type: 'smoothstep'
    });
  });

  return { nodes, edges };
}

export function jsonToGraph(json: any): GraphData {
  return processObject(json);
} 