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

const GraphContainer = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: var(--background);
`;

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

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