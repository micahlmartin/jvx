import { useCallback, forwardRef, useImperativeHandle } from 'react';
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
import { jsonToGraph } from '@/utils/jsonToGraph';

const GraphContainer = styled.div`
  width: 100%;
  height: 100vh;
  background-color: var(--background);
`;

const initialNodes: Node[] = [];
const initialEdges: Edge[] = [];

interface GraphCanvasProps {
  onInit?: () => void;
}

export interface GraphCanvasHandle {
  updateJson: (json: any) => void;
}

export const GraphCanvas = forwardRef<GraphCanvasHandle, GraphCanvasProps>(
  function GraphCanvas({ onInit }, ref) {
    const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
    const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

    const onConnect = useCallback((connection: Connection) => {
      setEdges((eds) => addEdge(connection, eds));
    }, [setEdges]);

    const updateJson = useCallback((json: any) => {
      const { nodes: newNodes, edges: newEdges } = jsonToGraph(json);
      setNodes(newNodes);
      setEdges(newEdges);
    }, [setNodes, setEdges]);

    useImperativeHandle(ref, () => ({
      updateJson
    }), [updateJson]);

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
); 