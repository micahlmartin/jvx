import { Edge, Node } from 'reactflow';
import { ObjectNodeData } from '@/components/nodes/ObjectNode';
import { ArrayNodeData } from '@/components/nodes/ArrayNode';

interface NodeProperty {
  key: string;
  type: string;
  value: any;
  childNodeId?: string; // Reference to child node if this property expands
}

interface GraphData {
  nodes: Node[];
  edges: Edge[];
}

function getValueType(value: any): string {
  if (Array.isArray(value)) return 'array';
  if (value === null) return 'null';
  return typeof value;
}

function createNode(id: string, label: string, properties: NodeProperty[]): Node {
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
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  let currentId = parentId || 'root';

  // Handle objects
  const properties: NodeProperty[] = [];

  Object.entries(obj).forEach(([key, value]) => {
    const valueType = getValueType(value);
    
    if (valueType === 'array') {
      // Add array property to parent
      const arrayValue = value as any[];
      const property: NodeProperty = {
        key,
        type: 'array',
        value: `array[${arrayValue.length}]`
      };
      properties.push(property);

      // Process array elements as child nodes
      arrayValue.forEach((item: any, index: number) => {
        const itemType = getValueType(item);
        const itemId = `${currentId}-${key}-${index}`;

        if (itemType === 'object') {
          // Recursively process object elements
          const { nodes: childNodes, edges: childEdges } = processObject(item, itemId);
          nodes.push(...childNodes);
          edges.push(...childEdges);
        } else if (itemType === 'array') {
          // Recursively process nested arrays
          const { nodes: childNodes, edges: childEdges } = processObject({ value: item }, itemId);
          nodes.push(...childNodes);
          edges.push(...childEdges);
        } else {
          // Create value node for primitive types
          nodes.push(createNode(itemId, `${key}[${index}]`, [
            { key: 'value', type: itemType, value: item }
          ]));
        }

        // Connect array elements to parent's property
        edges.push({
          id: `${currentId}-${key}-${itemId}`,
          source: currentId,
          target: itemId,
          sourceHandle: `property-${key}`, // Connect from the property
          type: 'smoothstep',
          label: `[${index}]`,
          style: { stroke: 'var(--edge-stroke)' }
        });
      });
    } else if (valueType === 'object' && value !== null) {
      // Process child objects
      const childId = `${currentId}-${key}`;
      const { nodes: childNodes, edges: childEdges } = processObject(value, childId);
      
      nodes.push(...childNodes);
      edges.push(...childEdges);
      
      // Add object property to parent with reference to child
      const property: NodeProperty = {
        key,
        type: 'object',
        value: 'object',
        childNodeId: childId
      };
      properties.push(property);

      // Connect parent's property to child object
      edges.push({
        id: `${currentId}-${key}-${childId}`,
        source: currentId,
        target: childId,
        sourceHandle: `property-${key}`, // Connect from the property
        type: 'smoothstep',
        style: { stroke: 'var(--edge-stroke)' }
      });
    } else {
      // Add primitive property to parent
      properties.push({
        key,
        type: valueType,
        value
      });
    }
  });

  // Create node for current object with its properties
  nodes.push(createNode(currentId, currentId === 'root' ? 'Root' : currentId, properties));

  return { nodes, edges };
}

export { processObject as jsonToGraph }; 