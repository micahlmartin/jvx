import { useCallback } from 'react';
import ReactFlow, {
  Background,
  Controls,
  Node,
  Edge,
  Connection,
  useNodesState,
  useEdgesState,
  addEdge,
} from 'reactflow';
import 'reactflow/dist/style.css';
import styled from 'styled-components';
import { nodeTypes } from './nodes';

const GraphContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: var(--background);
`;

const initialNodes: Node[] = [
  {
    id: '1',
    type: 'object',
    position: { x: 250, y: 50 },
    data: {
      label: 'User',
      type: 'object',
      properties: {
        name: 'string',
        age: 'number',
        active: 'boolean',
        hobbies: 'array',
        address: 'object'
      }
    }
  },
  {
    id: '2',
    type: 'array',
    position: { x: 100, y: 200 },
    data: {
      label: 'Hobbies',
      type: 'array',
      items: ['reading', 'coding', 'gaming']
    }
  },
  {
    id: '3',
    type: 'object',
    position: { x: 400, y: 200 },
    data: {
      label: 'Address',
      type: 'object',
      properties: {
        street: 'string',
        city: 'string',
        zipCode: 'string'
      }
    }
  },
  {
    id: '4',
    type: 'value',
    position: { x: 100, y: 350 },
    data: {
      label: 'Name',
      type: 'value',
      value: "John Doe"
    }
  },
  {
    id: '5',
    type: 'value',
    position: { x: 250, y: 350 },
    data: {
      label: 'Age',
      type: 'value',
      value: 30
    }
  },
  {
    id: '6',
    type: 'value',
    position: { x: 400, y: 350 },
    data: {
      label: 'Active',
      type: 'value',
      value: true
    }
  }
];

const initialEdges: Edge[] = [
  { id: 'e1-2', source: '1', target: '2', label: 'hobbies' },
  { id: 'e1-3', source: '1', target: '3', label: 'address' },
  { id: 'e1-4', source: '1', target: '4', label: 'name' },
  { id: 'e1-5', source: '1', target: '5', label: 'age' },
  { id: 'e1-6', source: '1', target: '6', label: 'active' }
];

export function GraphCanvas() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback((connection: Connection) => {
    setEdges((eds) => addEdge(connection, eds));
  }, [setEdges]);

  return (
    <GraphContainer>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        nodeTypes={nodeTypes}
        fitView
      >
        <Background 
          color="var(--grid)"
          gap={24}
          size={1}
          className="opacity-20"
        />
        <Controls 
          className="bg-[rgba(255,255,255,0.05)] backdrop-blur-sm 
                     border border-[rgba(255,255,255,0.1)] rounded-lg"
        />
      </ReactFlow>
    </GraphContainer>
  );
} 