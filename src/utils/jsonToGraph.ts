import { Node, Edge } from 'reactflow';

interface NodeProperty {
  id: string;
  key: string;
  value: string | number | boolean | null | object | unknown[];
  type: string;
  childNodeId?: string;
}

interface ObjectNodeData {
  label: string;
  type: string;
  properties: NodeProperty[];
  depth?: number;
}

export function jsonToGraph(
  json: Record<string, unknown>,
  parentId: string | null = null,
  label: string = 'Root',
  depth: number = 0
): { nodes: Node<ObjectNodeData>[]; edges: Edge[] } {
  const nodes: Node<ObjectNodeData>[] = [];
  const edges: Edge[] = [];
  const nodeId = parentId ? `${parentId}-${label}` : label;

  if (typeof json === 'object' && json !== null) {
    // Create object node
    nodes.push({
      id: nodeId,
      type: 'object',
      position: { x: 0, y: 0 },
      data: {
        label,
        type: 'object',
        properties: [],
        depth
      }
    });

    // Process each property
    Object.entries(json).forEach(([key, value]) => {
      const propertyId = `${nodeId}-${key}`;
      
      if (typeof value === 'object' && value !== null) {
        // Recursively process nested objects
        const { nodes: childNodes, edges: childEdges } = jsonToGraph(
          value as Record<string, unknown>,
          nodeId,
          key,
          depth + 1
        );
        nodes.push(...childNodes);
        edges.push(...childEdges);
        
        // Add edge from parent to child
        edges.push({
          id: `${nodeId}-${key}`,
          source: nodeId,
          target: propertyId,
          sourceHandle: `property-${key}`,
        });

        // Add property to parent node
        const parentNode = nodes.find(n => n.id === nodeId);
        if (parentNode && parentNode.data.properties) {
          parentNode.data.properties.push({
            id: propertyId,
            key,
            value: Array.isArray(value) ? `Array(${value.length})` : 'Object',
            type: Array.isArray(value) ? 'array' : 'object',
            childNodeId: propertyId
          });
        }
      } else {
        // Add primitive value to parent node's properties
        const parentNode = nodes.find(n => n.id === nodeId);
        if (parentNode && parentNode.data.properties) {
          parentNode.data.properties.push({
            id: propertyId,
            key,
            value: value as string | number | boolean | null,
            type: typeof value
          });
        }
      }
    });
  }

  return { nodes, edges };
} 